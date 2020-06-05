"""
File: search/views.py
Written By: Jerry Turcios
Purpose: Contains the views for the search app.
Version: Python 3.7
"""
import json

from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt

from .search import crawl_search


@csrf_exempt
def search_results(request):
    """
    The search_results function calls the crawl_search function in search.py
    and returns the results as an HTTP response.

    :param request: The HTTP request from the client
    :return: The HTTP response from running the search
    """
    body_unicode = request.body.decode('utf-8')
    body = json.loads(body_unicode)

    term = body['term']
    json_tree = body['jsonTree']

    return HttpResponse(crawl_search(term, json_tree))
