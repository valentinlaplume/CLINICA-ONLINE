import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Especialista } from '../models/especialista';
import { AuthService } from '../services/auth.service';
import { EspecialistaService } from '../services/especialista.service';
import { map } from 'rxjs/operators';
import { ROLES_ENUM } from '../enumerators/roles.enum';
import { snapToData } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root',
})
export class RolesAccesoGuard implements CanActivate {
  public usuario$: Observable<any> = this.authSvc.afAuth.user;

  constructor(public authSvc: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    let retorno = true;

    // this.especialistaService.getAll().subscribe((snapshot) => {
    //   snapshot.forEach((item: any) => {
    //     const data = item.payload.doc.data() as Especialista;
    //     data.id = item.payload.doc.id;
    //     console.log(data);
    //     console.log(route.data['roles'][0]);

    //     if (data.id == 'i5oka57sNnUBEWaj7Zzu') {
    //       console.log('es este', data);
    //     }
    //   });
    // });
    console.log(
      'Guard roles-acceso, quiero acceso a: ',
      route.data['roles'][0]
    );
    switch (route.data['roles'][0]) {
      case ROLES_ENUM.ADMIN:
        retorno = this.authSvc.ITEM_ACCESOS.isAdmin;
        break;
      case ROLES_ENUM.ESPECIALISTA:
        retorno = this.authSvc.ITEM_ACCESOS.isEspecialista;
        break;
      case ROLES_ENUM.PACIENTE:
        retorno = this.authSvc.ITEM_ACCESOS.isPaciente;
        break;
      default:
        retorno = false;
        break;
    }

    return retorno;
  }
}
