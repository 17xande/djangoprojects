from django.urls import path

from . import views

# add an app namespace https://docs.djangoproject.com/en/5.0/intro/tutorial03/#namespacing-url-names
app_name = "dashboard"

urlpatterns = [
    path('', views.index, name='index'),
]
