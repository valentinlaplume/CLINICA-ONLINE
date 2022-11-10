import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import { HistoriaClinica } from '../models/historia-clinica';
import { Turno } from '../models/turno';

@Injectable({
  providedIn: 'root',
})
export class TurnoService {
  dbPath: string = 'turnos';

  turnosCollection!: AngularFirestoreCollection;
  turnos!: Observable<Turno[]>;
  turnosPorEspecialidad: Array<any> = [];
  cantTurnosPorEspecialidad: any;

  constructor(public firestore: AngularFirestore) {
    this.cargarCollection();
  }

  async cargarCollection() {
    this.turnosCollection = this.firestore.collection(this.dbPath, (ref) =>
      ref.orderBy('fecha')
    );

    this.turnos = await this.turnosCollection.snapshotChanges().pipe(
      map((actions) => {
        return actions.map((a) => {
          const data = a.payload.doc.data() as Turno;
          data.id = a.payload.doc.id;
          return data;
        });
      })
    );
  }

  getTurnos() {
    return this.turnos;
  }

  public updateID(id: string) {
    return this.firestore.collection(this.dbPath).doc(id).update({ id: id });
  }

  async addTurno(turno: any): Promise<any> {
    const { id } = await this.turnosCollection.add({
      id: '',
      estado: turno.estado,
      paciente: turno.paciente,
      especialista: turno.especialista,
      especialidad: turno.especialidad,
      fecha: turno.fecha,
      hora: turno.hora,
      comentariosPaciente: turno.comentariosPaciente,
      comentariosEspecialista: turno.comentariosEspecialista,
      comentariosAdmin: turno.comentariosAdmin,
      historiaClinica: '',
      encuesta: '',
      calificacionAtencion: '',
    });

    return await this.updateID(await id);
    // const item = {
    //   id: '',
    //   estado: turno.estado,
    //   paciente: turno.paciente,
    //   especialista: turno.especialista,
    //   especialidad: turno.especialidad,
    //   fecha: turno.fecha,
    //   hora: turno.hora,
    //   comentariosPaciente: turno.comentariosPaciente,
    //   comentariosEspecialista: turno.comentariosEspecialista,
    //   comentariosAdmin: turno.comentariosAdmin,
    //   historiaClinica: turno.historiaClinica,
    // };

    // console.log('addTurno -> ', item);
  }

  updateTurno(turno: Turno) {
    const tutorialsRef = this.firestore.collection(this.dbPath);
    tutorialsRef.doc(turno.id).update(turno);
    // this.cargarCollection();
  }

  updateTurnoEstado(turno: Turno) {
    const tutorialsRef = this.firestore.collection(this.dbPath);
    tutorialsRef.doc(turno.id).update({ estado: turno.estado });
    // this.cargarCollection();
  }

  updateTurnoEstadoComentariosPaciente(turno: Turno) {
    const tutorialsRef = this.firestore.collection(this.dbPath);
    tutorialsRef.doc(turno.id).update({
      estado: turno.estado,
      comentariosPaciente: turno.comentariosPaciente,
    });
    // this.cargarCollection();
  }

  updateTurnoEstadoComentariosEspecialista(turno: Turno) {
    const tutorialsRef = this.firestore.collection(this.dbPath);
    tutorialsRef.doc(turno.id).update({
      estado: turno.estado,
      comentariosEspecialista: turno.comentariosEspecialista,
    });
    // this.cargarCollection();
  }

  updateTurnoEstadoComentariosAdmin(turno: Turno) {
    const tutorialsRef = this.firestore.collection(this.dbPath);
    tutorialsRef.doc(turno.id).update({
      estado: turno.estado,
      comentariosAdmin: turno.comentariosAdmin,
    });
    // this.cargarCollection();
  }

  updateTurnoHistoriaClinica(historia: HistoriaClinica, turnoId: string) {
    const tutorialsRef = this.firestore.collection(this.dbPath);
    console.log(historia);

    tutorialsRef
      .doc(turnoId)
      .update({ historiaClinica: Object.assign({}, historia) });
    this.cargarCollection();
  }

  getTurnosByEspecialidad(especialidad: string) {
    return this.firestore
      .collection<any>('turnos', (ref) =>
        ref.where('especialidad.nombre', '==', especialidad)
      )
      .valueChanges({ idField: 'id' });
  }

  // async getTurnoscantidadByEspecialidad(especialidad: string):Promise<any>{
  //    const registros = await this.db.collection("turnos", ref => ref.where('especialidad.nombre', '==', especialidad)).get();
  //   console.log(registros.);

  // }

  getTurnosPorDia() {
    return this.firestore
      .collection<any>('turnos')
      .valueChanges({ idField: 'id' });
  }

  public async addEncuesta(turno: any, encuesta: any) {
    const tutorialsRef = this.firestore.collection(this.dbPath);
    tutorialsRef
      .doc(turno.id)
      .update({ encuesta: Object.assign({}, encuesta) });

    return await tutorialsRef;
  }

  public async addCalificacionAtencion(turno: any, calificacionAtencion: any) {
    const tutorialsRef = this.firestore.collection(this.dbPath);
    tutorialsRef.doc(turno.id).update({
      calificacionAtencion: Object.assign({}, calificacionAtencion),
    });

    return await tutorialsRef;
  }
}
