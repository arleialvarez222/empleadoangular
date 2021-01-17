import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateEmpleadosComponent } from './components/create-empleados/create-empleados.component';
import { ListEmpleadosComponent } from './components/list-empleados/list-empleados.component';

const routes: Routes = [
  { path: '', redirectTo: 'list-empleados', pathMatch: 'full'},
  { path: 'list-empleados', component: ListEmpleadosComponent},
  { path: 'createEmpleado', component: CreateEmpleadosComponent},
  { path: 'editEmpleado/:id', component: CreateEmpleadosComponent},
  { path: '**', redirectTo: 'list-empleados', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
