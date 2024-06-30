from django.shortcuts import render

# Create your views here.
def home(request):
    return render(request, 'home/home.html')

def comics(request):
    return render(request, 'home/comics.html')

def about_us(request):
    return render(request, 'home/about-us.html')