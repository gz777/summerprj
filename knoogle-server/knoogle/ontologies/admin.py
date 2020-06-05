"""
File: ontologies/admin.py
Written By: Jerry Turcios
Purpose: Contains the code that registers the ontologies app's models to the
         admin site.
Version: Python 3.7
"""
from django.contrib import admin

from .models import *

admin.site.register(Ontology)
