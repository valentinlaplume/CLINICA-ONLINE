import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TurnoService } from 'src/app/services/turno.service';

@Component({
  selector: 'app-turno-detalle',
  templateUrl: './turno-detalle.component.html',
  styleUrls: ['./turno-detalle.component.css'],
})
export class TurnoDetalleComponent implements OnInit {
  //public usuario$: Observable<any> = this.authSvc.afAuth.user;
  @Input() turnoDetalle!: any;
  aceptado = 'ACEPTADO';
  rechazado = 'RECHAZADO';
  cancelado = 'CANCELADO';
  finalizado = 'FINALIZADO';
  pendiente = 'PENDIENTE';
  realizado = 'REALIZADO';
  email!: string;
  usuario: any;
  nuevoComentarioPaciente!: string;
  nuevoComentarioEspecialista!: string;
  nuevoComentarioAdmin!: string;
  cancela: boolean = false;
  rechaza: boolean = false;
  finaliza: boolean = false;
  noMostrarEnviarComentarioEsp: boolean = false;
  noMostrarEnviarComentarioPac: boolean = false;
  noMostrarEnviarComentarioAdmin: boolean = false;

  estadoAccion: string = '';

  constructor(
    private turnoSvc: TurnoService,
    public authSvc: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.estadoAccion = '';
    this.usuario = this.authSvc.usuarioLogeado;
    //this.obtenerUsuarioLogueado();
  }

  cancelar() {
    // this.turnoDetalle.estado = this.cancelado;
    this.estadoAccion = this.cancelado;

    this.cancela = true;
    this.rechaza = false;
    this.finaliza = false;
    // this.turnoSvc.updateTurnoEstado(this.turnoDetalle);
    //this.turnoSvc.updateTurno(this.turnoDetalle);
  }

  rechazar() {
    // this.turnoDetalle.estado = this.rechazado;
    this.estadoAccion = this.rechazado;

    this.cancela = false;
    this.rechaza = true;
    this.finaliza = false;

    // this.turnoSvc.updateTurnoEstado(this.turnoDetalle);
    //this.turnoSvc.updateTurno(this.turnoDetalle);
  }

  aceptar() {
    this.turnoDetalle.estado = this.aceptado;
    this.estadoAccion = this.aceptado;

    // this.turnoSvc.updateTurnoEstado(this.turnoDetalle);
  }

  finalizar() {
    this.cancela = false;
    this.rechaza = false;
    this.finaliza = true;
    // this.turnoDetalle.estado = this.finalizado;
    this.estadoAccion = this.finalizado;

    //this.turnoSvc.updateTurno(this.turnoDetalle);
  }

  enviarComentario() {
    this.turnoDetalle.estado = this.estadoAccion;
    if (this.authSvc.ITEM_ACCESOS.isEspecialista) {
      this.turnoDetalle.comentariosEspecialista =
        this.nuevoComentarioEspecialista;
      this.turnoSvc.updateTurnoEstadoComentariosEspecialista(this.turnoDetalle);
      this.noMostrarEnviarComentarioEsp = true;
      this.nuevoComentarioEspecialista = '';
      // this.router.navigate(['/intranet/mis-turnos-especialista']);
    } else if (this.authSvc.ITEM_ACCESOS.isPaciente) {
      this.turnoDetalle.comentariosPaciente = this.nuevoComentarioPaciente;
      this.turnoSvc.updateTurnoEstadoComentariosPaciente(this.turnoDetalle);
      this.noMostrarEnviarComentarioPac = true;
      this.nuevoComentarioPaciente = '';
      // this.router.navigate(['/intranet/mis-turnos-paciente']);
    } else if (this.authSvc.ITEM_ACCESOS.isAdmin) {
      this.turnoDetalle.comentariosAdmin = this.nuevoComentarioAdmin;
      this.turnoSvc.updateTurnoEstadoComentariosAdmin(this.turnoDetalle);
      this.noMostrarEnviarComentarioAdmin = true;
      this.nuevoComentarioAdmin = '';
      // this.router.navigate(['/administracion/turnos']);
    }
    this.estadoAccion = '';

    if (this.authSvc.ITEM_ACCESOS.isEspecialista) {
      this.router.navigate(['/intranet/mis-turnos-especialista']);
    } else if (this.authSvc.ITEM_ACCESOS.isPaciente) {
      this.router.navigate(['/intranet/mis-turnos-paciente']);
    } else if (this.authSvc.ITEM_ACCESOS.isAdmin) {
      this.router.navigate(['/administracion/turnos']);
    }

    //this.turnoDetalle = null;
  }
}
