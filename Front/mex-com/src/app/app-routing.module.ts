import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistroComponent } from './registro/registro.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { VendedorComponent } from './vendedor/vendedor.component';
const routes: Routes = [
  {path:"", component: LoginComponent},
  { path: 'inicio', component: HomeComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'vendedor', component: VendedorComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
}
