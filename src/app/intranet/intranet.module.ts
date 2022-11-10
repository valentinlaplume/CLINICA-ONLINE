import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IntranetRoutingModule } from './intranet-routing.module';
import { IntranetComponent } from './intranet.component';
import { MiPerfilComponent } from './mi-perfil/mi-perfil.component';
import { SharedModule } from '../core/shared/shared.module';
import { MisHorariosComponent } from './mis-horarios/mis-horarios.component';
import { SolicitarTurnoComponent } from './solicitar-turno/solicitar-turno.component';

@NgModule({
  declarations: [IntranetComponent, MiPerfilComponent, MisHorariosComponent, SolicitarTurnoComponent],
  imports: [CommonModule, IntranetRoutingModule, SharedModule],
})
export class IntranetModule {}
