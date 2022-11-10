import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { Turno } from 'src/app/models/turno';
import { AuthService } from 'src/app/services/auth.service';
import { TurnoService } from 'src/app/services/turno.service';

@Component({
  selector: 'app-mis-turnos-especialista',
  templateUrl: './mis-turnos-especialista.component.html',
  styleUrls: ['./mis-turnos-especialista.component.css'],
})
export class MisTurnosEspecialistaComponent implements OnInit {
  usuarios: any = [];
  usuario: any;
  public filter!: string;
  turnosOcupados: any;
  turnoSeleccionado!: Turno;
  turnosPaciente: any;
  turnosEspecialista: any;
  historiasClinicas: any;
  historias: any;
  mostrarAltaHistoria: boolean = true;
  turnosHistoria: any;
  public listadoHistoriaClinica: any = [];
  public listaHistoriaClinica: any = [];

  constructor(private turnoSvc: TurnoService, private authSvc: AuthService) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.usuario = this.authSvc.usuario;
      console.log('--------------------------------------------');
      console.log(this.usuario);
      console.log(this.authSvc.usuario);

      if (this.usuario != null) {
        this.turnosOcupados = this.turnoSvc.firestore.collection(
          'turnos',
          (ref) => ref.where('especialista.email', '==', this.usuario.email)
        );
        console.log(this.turnosOcupados);

        this.cargarTurnos();
      }
    }, 3000);
  }

  cargarTurnos() {
    // this.turnoSvc.getTurnos().subscribe(turnos => {
    //   this.turnosOcupados = turnos;
    // });

    this.turnosOcupados
      .snapshotChanges()
      .pipe(
        map((data: any) => {
          this.turnosPaciente = new Array<Turno>();
          data.map((item: any) => {
            var turno = new Turno();
            turno.id = item.payload.doc.id;
            // turno.idEspecialista = item.payload.doc.data().idEspecialista;
            // turno.idPaciente = item.payload.doc.data().idPaciente;
            turno.estado = item.payload.doc.data().estado;
            turno.paciente = item.payload.doc.data().paciente;
            turno.especialista = item.payload.doc.data().especialista;
            turno.especialidad = item.payload.doc.data().especialidad;
            turno.fecha = item.payload.doc.data().fecha;
            turno.hora = item.payload.doc.data().hora;
            turno.comentariosPaciente =
              item.payload.doc.data().comentariosPaciente;
            turno.comentariosEspecialista =
              item.payload.doc.data().comentariosEspecialista;
            turno.comentariosAdmin = item.payload.doc.data().comentariosAdmin;
            turno.historiaClinica = item.payload.doc.data().historiaClinica;

            turno.encuesta = item.payload.doc.data().encuesta;
            turno.calificacionAtencion =
              item.payload.doc.data().calificacionAtencion;

            // this.turnosPaciente.forEach((item: any) => {
            //   if (
            //     item.fecha != turno.fecha &&
            //     item.hora != turno.hora &&
            //     item.especialidad.descripcion != turno.especialidad.descripcion
            //   ) {
            //     this.turnosPaciente.push(turno);
            //   }
            // });
            this.turnosPaciente.push(turno);
          });
          // this.turnosPaciente = [...this.turnosPaciente];
          console.log('turnos Especialista: ', this.turnosPaciente);
        })
      )
      .subscribe();
  }

  asignarTurno(turno: any) {
    this.turnoSeleccionado = turno;
    console.log(this.turnoSeleccionado.historiaClinica);
    console.log(turno.historiaClinica);

    if (turno.historiaClinica != '') {
      console.log('oculto');

      this.mostrarAltaHistoria = false;
    } else {
      console.log('muestro');
      this.mostrarAltaHistoria = true;
    }
  }
}
