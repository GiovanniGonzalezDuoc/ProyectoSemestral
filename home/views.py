from django.shortcuts import render
from .models import Producto

# Create your views here.
def home(request):
    return render(request, 'home/home.html')

def comics(request):

    comics = Producto.objects.all()

    return render(request, 'home/comics.html', {"comics": comics})

def about_us(request):
    return render(request, 'home/about-us.html')