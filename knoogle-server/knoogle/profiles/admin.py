"""
File: accounts/admin.py
Written By: Jerry Turcios
Purpose: Contains the code that registers the profiles app's model to the
         admin site.
Version: Python 3.7
"""
from django.contrib import admin

from .models import *

admin.site.register(Profile)
