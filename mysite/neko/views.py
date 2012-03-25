# Copyright (C) 2012 Nozomi Lipps
"""Views functions"""
from django.http import HttpResponse
from django.shortcuts import render_to_response


def home(request):
    return render_to_response('home.html')
