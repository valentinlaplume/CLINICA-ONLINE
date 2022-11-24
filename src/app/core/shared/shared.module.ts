import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { NotFoundComponent } from './components/not-found/not-found.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { CaptchaPropioComponent } from './components/captcha-propio/captcha-propio.component';
import { NotImageDirective } from './directives/not-image.directive';
import { EspecialistaListaComponent } from './components/especialista-lista/especialista-lista.component';
import { EspecialidadListaComponent } from './components/especialidad-lista/especialidad-lista.component';
import { PacienteListaComponent } from './components/paciente-lista/paciente-lista.component';
import { MisTurnosTablaComponent } from './components/mis-turnos-tabla/mis-turnos-tabla.component';
import { TurnoDetalleComponent } from './components/turno-detalle/turno-detalle.component';
import { EncuestaComponent } from './components/encuesta/encuesta.component';
import { FilterTurnosPipe } from './pipes/filter-turnos.pipe';
import { FilterEspecialistaPipe } from './pipes/filter-especialista.pipe';
import { FilterPacientePipe } from './pipes/filter-paciente.pipe';
import { MisTurnosEspecialistaComponent } from './components/mis-turnos-especialista/mis-turnos-especialista.component';
import { RegistrarCalificacionAtencionComponent } from './components/registrar-calificacion-atencion/registrar-calificacion-atencion.component';
import { EncuestaDetalleComponent } from './components/encuesta-detalle/encuesta-detalle.component';
import { HistoriaClinicaComponent } from './components/historia-clinica/historia-clinica.component';
import { HistoriaClinicaAltaComponent } from './components/historia-clinica-alta/historia-clinica-alta.component';
import { HistoriaClinicaDetalleComponent } from './components/historia-clinica-detalle/historia-clinica-detalle.component';
import { MisPacientesComponent } from './components/mis-pacientes/mis-pacientes.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { LogIngresosComponent } from './components/log-ingresos/log-ingresos.component';
import { GraficoCantTurnosPorEspecialidadComponent } from './components/grafico-cant-turnos-por-especialidad/grafico-cant-turnos-por-especialidad.component';
import { GraficoCantTurnosPorDiaComponent } from './components/grafico-cant-turnos-por-dia/grafico-cant-turnos-por-dia.component';
import { GraficoCantTurnosEspecialistaComponent } from './components/grafico-cant-turnos-especialista/grafico-cant-turnos-especialista.component';
import { GraficoCantTurnosEspecialistaFinalizadosComponent } from './components/grafico-cant-turnos-especialista-finalizados/grafico-cant-turnos-especialista-finalizados.component';
import { HighchartsChartModule } from 'highcharts-angular';
// import { ChartistModule } from 'ng-chartist';
import { CaptchaDirective } from './directives/captcha.directive';
import { ResaltarDirective } from './directives/resaltar.directive';

@NgModule({
  declarations: [
    NotImageDirective,
    CaptchaDirective,

    NotFoundComponent,
    NavbarComponent,
    CaptchaPropioComponent,
    EspecialistaListaComponent,
    EspecialidadListaComponent,
    PacienteListaComponent,
    MisTurnosTablaComponent,
    TurnoDetalleComponent,
    EncuestaComponent,

    FilterTurnosPipe,
    FilterEspecialistaPipe,
    FilterPacientePipe,
    MisTurnosEspecialistaComponent,
    RegistrarCalificacionAtencionComponent,
    EncuestaDetalleComponent,
    HistoriaClinicaComponent,
    HistoriaClinicaAltaComponent,
    HistoriaClinicaDetalleComponent,
    MisPacientesComponent,
    UsuariosComponent,
    LogIngresosComponent,
    GraficoCantTurnosPorEspecialidadComponent,
    GraficoCantTurnosPorDiaComponent,
    GraficoCantTurnosEspecialistaComponent,
    GraficoCantTurnosEspecialistaFinalizadosComponent,
    ResaltarDirective,
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireStorageModule,
    HighchartsChartModule,
    // ChartistModule,
  ],
  exports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireStorageModule,

    NotFoundComponent,
    NavbarComponent,
    CaptchaPropioComponent,
    EspecialistaListaComponent,
    EspecialidadListaComponent,
    PacienteListaComponent,
    MisTurnosTablaComponent,
    EncuestaDetalleComponent,
    HistoriaClinicaComponent,
    HistoriaClinicaAltaComponent,
    HistoriaClinicaDetalleComponent,
    MisPacientesComponent,
    UsuariosComponent,
    LogIngresosComponent,
    GraficoCantTurnosPorEspecialidadComponent,
    GraficoCantTurnosPorDiaComponent,
    GraficoCantTurnosEspecialistaComponent,
    GraficoCantTurnosEspecialistaFinalizadosComponent,

    NotImageDirective,
    CaptchaDirective,

    FilterTurnosPipe,
    FilterEspecialistaPipe,
    FilterPacientePipe,
  ],
})
export class SharedModule {}
