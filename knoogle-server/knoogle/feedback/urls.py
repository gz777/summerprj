"""
File: feedback/urls.py
Written By: Jerry Turcios
Purpose: Contains the URLs for the feedback app.
Version: Python 3.7
"""
from django.urls import path

from . import views

urlpatterns = [
    path('', views.email_client, name="feedback-list")
]
