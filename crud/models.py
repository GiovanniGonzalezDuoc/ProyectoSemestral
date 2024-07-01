from django.db import models

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
    imagen = models.ImageField(upload_to='comics/')
    nombre = models.CharField(max_length=250)
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.IntegerField()
    editorial = models.ForeignKey(Editorial, on_delete=models.CASCADE)
    tipo = models.ForeignKey(Tipo, on_delete=models.CASCADE)

    def __str__(self):
        return self.nombre
