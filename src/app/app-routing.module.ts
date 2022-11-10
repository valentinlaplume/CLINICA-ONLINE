import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NotFoundComponent } from './core/shared/components/not-found/not-found.component';
import { ROLES_ENUM } from './enumerators/roles.enum';
import { AutenticacionGuard } from './guards/autenticacion.guard';
import { RolesAccesoGuard } from './guards/roles-acceso.guard';
import { PublicComponent } from './public/public.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./public/public.module').then((res) => res.PublicModule),
  },
  {
    path: '',
    component: PublicComponent,
  },
  {
    path: '#',
    loadChildren: () =>
      import('./public/public.module').then((res) => res.PublicModule),
  },
  {
    path: 'administracion',
    loadChildren: () =>
      import('./admin/admin.module').then((res) => res.AdminModule),
    canActivate: [AutenticacionGuard, RolesAccesoGuard],
    data: {
      roles: [ROLES_ENUM.ADMIN], // cambiar por admin
    },
  },
  {
    path: 'intranet',
    loadChildren: () =>
      import('./intranet/intranet.module').then((res) => res.IntranetModule),
    canActivate: [AutenticacionGuard],
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
