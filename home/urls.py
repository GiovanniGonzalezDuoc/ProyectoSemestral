from django.urls import path
from .views import home, comics, about_us

urlpatterns = [
    path('', home, name="home"),
    path('comics/', comics, name="comics"),
    path('about-us/', about_us, name="about-us")
    
]