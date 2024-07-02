from django.shortcuts import render, get_object_or_404, redirect,HttpResponse
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt
import json
from .models import Producto
from common.carro import Carro

def home(request):
    comics = Producto.objects.all()
    error_message = request.session.pop('error_message', None)
    return render(request, 'home/home.html', {"comics": comics, "error_message": error_message})


def comics(request):
    comics = Producto.objects.all()
    error_message = request.session.pop('error_message', None)
    return render(request, 'home/comics.html', {"comics": comics, "error_message": error_message})

def detalle_comic(request, producto_id):
    comic = get_object_or_404(Producto, id_producto=producto_id)
    return render(request, 'home/detalle-comic.html', {"comic": comic})

@login_required
def agregar_producto(request, producto_id):
    carro = Carro(request)
    producto = Producto.objects.get(id_producto=producto_id)
    error_message = carro.agregar(producto = producto)
    return redirect('/comics?mostrar_carrito=True')

@login_required
def eliminar_producto(request, producto_id):
    carro = Carro(request)
    producto = Producto.objects.get(id_producto=producto_id)
    carro.eliminar(producto = producto)
    return redirect('/comics?mostrar_carrito=True')

@login_required
def restar_producto(request, producto_id):
    carro = Carro(request)
    producto = Producto.objects.get(id_producto = producto_id)
    carro.restar_producto(producto = producto)
    return redirect('/comics?mostrar_carrito=True')

@login_required
def limpiar_carro(request):
    pass

def comprar(request):
    return render(request, 'common/compra.html')

def agradecimiento(request):
    return render(request, 'common/agradecimiento.html')


def about_us(request):
    return render(request, 'home/about-us.html')

@csrf_exempt
def actualizar_stock(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        productos = data.get('productos', [])

        for item in productos:
            producto_id = item.get('id')
            cantidad_comprada = item.get('cantidad')

            # Obtener el producto desde la base de datos
            producto = get_object_or_404(Producto, pk=producto_id)

            # Verificar si hay suficiente stock disponible
            if cantidad_comprada > producto.stock:
                return HttpResponse(json.dumps({'success': False, 'error': 'Stock insuficiente'}), content_type='application/json', status=400)

            # Actualizar el stock del producto
            producto.stock -= cantidad_comprada
            producto.save()

        return HttpResponse(json.dumps({'success': True}), content_type='application/json')

    return HttpResponse(status=405)