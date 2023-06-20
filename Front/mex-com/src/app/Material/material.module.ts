import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
// Importa aquí todos los módulos de Angular Material que necesites

@NgModule({
  imports: [
    MatButtonModule,
    MatInputModule,
    // Agrega aquí todos los módulos de Angular Material que necesites
  ],
  exports: [
    MatButtonModule,
    MatInputModule,
    // Agrega aquí todos los módulos de Angular Material que necesites
  ]
})
export class MaterialModule { }
