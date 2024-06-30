from django.shortcuts import render, redirect
from django.contrib.auth import login, logout, authenticate
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
from django.db import IntegrityError

# Create your views here.
def auth(request):
    return render(request, 'auth_user/auth.html')

def sign_up(request):
    if request.method == 'GET':
        return render(request, 'auth_user/sign-up.html')
    
    else:
        if request.POST["password1"] == request.POST["password2"]:
            try:
                user = User.objects.create_user(
                    username = request.POST["username"],
                    first_name = request.POST["firstname"],
                    last_name = request.POST["lastname"],
                    email = request.POST["email"],
                    password = request.POST["password1"],
                )
                user.save()
                login(request, user)

                return redirect('home')
            
            except IntegrityError:
                return render(request, 'auth_user/auth.html', {"error": "Usuario ya existe"})
            
        return render(request, 'auth_user/auth.html', {"error": "Passwords did not match."})

def log_out(request):
    logout(request)
    return redirect('home')