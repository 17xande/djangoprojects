from django.shortcuts import HttpResponse, render
from django.template import loader
from .models import Bar
# Create your views here.
def index(request):
    bars = Bar.objects.all()
    template = loader.get_template("dashboard/index.html")
    context = {
        "Bar": bars[0],
    }

    return HttpResponse(template.render(context, request))
