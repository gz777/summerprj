from flask import Flask
from flask_cors import CORS

# Define the WSGI application object
app = Flask(__name__)
# Exposes all resources matching /api/* to
# CORS and allows the Content-Type header, which is necessary to POST JSON
# cross origin.
CORS(app, resources=r'/api/*')

# Configuration
if app.config['ENV'] == "production":
    app.config.from_object("config.ProductionConfig")
else:
    app.config.from_object('config.DevelopmentConfig')

from .api.feedback import views
from .api.search import views
