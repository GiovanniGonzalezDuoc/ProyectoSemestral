from django.shortcuts import render

# Create your views here.
def crear_usuario(request):
    return render(request, 'crud/crear-usuario.html')