import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class EncuestaService {
  dbPath: string = 'encuestaClinica';
  encuestaCollection!: AngularFirestoreCollection<any>;

  constructor(
    public db: AngularFirestore,
    public router: Router,
    public afAuth: AngularFireAuth
  ) {
    this.encuestaCollection = this.db.collection<any>(this.dbPath, (ref) =>
      ref.orderBy('fecha', 'desc')
    );
  }

  async addEncuesta(
    item: any
    // turno: any,
    // pregUno: string,
    // pregDos: string,
    // pregTres: string
  ) {
    // console.log(id);
    // console.log(email);
    // console.log(nombre);

    const item2 = {
      id: '',
      turno: '',
      pregUno: item.pregUno,
      pregDos: item.pregDos,
      pregTres: item.pregTres,
      fecha: new Date().toLocaleDateString(),
    };

    const { id } = await this.encuestaCollection.add(item2);

    return await this.updateTurno(item.turno, await id);
  }

  public updateID(id: string) {
    return this.db.collection(this.dbPath).doc(id).update({ id: id });
  }

  public async updateTurno(turno: any, id: string) {
    const tutorialsRef = this.db.collection(this.dbPath);
    tutorialsRef.doc(id).update({ turno: Object.assign({}, turno), id: id });

    return await tutorialsRef;
  }
}
