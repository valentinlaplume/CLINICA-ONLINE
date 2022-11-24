import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { SharedModule } from 'src/app/core/shared/shared.module';
import { HabilitarCuentasComponent } from './habilitar-cuentas/habilitar-cuentas.component';
import { EspecialistaTablaComponent } from './especialista-tabla/especialista-tabla.component';
import { PacienteTablaComponent } from './paciente-tabla/paciente-tabla.component';
import { RegisterComponent } from './register/containers/register/register.component';
import { RegisterAdminComponent } from './register/components/register-admin/register-admin.component';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';

@NgModule({
  declarations: [
    AdminComponent,
    HabilitarCuentasComponent,
    EspecialistaTablaComponent,
    PacienteTablaComponent,
    RegisterComponent,
    RegisterAdminComponent,
    EstadisticasComponent,
  ],
  imports: [CommonModule, AdminRoutingModule, SharedModule],
})
export class AdminModule {}
