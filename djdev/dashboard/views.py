from django.shortcuts import HttpResponse, render
from .models import Bar
# Create your views here.
def index(request):
    bars = Bar.objects.all()
    context = {
        "Bar": bars[0],
    }

    return render(request, "dashboard/index.html", context)
