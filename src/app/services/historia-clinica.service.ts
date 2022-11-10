import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class HistoriaClinicaService {
  public historias;
  historis: string = 'historiaClinica';
  constructor(public router: Router, public firestore: AngularFirestore) {
    this.historias = this.firestore
      .collection('historiaClinica')
      .snapshotChanges();
  }

  //   guardarHistoriaClinica(historia: HistoriaClinica) :any{
  //     console.log(historia);
  //     this.firestore.collection('historiaClinica').add({
  //       presion: historia.presion,
  //       altura: historia.altura,
  //       peso: historia.peso,
  //       clave1: historia.clave1,
  //       temperatura: historia.temperatura,
  //       valor1: historia.valor1,
  //       clave2: historia.clave2,
  //       valor2: historia.valor2,
  //       turnoId : historia.turnoId,
  //       id: ""
  //     });
  //   }
  //
}
