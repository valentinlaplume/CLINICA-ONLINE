import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PublicComponent } from './public.component';
import { HomeComponent } from './home/containers/home/home.component';
import { LoginComponent } from './login/containers/login/login.component';
import { RegisterComponent } from './register/containers/register/register.component';
import { RegisterPacienteComponent } from './register/components/register-paciente/register-paciente.component';
import { RegisterEspecialistaComponent } from './register/components/register-especialista/register-especialista.component';
import { VerifyEmailComponent } from './register/components/verify-email/verify-email.component';
import { YaLogeadoGuard } from '../guards/yaLogeado.guard';
import { YaVerificadoEmailGuard } from '../guards/yaVerificadoEmail.guard';
import { RegisterEspecialidadComponent } from './register/components/register-especialidad/register-especialidad.component';
// import { MisTurnosTablaComponent } from '../core/shared/components/mis-turnos-tabla/mis-turnos-tabla.component';

const routes: Routes = [
  {
    path: '',
    component: PublicComponent,
    children: [
      { path: '', redirectTo: 'inicio', pathMatch: 'full' },
      { path: 'inicio', component: HomeComponent },
      {
        path: 'iniciar-sesion',
        component: LoginComponent,
        canActivate: [YaLogeadoGuard],
      },
      { path: 'solicitar-turno', component: HomeComponent },
      // { path: 'mis-turnos', component: MisTurnosTablaComponent },
      { path: 'registro', component: RegisterComponent },
      { path: 'registro/paciente', component: RegisterPacienteComponent },
      {
        path: 'registro/especialista',
        component: RegisterEspecialistaComponent,
      },
      {
        path: 'registro/especialidad',
        component: RegisterEspecialidadComponent,
      },
      {
        path: 'registro/verificar-correo',
        component: VerifyEmailComponent,
        canActivate: [YaVerificadoEmailGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicRoutingModule {}
