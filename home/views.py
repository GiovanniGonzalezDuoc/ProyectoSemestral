from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth.decorators import login_required
from .models import Producto, Carrito, ItemCarrito

def home(request):
    return render(request, 'home/home.html')

def comics(request):
    comics = Producto.objects.all()
    return render(request, 'home/comics.html', {"comics": comics})

def detalle_comic(request, producto_id):
    comic = get_object_or_404(Producto, id_producto=producto_id)
    return render(request, 'home/detalle-comic.html', {"comic": comic})

@login_required
def update_carrito(request):
    carrito, created = Carrito.objects.get_or_create(usuario=request.user)
    items = carrito.items.all()
    return render(request, 'common/detalles-carrito.html', {'carrito': carrito, 'items': items})

@login_required
def agregar_carrito(request, producto_id):
    producto = get_object_or_404(Producto, id_producto=producto_id)
    carrito, created = Carrito.objects.get_or_create(usuario=request.user)

    item_carrito, created = ItemCarrito.objects.get_or_create(carrito=carrito, producto=producto)
    if not created:
        item_carrito.cantidad += 1
        item_carrito.save()

    return redirect('ver_carrito')

@login_required
def modificar_cantidad(request, item_id):
    item_carrito = get_object_or_404(ItemCarrito, id=item_id, carrito__usuario=request.user)
    if request.method == 'POST':
        nueva_cantidad = int(request.POST.get('cantidad', 1))
        if nueva_cantidad > 0:
            item_carrito.cantidad = nueva_cantidad
            item_carrito.save()
        else:
            item_carrito.delete()
    return redirect('ver_carrito')

@login_required
def eliminar_carrito(request, item_id):
    item_carrito = get_object_or_404(ItemCarrito, id=item_id, carrito__usuario=request.user)
    item_carrito.delete()
    return redirect('ver_carrito')

def about_us(request):
    return render(request, 'home/about-us.html')
