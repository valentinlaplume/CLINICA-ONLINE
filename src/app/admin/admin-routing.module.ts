import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MisTurnosTablaComponent } from '../core/shared/components/mis-turnos-tabla/mis-turnos-tabla.component';
import { ROLES_ENUM } from '../enumerators/roles.enum';
import { AutenticacionGuard } from '../guards/autenticacion.guard';
import { RolesAccesoGuard } from '../guards/roles-acceso.guard';
import { AdminComponent } from './admin.component';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';
import { HabilitarCuentasComponent } from './habilitar-cuentas/habilitar-cuentas.component';
import { RegisterAdminComponent } from './register/components/register-admin/register-admin.component';
import { RegisterComponent } from './register/containers/register/register.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: '', redirectTo: 'habilitar-cuentas', pathMatch: 'full' },
      {
        path: 'habilitar-cuentas',
        component: HabilitarCuentasComponent,
      },
      {
        path: 'registro/admin',
        component: RegisterComponent,
      },
      {
        path: 'turnos',
        component: MisTurnosTablaComponent,
      },
      {
        path: 'estadisticas',
        component: EstadisticasComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
