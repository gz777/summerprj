
# Define the application directory
import os


# Define the database - we are working with
# SQLite for this example
#SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(BASE_DIR, 'app.db')
##DATABASE_CONNECT_OPTIONS = {}

# Application threads. A common general assumption is
# using 2 per available processor cores - to handle
# incoming requests using one and performing background
# operations using the other.
##THREADS_PER_PAGE = 2

# Enable protection agains *Cross-site Request Forgery (CSRF)*
##CSRF_ENABLED     = True

# Use a secure, unique and absolutely secret key for
# signing the data. 
##CSRF_SESSION_KEY = "REALLYsecret"

# Secret key for signing cookies
##SECRET_KEY = "REALLYsecret"

class Config(object):
    BASE_DIR = os.path.abspath(os.path.dirname(__file__))
    THREADS_PER_PAGE = 2
    CSRF_ENABLED     = True
    CSRF_SESSION_KEY = "ddfske&H*(K(idfh*)OHH"
    SECRET_KEY = "ddfske&H*(K(idfh*)OHH"
    SESSION_COOKIE_SECURE = True
    EMAIL_HOST_USER = 'fscs5070@gmail.com'
    EMAIL_HOST_PASS = 'kyrzvhmuewvkdkvc'

    DEBUG = True
    DEVELOPMENT = True
    

class ProductionConfig(Config):
    DEBUG = False
    DEVELOPMENT = False

class StagingConfig(Config):
    DEVELOPMENT = True
    DEBUG = False


class DevelopmentConfig(Config):
    DEVELOPMENT = True
    DEBUG = True
    SESSION_COOKIE_SECURE = False


class TestingConfig(Config):
    TESTING = True
