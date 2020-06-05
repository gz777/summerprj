"""
File: search/search.py
Written By: Purvil Patel
Purpose: Contains the code that executes the search and re-ranking procedures
         based on a user's ontology and searched term.
Version: Python 3.7
"""
import json
import logging
import math
import PyPDF2
import re
import requests
import urllib

from bs4 import BeautifulSoup
from fake_useragent import FakeUserAgentError, UserAgent
from threading import Thread


class GoogleUrl(object):
    """
    The GoogleUrl class is a data structure that holds a google results.
    """
    def __init__(self, title=None, url=None, description=None):
        self.title = title
        self.url = url
        self.description = description


class Website(object):
    """
    The Website class is a data structure that holds data concerning a website.
    """
    def __init__(
        self,
        title=None,
        url=None,
        description=None,
        original_rank=None,
        re_rank_score=None
    ):
        self.title = title
        self.url = url
        self.description = description
        self.originalRank = original_rank
        self.reRankScore = re_rank_score


# noinspection PyBroadException
def get_urls_from_google(term, num_of_results):
    """
    The get_urls_from_google function returns a list of URLs coming from the
    Google search results.

    :param term: The searched term
    :param num_of_results: The number of results
    :return: The URLs from the Google results
    """
    ua = None

    try:
        ua = UserAgent()
    except FakeUserAgentError:
        pass

    query = urllib.parse.quote_plus(term)  # Format into URL encoding
    google_url = "https://www.google.com/search?q=" + \
                 query + "&num=" + str(num_of_results)
    response = requests.get(google_url, {"User-Agent": ua.random})
    soup = BeautifulSoup(response.text, "html.parser")
    result_div = soup.find_all('div', attrs={'class': 'ZINbbc'})

    links = []
    titles = []
    descriptions = []

    for r in result_div:
        # Checks if each element is present; else, raise exception
        try:
            link = r.find('a', href=True)
            title = r.find('div', attrs={'class': 'vvjwJb'}).get_text()
            description = r.find('div', attrs={'class': 's3v9rd'}).get_text()

            # Checks to make sure everything is present before appending
            if link != '' and title != '' and description != '':
                links.append(link['href'])
                titles.append(title)
                descriptions.append(description)
        except:
            # Next loop if one element is not present
            continue

    print(len(titles), len(descriptions), len(links))

    if len(titles) != len(descriptions) or len(descriptions) != len(links):
        print("ERROR! HORROR!")
        exit()

    to_remove = []
    clean_links = []

    for i, l in enumerate(links):
        clean = re.search('\/url\?q\=(.*)\&sa', l)

        if clean is None:
            # Anything that doesn't fit the above pattern will be removed
            to_remove.append(i)
            continue

        clean_links.append(clean.group(1))

    for x in to_remove:
        # Remove the corresponding titles & descriptions
        del titles[x]
        del descriptions[x]

    result_list = []
    count = 0

    for m in clean_links:
        result_list.append(GoogleUrl(titles[count], m, descriptions[count]))
        count += 1

    return result_list


def crawl_search(term, json_tree):
    """
    The crawl_search function is the entry point of the script. The searched
    term and the ontology tree in the form of JSON are recieved from a POST
    request sent from the client.

    :param term: The term the user searched
    :param json_tree: The user's ontology tree in JSON
    :return: The re-ranked results in JSON for the client
    """
    logging.basicConfig(
        format='%(asctime)s %(message)s',
        datefmt='%m/%d/%Y %I:%M:%S %p'
    )
    logging.warning('is when this event was In.')

    get_index_of_term = -1
    terms_list = get_the_list_from_tree(json_tree, 'title')
    list_dict = {}
    search_query = '(intitle:' + term + ')'
    pos = 1

    for m in terms_list:
        list_dict[m.lower()] = pos

        if pos <= 5:
            search_query = search_query + ' ' + m

        pos = pos + 1
        print(m)

    print(search_query)

    is_term_present = False

    if term.lower() in list_dict:
        is_term_present = True
        get_index_of_term = list_dict[term.lower()]

    if len(terms_list) == 0:
        google_results_for_term = get_urls_from_google(term, 40)
        json_string = json.dumps(
            [ob.__dict__ for ob in google_results_for_term]
        )

        return json_string

    elif not is_term_present:
        google_results_for_term = get_urls_from_google(search_query, 30)
        threads = []
        website_list = []

        for ii in range(len(google_results_for_term)):
            process = Thread(
                target=crawl,
                args=[
                    google_results_for_term[ii],
                    google_results_for_term,
                    list_dict,
                    ii,
                    website_list
                ]
            )

            process.start()
            threads.append(process)

        for process in threads:
            process.join()

        website_list.sort(key=lambda x: x.reRankScore, reverse=True)

        json_string = json.dumps([ob.__dict__ for ob in website_list])

        logging.basicConfig(
            format='%(asctime)s %(message)s',
            datefmt='%m/%d/%Y %I:%M:%S %p'
        )
        logging.warning('is when this event was out.')

        return json_string
    else:
        google_results_for_term = get_urls_from_google(search_query, 30)
        threads = []
        website_list = []

        for ii in range(len(google_results_for_term)):
            process = Thread(
                target=crawl,
                args=[
                    google_results_for_term[ii],
                    google_results_for_term,
                    list_dict,
                    ii,
                    website_list
                ]
            )
            process.start()
            threads.append(process)

        for process in threads:
            process.join()

        # Sorting based on re-rank score
        website_list.sort(key=lambda x: x.reRankScore, reverse=True)

        term_list_size = len(terms_list)

        term1 = ""
        term2 = ""
        term3 = ""

        if term_list_size - get_index_of_term >= 3:
            term1 = terms_list[get_index_of_term]
            term2 = terms_list[get_index_of_term + 1]
            term3 = terms_list[get_index_of_term + 2]
        elif term_list_size - get_index_of_term >= 2:
            term1 = terms_list[get_index_of_term]
            term2 = terms_list[get_index_of_term + 1]
        elif term_list_size - get_index_of_term >= 1:
            term1 = terms_list[get_index_of_term]
        elif term_list_size > 2:
            term1 = terms_list[get_index_of_term - 2]

        print(term1 + " " + term2 + " " + term3)

        if term1 and term2 and term3:
            term1_google_results = get_urls_from_google(term1, 7)
            term2_google_results = get_urls_from_google(term2, 7)
            term3_google_results = get_urls_from_google(term3, 7)

            json_string = json.dumps(
                [ob.__dict__ for ob in website_list] +
                [ob.__dict__ for ob in term1_google_results] +
                [ob.__dict__ for ob in term2_google_results] +
                [ob.__dict__ for ob in term3_google_results])

        elif term1 and term2 and not term3:
            term1_google_results = get_urls_from_google(term1, 10)
            term2_google_results = get_urls_from_google(term2, 10)

            json_string = json.dumps(
                [ob.__dict__ for ob in website_list] +
                [ob.__dict__ for ob in term1_google_results] +
                [ob.__dict__ for ob in term2_google_results]
            )

        elif term1 and not term2 and not term3:
            term1_google_results = get_urls_from_google(term1, 20)

            json_string = json.dumps(
                [ob.__dict__ for ob in website_list] +
                [ob.__dict__ for ob in term1_google_results]
            )

        else:
            json_string = json.dumps([ob.__dict__ for ob in website_list])

        logging.basicConfig(
            format='%(asctime)s %(message)s',
            datefmt='%m/%d/%Y %I:%M:%S %p'
        )
        logging.warning('is when this event was out.')

        return json_string


def pdf_reader(pdfUrl):
    """
    The pdf_reader functions reads a PDF file from the a given URL.

    :param pdfUrl: The URL with the PDF file
    :return: The data from the PDF URLs
    """
    r = requests.get(pdfUrl, stream=True)

    with open("python.pdf", "wb") as pdf:

        for chunk in r.iter_content(chunk_size=1024):
            # Writes one chunk at a time to pdf file

            if chunk:
                pdf.write(chunk)

    pdf_file_object = open('python.pdf', 'rb')
    pdf_reader_instance = PyPDF2.PdfFileReader(pdf_file_object)
    count = pdf_reader_instance.numPages
    ss = ""

    for i in range(count):
        page = pdf_reader_instance.getPage(i)
        ss += page.extractText()

    return ss


def item_generator(json_input, lookup_key):
    """
    The item_generator function is a helper function for get_the_list_from_tree
    function.

    :param json_input: The JSON recieved from the client
    :param lookup_key: The title in the JSON
    """
    if isinstance(json_input, dict):
        for k, v in json_input.items():
            if k == lookup_key:
                yield v
            else:
                yield from item_generator(v, lookup_key)
    elif isinstance(json_input, list):
        for item in json_input:
            yield from item_generator(item, lookup_key)


def get_the_list_from_tree(jsonTree, lookup_key):
    """
    The get_the_list_from_tree function builds a Python list based on the
    structure of the tree that is recieved from the front-end.

    :param jsonTree: The ontology tree in JSON format
    :param lookup_key: The title in the JSON
    :return: The ontology list
    """
    data = json.loads(jsonTree)
    ontology_list = []

    for _ in item_generator(data, lookup_key):
        ontology_list.append(_.lower())

    return ontology_list


def re_rank(ontology_terms, total_results, temp_rank, doc):
    """
    The re_rank function re-ranks the URLs based on the number of terms present
    in the data of the webpage.

    :param ontology_terms: The dictionary of ontology terms
    :param total_results: The number of results coming from Google
    :param temp_rank: The original rank by Google
    :param doc: The data of the webpage
    :return: The re-rank score based on the terms and results
    """
    if temp_rank == 1:
        base_score = 1
    else:
        base_score = (total_results + 2 * math.log10(temp_rank + 1)) /\
                     (temp_rank + total_results)

    omega_score = 0
    alpha = 0.85  # adjusting parameter

    for each_word in doc:
        if each_word.lower() in ontology_terms:
            pos_of_term = ontology_terms[each_word]
            omega_score += 1 / (pos_of_term * pos_of_term)
            del ontology_terms[each_word]

    omega_score = omega_score / 2
    re_rank_score = (0.85 * base_score) + ((1 - alpha) * omega_score)

    return re_rank_score


def crawl(url, google_results_for_term, term_dict, index, website_list):
    """
    The crawl function goes through a single URL. A try/catch is executed and
    any exceptions that arise from crawing a single URL is handled.

    :param url: The URL of a website
    :param google_results_for_term: The results that come from Google
    :param term_dict: The dictionary which contains the terms
    :param index: The original rank of the URL
    :param website_list: The list of websites retrieved from Google
    """
    score = -1

    try:
        r = requests.get(url.url, timeout=1)
        content_type = r.headers.get('content-type')

        if content_type is None or 'text/html' in content_type:
            soup_to_get_text = BeautifulSoup(r.text, 'html.parser')

            score = re_rank(
                term_dict,
                len(google_results_for_term),
                index,
                soup_to_get_text.get_text().lower()
            )
        elif 'application/pdf' in content_type:
            pass
            '''
          textFromPdfUrl = pdfReader(url.url)

          score = re_rank(url.url,
                          termDict,
                          len(googleResultsForTerm), index,
                          textFromPdfUrl.lower()) '''
        else:
            print("Unrecognized format")
    except requests.ReadTimeout:
        pass
    except requests.exceptions.RequestException as e:
        print(e)

    website_list.append(
        Website(
            google_results_for_term[index].title,
            google_results_for_term[index].url,
            google_results_for_term[index].description,
            index,
            score
        )
    )
