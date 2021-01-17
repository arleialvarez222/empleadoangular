import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { promise } from 'protractor';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  constructor(private firestore: AngularFirestore) {}

    agregarEmpleado(empleado: any){
      return this.firestore.collection('empleados').add(empleado);
    }
  
    getEmpleados(): Observable<any>{
      //ref => ref.orderBy('fechaCreacion', 'desc' === ubicamos la informacion en la lista de la forma que se le indique
      return this.firestore.collection('empleados', ref => ref.orderBy('fechaCreacion', 'desc')).snapshotChanges();
    }

    eliminarEmpleado(id: string){
      return this.firestore.collection('empleados').doc(id).delete();
    }

    getEmpleado(id: string){
      return this.firestore.collection('empleados').doc(id).snapshotChanges();
    }

    actualizarEmpleado(id: string, data: any){
      return this.firestore.collection('empleados').doc(id).update(data);
    }
}