import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable, map } from 'rxjs';
import { Especialista } from '../models/especialista';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

@Injectable({
  providedIn: 'root',
})
export class EspecialistaService {
  public dbPath: string = 'especialistas';
  public collectionEspecialistas!: AngularFirestoreCollection<Especialista>;
  public especialistas!: Observable<any[]>;

  constructor(
    public firestore: AngularFirestore,
    public angularFireStorage: AngularFireStorage
  ) {
    this.cargarCollection();
    // let item = new especialista;
    // item.id = '';
    // item.descripcion = 'Oftalmología';
    // item.fechaAlta = new Date().toLocaleDateString();
    // this.create(item).then(x => console.log('create especialista ok ', item.descripcion));
  }

  get(email: string) {
    // const collection = this.firestore.collection(this.dbPath);
    // return collection.doc(id).valueChanges();

    this.collectionEspecialistas = this.firestore.collection<Especialista>(
      this.dbPath,
      (ref) => ref.where('email', '==', email)
    );
    return this.collectionEspecialistas.snapshotChanges();
  }

  public getAll() {
    return this.firestore.collection(this.dbPath).snapshotChanges();
  }

  // public get(uid: string) {
  //   return this.firestore.collection(this.dbPath).doc(uid).snapshotChanges();
  // }

  private async create(item: any) {
    console.log('create especialista ->', item);
    // let obj = {
    //   id:item.id,
    //   descripcion:item.descripcion,
    //   fechaAlta:item.fechaAlta
    // }
    const { id } = await this.firestore.collection(this.dbPath).add(item);
    return await this.updateID(await id);
  }

  public uploadImageAndCreate(item: any, file: any): any {
    // console.log(file);
    const storage = getStorage();

    let pathImg = this.dbPath + new Date().getTime() + '.png';
    const imgRef = ref(storage, pathImg);

    const upload = uploadBytes(imgRef, file)
      .then((e) => {
        getDownloadURL(e['ref'])
          .then((url: string) => {
            item.urlFoto = url;
            return this.create(item);
          })
          .catch((err) => console.error('getDownloadURL: ', err));
      })
      .catch((err) => console.error(err));

    return upload;
  }

  public update(uid: string, data: any) {
    return this.firestore.collection(this.dbPath).doc(uid).update(data);
  }

  public habilitarCuenta(uid: string) {
    return this.firestore
      .collection(this.dbPath)
      .doc(uid)
      .update({ cuentaHabilitada: true });
  }

  public deshabilitarCuenta(uid: string) {
    return this.firestore
      .collection(this.dbPath)
      .doc(uid)
      .update({ cuentaHabilitada: false });
  }

  public updateID(id: string) {
    return this.firestore.collection(this.dbPath).doc(id).update({ id: id });
  }

  public async updateHorarios(usuario: Especialista) {
    console.log('update Horarios Especialista');
    console.log(usuario);
    console.log(usuario.horarios);

    const tutorialsRef = this.firestore.collection(this.dbPath);
    tutorialsRef
      .doc(usuario.id)
      .update({ horarios: Object.assign({}, usuario.horarios) });

    return await tutorialsRef;
  }

  // public async getAllArray() {
  //   let array = new Array();
  //   const suscription = this.especialistas.subscribe((snapshot: any) => {
  //     // console.log(item);
  //     // let item2 = {
  //     //   email: item.email,
  //     // };
  //     // array.push(item2);

  //     snapshot.forEach((item: any) => {
  //       const data = item.payload.doc.data() as Especialista;
  //       data.id = item.payload.doc.id;
  //       array.push(data);
  //       console.log(item);
  //     });
  //   });

  //   // suscription.unsubscribe();
  //   return await array;
  // }

  // public async getEspecialista(email: string) {
  //   let especialista = new Especialista();
  //   let retorno = false;
  //   const suscription = this.getAll().subscribe((snapshot) => {
  //     snapshot.forEach((item: any) => {
  //       const data = item.payload.doc.data() as Especialista;
  //       data.id = item.payload.doc.id;
  //       if (data.email == email) {
  //         especialista = data;
  //       }
  //     });
  //   });

  //   return await especialista;
  //   // suscription.unsubscribe();
  // }

  cargarCollection() {
    this.collectionEspecialistas = this.firestore.collection(this.dbPath);
    this.especialistas = this.collectionEspecialistas.snapshotChanges().pipe(
      map((actions) => {
        return actions.map((a) => {
          const data = a.payload.doc.data() as Especialista;
          data.id = a.payload.doc.id;
          return data;
        });
      })
    );
    // console.log(this.collectionEspecialistas);
    // console.log(this.especialistas);
  }
}
