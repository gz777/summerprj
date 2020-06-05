"""
File: feedback/email.py
Written By: Jerry Turcios
Purpose: Contains the code to send a user's feedback to Knowglet's inbox.
Version: Python 3.7
"""
import smtplib

from django.conf import settings
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText


def send_email(name, email, comments):
    """
    The send_email function creates a new email and sends it to Knowglet's
    email inbox using an SMTP server.

    :param name: The user's name
    :param email: The user's email for replies
    :param comments: The user's comments to be used for feedback
    """
    subject = 'Feedback by {} from {}'.format(name, email)
    message = comments
    to = 'knowglet@gmail.com'

    msg = MIMEMultipart('alternative')
    msg['Subject'] = subject
    msg['To'] = to

    html = message
    payload = MIMEText(html, 'html')
    msg.attach(payload)

    s = smtplib.SMTP_SSL('smtp.gmail.com')
    s.login(settings.EMAIL_HOST_USER, settings.EMAIL_HOST_PASS)
    s.sendmail(to, to, msg.as_string())
    s.quit()
