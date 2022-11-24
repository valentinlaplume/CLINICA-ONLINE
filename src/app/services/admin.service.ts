import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable, map } from 'rxjs';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Admin } from '../models/admin';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private dbPath: string = 'administradores';
  private dbPathLogs: string = 'logIngresosClinica';
  public admin$!: Observable<Admin[]>;
  public collectionAdministradores!: AngularFirestoreCollection<Admin>;
  public administradores!: Observable<any[]>;

  constructor(
    public firestore: AngularFirestore,
    public angularFireStorage: AngularFireStorage
  ) {
    this.cargarCollection();
  }

  get(email: string) {
    // const collection = this.firestore.collection(this.dbPath);
    // return collection.doc(id).valueChanges();

    this.collectionAdministradores = this.firestore.collection<Admin>(
      this.dbPath,
      (ref) => ref.where('email', '==', email)
    );
    return this.collectionAdministradores.snapshotChanges();
  }

  public getAll() {
    return this.firestore.collection(this.dbPath).snapshotChanges();
  }

  // public get(uid: string) {
  //   return this.firestore.collection(this.dbPath).doc(uid).snapshotChanges();
  // }

  async addLogIngreso(email: string) {
    var fecha = new Date();
    let item = {
      email: email,
      fecha: fecha.toLocaleDateString(),
      hora: fecha.toLocaleTimeString(),
    };
    // this.firestore.collection(this.dbPathLogs).add({
    //   email: email,
    //   fecha: fecha.toLocaleDateString(),
    //   hora: fecha.toLocaleTimeString(),
    // });

    return await this.firestore.collection(this.dbPathLogs).add(item);
  }

  private async create(item: any) {
    console.log('create collectionAdministradores ->', item);
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

  public async getAllArray() {
    let array = new Array();
    const suscription = this.getAll().subscribe((snapshot) => {
      snapshot.forEach((item: any) => {
        const data = item.payload.doc.data() as Admin;
        data.id = item.payload.doc.id;
        array.push(data);
      });
    });

    // suscription.unsubscribe();
    return await array;
  }

  cargarCollection() {
    this.collectionAdministradores = this.firestore.collection(this.dbPath);
    this.administradores = this.collectionAdministradores
      .snapshotChanges()
      .pipe(
        map((actions) => {
          return actions.map((a) => {
            const data = a.payload.doc.data() as Admin;
            data.id = a.payload.doc.id;
            return data;
          });
        })
      );
    // console.log(this.collectionEspecialistas);
    // console.log(this.especialistas);
  }

  getCollection(collection: string) {
    return this.firestore
      .collection<any>(collection)
      .valueChanges({ idField: 'id' });
  }
}
