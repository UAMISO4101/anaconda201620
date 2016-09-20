from rest_framework import generics
from django.shortcuts import render

# Create your views here.
def index(request):
    return render(request, 'comercial_agent/index.html')

