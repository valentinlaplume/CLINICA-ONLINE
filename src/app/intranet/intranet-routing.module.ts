import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MisPacientesComponent } from '../core/shared/components/mis-pacientes/mis-pacientes.component';
import { MisTurnosEspecialistaComponent } from '../core/shared/components/mis-turnos-especialista/mis-turnos-especialista.component';
import { MisTurnosTablaComponent } from '../core/shared/components/mis-turnos-tabla/mis-turnos-tabla.component';
import { UsuariosComponent } from '../core/shared/components/usuarios/usuarios.component';
import { ROLES_ENUM } from '../enumerators/roles.enum';
import { AutenticacionGuard } from '../guards/autenticacion.guard';
import { RolesAccesoGuard } from '../guards/roles-acceso.guard';
import { HomeComponent } from '../public/home/containers/home/home.component';
import { IntranetComponent } from './intranet.component';
import { MiPerfilComponent } from './mi-perfil/mi-perfil.component';
import { MisHorariosComponent } from './mis-horarios/mis-horarios.component';
import { SolicitarTurnoComponent } from './solicitar-turno/solicitar-turno.component';

const routes: Routes = [
  {
    path: '',
    component: IntranetComponent,
    children: [
      { path: '', redirectTo: 'inicio', pathMatch: 'full' },
      {
        path: 'mi-perfil',
        component: MiPerfilComponent,
      },
      {
        path: 'mis-horarios',
        component: MisHorariosComponent,
        canActivate: [RolesAccesoGuard],
        data: {
          roles: [ROLES_ENUM.ESPECIALISTA],
        },
      },
      {
        path: 'solicitar-turno',
        component: SolicitarTurnoComponent,
      },
      {
        path: 'mis-turnos-especialista',
        component: MisTurnosEspecialistaComponent,
        canActivate: [RolesAccesoGuard],
        data: {
          roles: [ROLES_ENUM.ESPECIALISTA],
        },
      },
      {
        path: 'mis-turnos-paciente',
        component: MisTurnosTablaComponent,
        canActivate: [RolesAccesoGuard],
        data: {
          roles: [ROLES_ENUM.PACIENTE],
        },
      },
      {
        path: 'mis-pacientes',
        component: MisPacientesComponent,
        canActivate: [RolesAccesoGuard],
        data: {
          roles: [ROLES_ENUM.ESPECIALISTA],
        },
      },
      {
        path: 'usuarios',
        component: UsuariosComponent,
        canActivate: [RolesAccesoGuard],
        data: {
          roles: [ROLES_ENUM.ADMIN],
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IntranetRoutingModule {}
