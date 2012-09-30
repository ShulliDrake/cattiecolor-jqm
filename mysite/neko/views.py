# Copyright (C) 2012 Nozomi Lipps
"""Views functions"""
from django.http import HttpResponse
from django.shortcuts import render_to_response
from django.template import RequestContext
from django.conf import settings


def home(request):
    """Tie app"""
    tie_colors = settings.TIE_COLORS
    page_name = request.get_full_path().strip("/")
    print page_name, '<---'
    return render_to_response('home.html',
                              {'colors': tie_colors, 'page_name': page_name},
                              context_instance=RequestContext(request))


def photos(request):
    """Photo gallery page"""
    page_name = request.get_full_path().strip("/")
    print page_name, '<---'

    return render_to_response('photos.html',
                              {'page_name': page_name},
                              context_instance=RequestContext(request))
