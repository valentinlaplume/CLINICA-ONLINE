import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { map, Observable } from 'rxjs';
import { Paciente } from '../models/paciente';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class PacienteService {
  public dbPath: string = 'pacientes';
  public paciente$!: Observable<Paciente[]>;
  public collectionPacientes!: AngularFirestoreCollection<Paciente>;
  public pacientes!: Observable<any[]>;

  constructor(
    public firestore: AngularFirestore,
    public angularFireStorage: AngularFireStorage,
    public router: Router
  ) {
    this.cargarCollection();
    // let item = new Paciente;
    // item.id = '';
    // item.descripcion = 'Oftalmología';
    // item.fechaAlta = new Date().toLocaleDateString();
    // this.create(item).then(x => console.log('create Paciente ok ', item.descripcion));
  }

  get(email: string) {
    // const collection = this.firestore.collection(this.dbPath);
    // return collection.doc(id).valueChanges();

    this.collectionPacientes = this.firestore.collection<Paciente>(
      this.dbPath,
      (ref) => ref.where('email', '==', email)
    );
    return this.collectionPacientes.snapshotChanges();
  }

  public getAll() {
    return this.firestore.collection(this.dbPath).snapshotChanges();
  }

  // public get(uid: string) {
  //   return this.firestore.collection(this.dbPath).doc(uid).snapshotChanges();
  // }

  private async create(item: any) {
    console.log('create Paciente ->', item);
    // let obj = {
    //   id:item.id,
    //   descripcion:item.descripcion,
    //   fechaAlta:item.fechaAlta
    // }
    const { id } = await this.firestore.collection(this.dbPath).add(item);
    return await this.updateID(await id);
  }

  public uploadImagesAndCreate(item: any, files: any[]): any {
    console.log(item);
    console.log(files);
    const storage = getStorage();

    item.urlFotos = [];
    let i = 0;
    files.forEach((file: any) => {
      let pathImg = this.dbPath + new Date().getTime() + '.png';
      const imgRef = ref(storage, pathImg);
      console.log(file);
      console.log(pathImg);
      console.log(imgRef);
      uploadBytes(imgRef, file)
        .then((e) => {
          getDownloadURL(e['ref'])
            .then(async (url: string) => {
              console.log(url);
              item.urlFotos.push(url);
              i++;
              if (i == files.length) {
                console.log('this.create(item)');
                this.create(item).then((x) => {
                  this.redirectUser(false);
                });
              }
            })
            .catch((err) => console.error('getDownloadURL: ', err));
        })
        .catch((err) => console.error(err));
    });
  }

  private redirectUser(isVerified: boolean): void {
    if (isVerified) {
      this.router.navigate(['inicio']);
    } else {
      this.router.navigate(['registro/verificar-correo']);
    }
  }

  public update(uid: string, data: any) {
    return this.firestore.collection(this.dbPath).doc(uid).update(data);
  }

  // public habilitarCuenta(uid: string) {
  //   return this.firestore
  //     .collection(this.dbPath)
  //     .doc(uid)
  //     .update({ cuentaHabilitada: true });
  // }

  // public deshabilitarCuenta(uid: string) {
  //   return this.firestore
  //     .collection(this.dbPath)
  //     .doc(uid)
  //     .update({ cuentaHabilitada: false });
  // }

  public updateID(id: string) {
    return this.firestore.collection(this.dbPath).doc(id).update({ id: id });
  }

  public async getAllArray() {
    let array = new Array();
    const suscription = this.getAll().subscribe((snapshot) => {
      snapshot.forEach((item: any) => {
        const data = item.payload.doc.data() as Paciente;
        data.id = item.payload.doc.id;
        array.push(data);
      });
    });

    // suscription.unsubscribe();
    return await array;
  }

  cargarCollection() {
    this.collectionPacientes = this.firestore.collection(this.dbPath);
    this.pacientes = this.collectionPacientes.snapshotChanges().pipe(
      map((actions) => {
        return actions.map((a) => {
          const data = a.payload.doc.data() as Paciente;
          data.id = a.payload.doc.id;
          return data;
        });
      })
    );
    // console.log(this.collectionEspecialistas);
    // console.log(this.especialistas);
  }
}
