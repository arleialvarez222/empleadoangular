import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EmpleadoService } from 'src/app/services/empleado.service';


@Component({
  selector: 'app-create-empleados',
  templateUrl: './create-empleados.component.html',
  styleUrls: ['./create-empleados.component.css']
})
export class CreateEmpleadosComponent implements OnInit {

  createEmpleado: FormGroup;
  submitted = false;
  loading = false;
  id: string | null;
  titulo: string = 'agregar empleado';

  constructor( private fb: FormBuilder,
               private _empleadoservice: EmpleadoService,
               private router: Router,
               private toastr: ToastrService,
               private aRoute: ActivatedRoute) {

    this.createEmpleado = this.fb.group({
      nombre: [ '', Validators.required],
      apellido: [ '', Validators.required],
      documento: [ '', Validators.required],
      salario: [ '', Validators.required]
    })
    this.id = this.aRoute.snapshot.paramMap.get('id');
    console.log(this.id);
   }

  ngOnInit(): void {
    this.esEditar();
  }

  agregarEditarEmpleado() {
    
    this.submitted = true;

    if(this.createEmpleado.invalid){
      return ;
    }
    if(this.id === null){
      this.agregarEmpleado();
    }else{
      this.editarEmpleado(this.id);
    }

  }
  
  agregarEmpleado(){
    
    const empleado: any = {
      nombre: this.createEmpleado.value.nombre,
      apellido: this.createEmpleado.value.apellido,
      documento: this.createEmpleado.value.documento,
      salario: this.createEmpleado.value.salario,
      fechaCreacion: new Date(),
      fechaActualizacion: new Date()
    }
    this.loading = true;
    this._empleadoservice.agregarEmpleado(empleado).then( () =>{
      //mensaje en forma de alert
      this.toastr.success('empleado registrado con exito', 'empleado registrado', {
        positionClass: 'toast-bottom-right'
      });
      this.loading = false;
      this.router.navigate(['/list-empleados'])
    }).catch((error: any) =>{
      console.log(error);
      this.loading = false;
    })
  }

  editarEmpleado( id: string){

    const empleado: any = {
      nombre: this.createEmpleado.value.nombre,
      apellido: this.createEmpleado.value.apellido,
      documento: this.createEmpleado.value.documento,
      salario: this.createEmpleado.value.salario,
      fechaActualizacion: new Date()
    }
    this.loading = true;
    this._empleadoservice.actualizarEmpleado(id, empleado).then( () =>{
      this.loading = false;
      this.toastr.info('el empleado fue modificado con exito', 'Empleado modificado0',{
      positionClass: 'toast-bottom-right'
      })
      this.router.navigate(['/list-empleados']);//nos retorna a la ruta especificada
    })
    
  }

  esEditar(){
    this.titulo = 'editar empleado';
    if( this.id !== null){
      this.loading = true;
      this._empleadoservice.getEmpleado(this.id).subscribe((data: any) => {
        this.loading = false;
        //estamos mostrando los datos en la consola(segun los datos requeridos)
        console.log(data.payload.data()['nombre']);
        this.createEmpleado.setValue({
          nombre: data.payload.data()['nombre'],
          apellido: data.payload.data()['apellido'],
          documento: data.payload.data()['documento'],
          salario: data.payload.data()['salario'],
        })
      })
    }
  }
}
