from django.shortcuts import render
from django.http import HttpResponse
import json
from .models import Todo
from django.views.decorators.csrf import csrf_exempt

# Create your views here.
def load_todos(request):
    todos_list = Todo.objects.all()
    json_respuesta = []
    for todo in todos_list:
        json_respuesta.append({
            "id": todo.id,
            "texto": todo.texto
        })
    return HttpResponse(json.dumps(json_respuesta))

@csrf_exempt
def add_todo(request):
    json_request = json.loads(request.body.decode('utf-8'))
    todo = Todo()
    todo.texto = json_request["texto"]
    todo.save()
    return HttpResponse(json.dumps({"msg": "OK"}))

def delete_todo(request):
    print("Se llama delete_todo")
    todo_id = request.GET.get("id")
    Todo.objects.get(id=todo_id).delete()
    return HttpResponse(json.dumps({"msg": "OK"}))

def index(request):
    return render(request, 'index.html', None)
