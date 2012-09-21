import os
# specify the name of your settings module
os.environ['DJANGO_SETTINGS_MODULE'] = 'settings'

import django.core.handlers.wsgi
app = django.core.handlers.wsgi.WSGIHandler()


# main.py

#import os, sys
#os.environ["DJANGO_SETTINGS_MODULE"] = "settings"
#sys.path.append("/home/nozomi/git/shulli-dev/mysite")

# Google App Engine imports.
from webapp2 import util

# Force Django to reload its settings.
#from django.conf import settings
#settings._target = None

import django.core.handlers.wsgi
import django.core.signals
import django.db
import django.dispatch.dispatcher

# Log errors.
#django.dispatch.dispatcher.connect(
#   log_exception, django.core.signals.got_request_exception)

# Unregister the rollback event handler.
#django.dispatch.dispatcher.disconnect(
#django.db._rollback_on_exception,
#django.core.signals.got_request_exception)

#def main():
    # Create a Django application for WSGI.
#    application = django.core.handlers.wsgi.WSGIHandler()

    # Run the WSGI CGI handler with that application.
#    util.run_wsgi_app(application)

#if __name__ == &quot;__main__&quot;:
#    main()

