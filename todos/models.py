from django.db import models

# Create your models here.
class Todo(models.Model):
    texto = models.CharField(max_length=200)
    fecha = models.DateTimeField('fecha publicacion', auto_now_add=True)
