import { Injectable } from '@angular/core';
import { 
  AngularFirestore,
  AngularFirestoreCollection 
} from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import { Admin } from '../models/admin';

//------------------------ de

@Injectable({
  providedIn: 'root'
})
export class administradoreservice {
  private dbPath: string = '/administradores';
  public administrador: Admin = new Admin();
  administradoresRef!: AngularFirestoreCollection<any>;
  administradorData: any;
  userMail!: string;
  administradores!: Observable<any[]>;

  constructor(private firestoreDb: AngularFirestore) {
    this.administradoresRef = firestoreDb.collection<any>(this.dbPath);
    this.getAdministradores();
  }

  getAdministradores() {
    this.administradores = this.administradoresRef.snapshotChanges()
    .pipe(
      map(actions => actions.map(a => a.payload.doc.data() as Admin))
    )
  }

  getAdministradorById(id: string) {
    let administradorRef = this.firestoreDb.collection(this.dbPath, ref => ref.where(id, '==', 'id'));
    return administradorRef;
  }

  registerAdministrador(item: any, id: string) {
    this.administradoresRef.add(
      {
        email: item.email,
        fecha: new Date().toLocaleString(),
        id: id
      });
  }

}
