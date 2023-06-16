import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  usuario: any; // Aquí puedes definir la estructura de datos para el usuario, por ejemplo, un objeto con propiedades como nombre, foto, etc.
  isMenuOpen: boolean = false; // Agregamos la propiedad isMenuOpen

  @ViewChild('menu') menu: any;

  constructor() {
    this.usuario = {
      nombre: 'John Doe',
      foto: 'ruta-de-la-imagen.jpg',
    };
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen; // Actualizamos el valor de isMenuOpen
    this.menu.nativeElement.classList.toggle('show');
  }
}
