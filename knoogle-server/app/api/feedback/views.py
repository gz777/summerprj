from app import app
from flask import request, Response
from .email import send_email

@app.route("/api/feedback/",methods=['POST'])
@app.route("/api/feedback/feedback",methods=['GET','POST'])

def email_client():
    """
    The email_client function recieves a request with the content needed to
    send an email. It calls the send_email function and returns an HTTP
    response if the email is successfully sent.

    :param request: The HTTP request from the client
    :return: The HTTP response from sending the email
    """
    
    body = request.get_json()

    name = body['name']
    email = body['email']
    comments = body['comments']
    
    return Response(send_email(name, email, comments))
