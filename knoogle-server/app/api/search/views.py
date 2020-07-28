"""
File: search/views.py
Written By: Jerry Turcios
Purpose: Contains the views for the search app.
Version: Python 3.7
"""
import json

from flask import request, Response
from .search import crawl_search
from app import app

@app.route("/api/search/results/",methods=['POST'])
@app.route("/api/search/results/search",methods=['GET','POST'])

def search_results():
    """
    The search_results function calls the crawl_search function in search.py
    and returns the results as an HTTP response.

    :param request: The HTTP request from the client
    :return: The HTTP response from running the search
    """
    #body_unicode = request.decode('utf-8')
    #body = json.loads(body_unicode)
    body = request.get_json()

    term = body['term']
    json_tree = body['jsonTree']

    return Response(crawl_search(term, json_tree))
