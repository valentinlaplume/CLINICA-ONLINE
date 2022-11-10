import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';
import { Especialidad } from '../models/especialidad';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

@Injectable({
  providedIn: 'root',
})
export class EspecialidadService {
  public dbPath: string = 'especialidades';
  public especialidades$!: Observable<Especialidad[]>;

  constructor(
    public firestore: AngularFirestore,
    public angularFireStorage: AngularFireStorage
  ) {
    // let item = new Especialidad;
    // item.id = '';
    // item.descripcion = 'Oftalmología';
    // item.fechaAlta = new Date().toLocaleDateString();
    // this.create(item).then(x => console.log('create especialidad ok ', item.descripcion));
  }

  public getAll() {
    return this.firestore.collection(this.dbPath).snapshotChanges();
  }

  public get(uid: string) {
    return this.firestore.collection(this.dbPath).doc(uid).snapshotChanges();
  }

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

    if (file != null && file != undefined) {
      return uploadBytes(imgRef, file)
        .then((e) => {
          getDownloadURL(e['ref'])
            .then((url: string) => {
              item.urlFoto = url;
              return this.create(item);
            })
            .catch((err) => console.error('getDownloadURL: ', err));
        })
        .catch((err) => console.error(err));
    } else {
      return this.create(item);
    }
  }

  public update(uid: string, data: any) {
    return this.firestore.collection(this.dbPath).doc(uid).set(data);
  }

  public updateID(id: string) {
    return this.firestore.collection(this.dbPath).doc(id).update({ id: id });
  }
}
