from django.db import models

# Create your models here.
class bar(models.Model):
    name = models.CharField(max_length=200)
