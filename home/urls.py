from django.urls import path
from .views import home, comics, about_us, detalle_comic
from .views import agregar_producto, eliminar_producto, restar_producto, limpiar_carro
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('', home, name="home"),
    path('comics/', comics, name="comics"),
    path('about-us/', about_us, name="about-us"),
    path('comics/<int:producto_id>/', detalle_comic, name="detalle-comic"),
    
    # Rutas del carrito
    path("agregar/<int:producto_id>/", agregar_producto, name="agregar"),
    path("eliminar/<int:producto_id>/", eliminar_producto, name="eliminar"),
    path("restar/<int:producto_id>/", restar_producto, name="restar"),
    path("limpiar/", limpiar_carro, name="limpiar"),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
