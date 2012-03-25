# Copyright (C) 2012 Nozomi Lipps
"""Views functions"""
from django.http import HttpResponse


def home(request):
    return HttpResponse("Hello World!")
