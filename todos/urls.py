from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^list/', views.load_todos, name='load_todos'),
    url(r'^add/', views.add_todo, name='add_todo'),
    url(r'^delete', views.delete_todo, name='remove_todo')
]
