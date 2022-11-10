import { Injectable } from '@angular/core';
import { sendEmailVerification } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ROLES_ENUM } from '../enumerators/roles.enum';
import { Admin } from '../models/admin';
import { Especialista } from '../models/especialista';
import { Paciente } from '../models/paciente';
import { AdminService } from './admin.service';
import { EspecialistaService } from './especialista.service';
import { PacienteService } from './paciente.service';
import { take, map } from 'rxjs/operators';
import { Usuario } from '../models/usuario';
import { async } from '@firebase/util';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  //public userData: Observable<any>;
  public usuarioLogeado: any;
  public usuario: any;
  public msjError: string = '';

  public ITEM_ACCESOS: any; // objeto con accesos utilizado en todo el sistema

  constructor(
    public afAuth: AngularFireAuth,
    public router: Router,
    private afs: AngularFirestore,
    private adminService: AdminService,
    private especialistaService: EspecialistaService,
    private pacienteService: PacienteService
  ) {
    this.setearUsuarioYAccesos();

    const obj = this.afAuth.user.subscribe((user) => {
      console.log(user);
      if (user != null) {
        this.usuario = {
          id: user.uid,
          email: user.email,
          emailVerificado: user.emailVerified,
        };
        console.log('USUARIO CONSTRUCTOR AUTH SERVICE:', this.usuario);
        this.getIsAdmin(user.email ?? '');
        this.getIsEspecialista(user.email ?? '');
        this.getIsPaciente(user.email ?? '');
      }
    });
    // this.userData = this.afAuth.authState;

    // this.userData.subscribe((user) => {
    //   console.log(user);
    //   if (user != null) {
    //     this.getIsAdmin(user.email ?? '');
    //     this.getIsEspecialista(user.email ?? '');
    //     this.getIsPaciente(user.email ?? '');
    //   }
    // });

    // this.afAuth.onAuthStateChanged((user) => {
    //   if (user) {
    //     // logged in or user exists
    //     this.getIsAdmin(user.email ?? '');
    //     this.getIsEspecialista(user.email ?? '');
    //     this.getIsPaciente(user.email ?? '');
    //   } else {
    //     // not logged in
    //     console.log('not logged in');
    //   }
    // });

    // this.afAuth.authState.subscribe((user) => {
    //   console.log('USER LOG ->', user);
    //   if (user && user.uid) {
    //     console.log('user != null ->', user.email);
    //     this.getIsAdmin(user.email ?? '');
    //     this.getIsEspecialista(user.email ?? '');
    //     this.getIsPaciente(user.email ?? '');
    //     localStorage.setItem('user', JSON.stringify(user));
    //     console.log(user);
    //   } else {
    //   }
    // });
  }
  public setearUsuarioLogeado(item: any) {
    this.usuarioLogeado = item;
  }

  public setearUsuarioYAccesos() {
    console.log('setearUsuario Y Accesos');
    this.usuario = null;
    this.setearItemAccesos();
    this.setearUsuarioLogeado(null);
  }

  public setearItemAccesos() {
    this.ITEM_ACCESOS = {
      cuentaHabilitada: false,
      isAdmin: false,
      isPaciente: false,
      isEspecialista: false,
    };
    console.log('setearItemAccesos');
  }

  async login(email: string, password: string) {
    return await this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.msjError = '';
        if (result.user) {
          this.usuario = {
            id: result.user.uid,
            email: result.user.email,
            emailVerificado: result.user.emailVerified,
          };
        }
      })
      .catch((error) => {
        this.setearUsuarioYAccesos();
        console.log(error);
        this.msjError = this.getError(error.code);
      });
  }

  async sendVerifcationEmail(
    user: any = this.afAuth.currentUser
  ): Promise<void> {
    try {
      console.log('sendVerifcationEmail', user);
      const r = sendEmailVerification(await user);
      console.log(r);
      return r;
    } catch (error: any) {
      console.log('Error->', error);
      this.msjError = this.getError(error);
    }
  }

  async register(email: string, password: string): Promise<any> {
    try {
      const { user } = await this.afAuth.createUserWithEmailAndPassword(
        email,
        password
      );
      await this.sendVerifcationEmail(user);
      this.msjError = '';
      return await user;
    } catch (error: any) {
      this.setearUsuarioYAccesos();
      console.log('Error->', error);
      this.msjError = this.getError(error.code);
    }
  }

  async getUserLogged() {
    return this.afAuth.onAuthStateChanged((usuario: any) => {
      if (usuario) {
        console.log('getUserLogged -> ', usuario);
        return usuario;
      }
    });
  }

  logout() {
    this.setearUsuarioYAccesos();
    return this.afAuth.signOut();
  }

  isEmailVerified(user: any): boolean {
    return user.emailVerified === true ? true : false;
  }

  private getError(msj: string): string {
    console.log('getError ->', msj);
    switch (msj) {
      case 'auth/user-not-found':
        return 'No existe ningún registro de usuario que corresponda al correo electrónico indicado.';
      case 'auth/email-already-in-use':
        return 'Otro usuario ya está utilizando el correo electrónico indicado.';
      case 'auth/invalid-email':
        return 'El formato del correo electrónico no es correcto.';
      case 'auth/invalid-password':
        return 'El valor que se proporcionó para la contraseña no es válido. Debe contener al menos seis caracteres.';
      case 'auth/invalid-phone-number':
        return 'El valor que se proporcionó para el número de celular no es válido. Debe no estar vacío y que cumpla con el estándar E.164.';
      case 'auth/wrong-password':
        return 'La contraseña no es válida.';
      case 'auth/email-already-in-use':
        return 'La dirección de correo electrónico ya está en uso por otra cuenta.';
    }
    return 'Ocurrió un error.';
  }

  public setearMsjError() {
    this.msjError = '';
  }

  public async getIsEspecialista(email: string) {
    // this.setearUsuarioYAccesos();
    if (email != '') {
      this.especialistaService.especialistas.subscribe((snapshot: any) => {
        snapshot.forEach((item: Especialista) => {
          if (item.email == email) {
            this.ITEM_ACCESOS.isEspecialista = true;
            this.ITEM_ACCESOS.cuentaHabilitada = item.cuentaHabilitada;
            this.setearUsuarioLogeado(item);
            console.log('Es Especialista', this.ITEM_ACCESOS);
            console.log('item Especialista', item);
          }
        });
      });
    }
  }

  public async getIsAdmin(email: string) {
    // this.setearUsuarioYAccesos();
    if (email != '') {
      this.adminService.administradores.subscribe((snapshot: any) => {
        snapshot.forEach((item: Admin) => {
          if (item.email == email) {
            this.ITEM_ACCESOS.isAdmin = true;
            this.setearUsuarioLogeado(item);
            console.log('Es Admin', this.ITEM_ACCESOS);
            console.log('item Admin', item);
          }
        });
      });
    }
  }

  public async getIsPaciente(email: string) {
    // this.setearUsuarioYAccesos();
    if (email != '') {
      this.pacienteService.pacientes.subscribe((snapshot: any) => {
        snapshot.forEach((item: Paciente) => {
          if (item.email == email) {
            this.ITEM_ACCESOS.isPaciente = true;
            this.setearUsuarioLogeado(item);
            console.log('Es Paciente', this.ITEM_ACCESOS);
            console.log('item Paciente', item);
          }
        });
      });
    }
  }
}
