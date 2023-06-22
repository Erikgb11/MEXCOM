import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-registrar-producto',
  templateUrl: './registrar-producto.component.html',
  styleUrls: ['./registrar-producto.component.scss']
})
export class RegistrarProductoComponent implements AfterViewInit {
  ngAfterViewInit() {
    const btn = document.getElementById('registrarBtn');
    if (btn) {
      btn.addEventListener('click', this.enviarDatos);
    }
  }

  enviarDatos() {
    var nombreElement = document.getElementById('prductname') as HTMLInputElement;
    var descripcionElement = document.getElementById('descripcion') as HTMLInputElement;
    var precioElement = document.getElementById('Rango_recio') as HTMLInputElement;

    if (nombreElement && descripcionElement && precioElement) {
      var nombre = nombreElement.value;
      var descripcion = descripcionElement.value;
      var precio = precioElement.value;

      var data = {
        idPuntoDeOferta: "1",
        nombreProducto: nombre,
        descripcion: descripcion,
        precio: precio            
      };

      // Enviar los datos al backend
      var url = 'http://localhost:9000/api/addproducto'; // Reemplazar con la URL del backend
      var xhr = new XMLHttpRequest();
      xhr.open('POST', url, true);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
          console.log('Datos enviados correctamente');
        }
      };
      xhr.send(JSON.stringify(data));
    }
  }
}
