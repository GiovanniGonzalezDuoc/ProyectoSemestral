from django.urls import path
from .views import home, comics, about_us, detalle_producto

urlpatterns = [
    path('', home, name="home"),
    path('comics/', comics, name="comics"),
    path('comics/<int:producto_id>/', detalle_producto, name="detalle-producto"),
    path('about-us/', about_us, name="about-us")
    
]