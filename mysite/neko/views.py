# Copyright (C) 2012 Nozomi Lipps
"""Views functions"""
from django.http import HttpResponse
from django.shortcuts import render_to_response
from django.template import RequestContext
from django.conf import settings


def home(request):
    tie_colors = settings.TIE_COLORS

    return render_to_response('home.html',
                              {'colors': tie_colors},
                              context_instance=RequestContext(request))
