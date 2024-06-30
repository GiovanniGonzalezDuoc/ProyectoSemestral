from django.urls import path
from .views import auth
from .views import sign_up
from .views import log_out

urlpatterns = [
    path('', auth, name="auth"),
    path('sign-up/', sign_up, name="sign-up"),
    path('log-out/', log_out, name="log-out"),
]