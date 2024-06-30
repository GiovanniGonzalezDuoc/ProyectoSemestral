from django.db import models
from django.contrib.auth.models import User


class Editorial(models.Model):
    id_editorial = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=250)
    descripcion = models.CharField(max_length=250)

    def __str__(self):
        return self.nombre


class Tipo(models.Model):
    id_tipo = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=250)
    descripcion = models.CharField(max_length=250)

    def __str__(self):
        return self.nombre

class Producto(models.Model):
    id_producto = models.AutoField(primary_key=True)
    descripcion = models.CharField(max_length=250, null=True, blank=True)
    imagen = models.CharField(max_length=250)
    nombre_comic = models.CharField(max_length=250)
    precio = models.CharField(max_length=250)
    stock = models.IntegerField()
    editorial = models.ForeignKey(Editorial, on_delete=models.CASCADE)
    tipo = models.ForeignKey(Tipo, on_delete=models.CASCADE)

    def __str__(self):
        return self.nombre_comic


class Compra(models.Model):
    id_compra = models.AutoField(primary_key=True)
    usuario = models.ForeignKey(User, on_delete=models.CASCADE)
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE)
    precio_compra = models.IntegerField()
    stock_producto = models.IntegerField()
    nombre_producto = models.CharField(max_length=50)

    def __str__(self):
        return f"{self.usuario.usuario} - {self.producto.nombre_comic}"