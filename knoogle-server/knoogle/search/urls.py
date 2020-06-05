"""
File: search/urls.py
Written By: Jerry Turcios
Purpose: Contains the URLs for the search app.
Version: Python 3.7
"""
from django.urls import path

from . import views

urlpatterns = [
    path('results/', views.search_results, name="search-results")
]
