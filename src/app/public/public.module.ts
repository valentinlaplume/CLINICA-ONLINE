import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicRoutingModule } from './public-routing.module';
import { SharedModule } from '../core/shared/shared.module';
import { PublicComponent } from './public.component';
import { HomeComponent } from './home/containers/home/home.component';
import { LoginComponent } from './login/containers/login/login.component';
import { RegisterComponent } from './register/containers/register/register.component';
import { RegisterEspecialistaComponent } from './register/components/register-especialista/register-especialista.component';
import { RegisterPacienteComponent } from './register/components/register-paciente/register-paciente.component';
import { TablaEspecialidadesComponent } from './register/components/tabla-especialidades/tabla-especialidades.component';
import { VerifyEmailComponent } from './register/components/verify-email/verify-email.component';
import { RegisterEspecialidadComponent } from './register/components/register-especialidad/register-especialidad.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    PublicComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    RegisterEspecialistaComponent,
    RegisterPacienteComponent,
    TablaEspecialidadesComponent,
    VerifyEmailComponent,
    RegisterEspecialidadComponent,
  ],
  imports: [CommonModule, PublicRoutingModule, SharedModule],
})
export class PublicModule {}
