import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Turno } from 'src/app/models/turno';
import { AuthService } from 'src/app/services/auth.service';
import { HistoriaClinicaService } from 'src/app/services/historia-clinica.service';
import { TurnoService } from 'src/app/services/turno.service';

@Component({
  selector: 'app-mis-turnos-tabla',
  templateUrl: './mis-turnos-tabla.component.html',
  styleUrls: ['./mis-turnos-tabla.component.css'],
})
export class MisTurnosTablaComponent implements OnInit {
  public usuario$: Observable<any> = this.authSvc.afAuth.user;

  usuarios: any = [];
  usuario: any;
  public filter!: string;
  turnosOcupados: any;
  turnoSeleccionado!: Turno;
  turnosPaciente: any;
  turnosEspecialista: any;
  turnosHistoria: any;
  public listadoHistoriaClinica: any = [];
  public listaHistoriaClinica: any = [];

  constructor(
    private turnoSvc: TurnoService,
    public authSvc: AuthService // private historiaClinicaService: HistoriaClinicaService
  ) {}

  ngOnInit(): void {
    //  this.authSvc.usuarioLogeado;

    // this.armarTurnosHistoria();

    setTimeout(() => {
      this.usuario = this.authSvc.usuario;
      console.log('------------MisTurnosTablaComponent-------------');

      if (this.usuario != null) {
        if (this.authSvc.ITEM_ACCESOS.isPaciente) {
          console.log('IS paciente MIS TURNOS paciente');
          this.turnosOcupados = this.turnoSvc.firestore.collection(
            'turnos',
            (ref) => ref.where('paciente.email', '==', this.usuario.email)
          );
        } else if (this.authSvc.ITEM_ACCESOS.isAdmin) {
          console.log('IS ADMIN MIS TURNOS ADMIN');
          this.turnosOcupados = this.turnoSvc.turnosCollection;
        }
        console.log(this.turnosOcupados);

        this.cargarTurnos();
      }
    }, 3000);
  }

  // armarTurnosHistoria() {
  //   console.log(this.usuario);
  //   console.log(this.authSvc.usuarioLogeado);
  //   if (this.usuario != null) {

  //     this.turnosPaciente = [];
  //     this.turnoSvc.turnos.subscribe((turno: any) => {
  //       console.log(turno);
  //       this.turnosPaciente.push(turno);
  //     });
  //   }
  // }

  cargarTurnos() {
    this.turnosPaciente = [];
    this.turnosOcupados
      .snapshotChanges()
      .pipe(
        map((data: any) => {
          data.map((item: any) => {
            console.log(item);
            //var turno = item;
            var turno = new Turno();
            turno.id = item.payload.doc.id;
            // turno.idEspecialista = item.payload.doc.data().idEspecialista;
            // turno.idPaciente = item.payload.doc.data().idPaciente;
            turno.estado = item.payload.doc.data().estado;
            //turno.paciente = new Usuario();
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
          console.log('turnos  Paciente: ', this.turnosPaciente);
        })
      )
      .subscribe();
  }

  asignarTurno(turno: any) {
    console.log(turno);
    // var data = especialidad;
    this.turnoSeleccionado = turno;
  }
}
