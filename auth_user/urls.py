from django.urls import path
from .views import auth
from .views import sign_up

urlpatterns = [
    path('', auth, name="auth"),
    path('sign-up/', sign_up, name="sign-up"),
]