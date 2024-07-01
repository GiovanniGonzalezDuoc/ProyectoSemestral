from django.urls import path
from .views import home, comics, about_us, detalle_comic
from .views import update_carrito, agregar_carrito, modificar_cantidad, eliminar_carrito
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('', home, name="home"),
    path('comics/', comics, name="comics"),
    path('about-us/', about_us, name="about-us"),
    path('comics/<int:producto_id>/', detalle_comic, name="detalle-comic"),

    
    path('carrito/', update_carrito, name="update-carrito"),
    path('agregar/<int:producto_id>/', agregar_carrito, name="agregar_carrito"),
    path('eliminar/<int:item_id>/', eliminar_carrito, name="eliminar_carrito"),
    path('modificar/<int:item_id>/', modificar_cantidad, name="modificar_cantidad"),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
