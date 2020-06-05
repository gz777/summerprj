"""
File: feedback/views.py
Written By: Jerry Turcios
Purpose: Contains the views for the feedback app.
Version: Python 3.7
"""
import json

from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt

from .email import send_email


@csrf_exempt
def email_client(request):
    """
    The email_client function recieves a request with the content needed to
    send an email. It calls the send_email function and returns an HTTP
    response if the email is successfully sent.

    :param request: The HTTP request from the client
    :return: The HTTP response from sending the email
    """
    body_unicode = request.body.decode('utf-8')
    body = json.loads(body_unicode)

    name = body['name']
    email = body['email']
    comments = body['comments']

    return HttpResponse(send_email(name, email, comments))
