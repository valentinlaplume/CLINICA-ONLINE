import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { ENUM_ESTADO_TURNO } from 'src/app/enumerators/estadoTurno.enum';
import { Especialidad } from 'src/app/models/especialidad';
import { Especialista } from 'src/app/models/especialista';
import { HistoriaClinica } from 'src/app/models/historia-clinica';
import { Paciente } from 'src/app/models/paciente';
import { Turno } from 'src/app/models/turno';
import { AuthService } from 'src/app/services/auth.service';
import { EspecialidadService } from 'src/app/services/especialidad.service';
import { EspecialistaService } from 'src/app/services/especialista.service';
import { PacienteService } from 'src/app/services/paciente.service';
import { TurnoService } from 'src/app/services/turno.service';

@Component({
  selector: 'app-solicitar-turno',
  templateUrl: './solicitar-turno.component.html',
  styleUrls: ['./solicitar-turno.component.css'],
})
export class SolicitarTurnoComponent implements OnInit, OnDestroy {
  suscripciones: Subscription[] = [];

  especialistas: any[] = [];
  especialistaSeleccionado: any;

  especialidades: any[] = [];
  especialidadSeleccionado: any;

  pacientes: any[] = [];
  pacienteSeleccionado: any;
  spinner: boolean = true;

  successOperation: boolean = false;

  public usuario$: Observable<any> = this.authSvc.afAuth.user;
  usuarios: any[] = [];
  especialistasEspecialidad: any[] = [];
  turno!: Turno;
  turnosOcupados: any;
  fromDate: any;
  toDate: any;
  fechas: any;
  mostrarHora = false;
  fechaElegida: any;
  horaElegida!: string;
  // usuario: any;
  turnosDisponibles: any[] = [];
  listaUsuarios: any[] = [];
  idAdmin = false;
  email!: string;
  paciente!: any;
  administrador!: any;
  captchaPropio: boolean = false;

  constructor(
    // private usuarioSvc: UsuarioService,
    public authSvc: AuthService,
    public especialistaService: EspecialistaService,
    public especialidadService: EspecialidadService,
    public pacienteService: PacienteService,
    private turnoSvc: TurnoService,
    private router: Router
  ) {
    this.successOperation = false;
    // this.cargarTurnos();
    // this.cargarEspecialidades();
    // this.cargarUsuarios();
    // this.obtenerUsuarioLogueado();
  }

  ngOnInit(): void {
    this.setearTurno();
    this.spinnerShow();
    this.cargarTurnos();
    this.cargarPacientes();
    this.cargarEspecialistas();
    setTimeout(() => {
      this.spinnerHide();
    }, 2000);
  }

  ngOnDestroy(): void {
    this.suscripciones.forEach((observable) => {
      observable.unsubscribe();
      console.log(
        'cantidad de unsubscribe HabilitarCuentasComponent: ',
        this.suscripciones.length
      );
    });
  }

  private spinnerShow() {
    this.spinner = true;
  }

  private spinnerHide() {
    this.spinner = false;
  }

  cargarEspecialistas() {
    this.suscripciones.push(
      this.especialistaService.getAll().subscribe((snapshot) => {
        this.especialistas = [];
        snapshot.forEach((item: any) => {
          {
            const data = item.payload.doc.data() as Especialista;
            data.id = item.payload.doc.id;
            if (data.cuentaHabilitada) {
              this.especialistas.push(data);
            }
          }
        });
      })
    );
  }

  cargarEspecialidades() {
    this.especialidades = [];
    this.especialistaSeleccionado.especialidades.forEach((data: any) => {
      this.especialidades.push(data);
    });
    // this.suscripciones.push(
    //   this.especialidadService.getAll().subscribe((snapshot: any) => {
    //     this.especialidades = [];
    //     snapshot.forEach((item: any) => {
    //       const data = item.payload.doc.data() as Especialidad;
    //       data.id = item.payload.doc.id;
    //       this.especialidades.push(data);
    //     });
    //   })
    // );
  }

  cargarPacientes() {
    this.suscripciones.push(
      this.pacienteService.getAll().subscribe((snapshot) => {
        this.pacientes = [];
        snapshot.forEach((item: any) => {
          {
            const data = item.payload.doc.data() as Paciente;
            data.id = item.payload.doc.id;
            this.pacientes.push(data);
          }
        });
        console.log(this.pacientes);
      })
    );
  }

  cargarHorariosEspecialidad() {
    this.especialidadSeleccionado.descripcion;
    console.log(this.especialistaSeleccionado.horarios);
  }

  asignarEspecialista(item: any) {
    console.log('Especialista seleccionada ->', item);

    //SETEO CAMPOS
    this.setearFechaYHora();
    this.especialidadSeleccionado = null;

    //ASIGNO
    this.especialistaSeleccionado = item;
    // SETEO ESPECIALIDADES
    this.cargarEspecialidades();
  }

  asignarEspecialidad(item: any) {
    console.log('Especialidad seleccionada ->', item);

    //SETEO CAMPOS
    this.setearFechaYHora();

    //ASIGNO
    this.especialidadSeleccionado = item;
    this.cargarHorariosEspecialidad();
  }

  asignarPaciente(item: any) {
    this.pacienteSeleccionado = item;
    console.log(this.pacienteSeleccionado);
  }

  // Fechas turnos
  mostrarHorarios(fecha: any) {
    //this.cargarTurnos();
    this.horaElegida = '';
    this.fechaElegida = fecha;
    console.log('fechaElegida: ', this.fechaElegida);
    console.log('dia elegido: ', this.fechaElegida.fmt_date.weekDay);

    // this.fechaElegida.row_date.hours = [];
    this.fechaElegida.row_date.hours = this.getHorasByDia(
      this.fechaElegida.fmt_date.weekDay
    );

    // let fechaElegidaStr =
    //   this.fechaElegida.row_date.day +
    //   '/' +
    //   this.fechaElegida.row_date.month +
    //   '/' +
    //   this.fechaElegida.row_date.year;

    let fechaElegidaStr =
      this.fechaElegida.row_date.year +
      '-' +
      this.fechaElegida.row_date.month +
      '-' +
      this.fechaElegida.row_date.day;

    this.filtrarHorariosTurnos(fechaElegidaStr);
  }

  filtrarHorariosTurnos(fecha: string) {
    // if (this.turnosOcupados.length == 0) {
    //   this.turnosDisponibles = [];
    // }
    var fechaDis = fecha;
    this.turnosOcupados.forEach((turno: any) => {
      console.log(turno.especialista);
      if (
        turno.especialista.id == this.especialistaSeleccionado.id &&
        turno.estado != ENUM_ESTADO_TURNO.RECHAZADO &&
        turno.estado != ENUM_ESTADO_TURNO.CANCELADO
      ) {
        for (let index = 0; index < this.fechas.length; index++) {
          const element = this.fechas[index];
          // fechaDis =
          //   element.row_date.day +
          //   '/' +
          //   element.row_date.month +
          //   '/' +
          //   element.row_date.year;
          fechaDis =
            element.row_date.year +
            '-' +
            element.row_date.month +
            '-' +
            element.row_date.day;

          if (turno.fecha == fechaDis) {
            //alert(turno.fecha);
            for (
              let index = 0;
              index < element.row_date.hours.length;
              index++
            ) {
              const item = element.row_date.hours[index];
              if (item == turno.hora) {
                element.row_date.hours[index] = null;
              }
            }
          }
          this.turnosDisponibles.push(element);
        }
      }
    });
  }

  fechaTurnoElegido(hora: any) {
    this.horaElegida = hora;
    console.log('horaElegida: ', this.horaElegida);
  }

  cargarTurnos() {
    console.log('cargar Turnos');
    this.getDates();
    this.turnoSvc.getTurnos().subscribe((turnos) => {
      this.turnosOcupados = turnos;
      this.cargarTurnosDisponibles();
    });
  }

  getDates() {
    var current_date = new Date();
    current_date.setDate(current_date.getDate() + 1);
    var dias = 15;
    var end_date = new Date();
    end_date.setDate(current_date.getDate() + dias);
    // console.log('fecha hoy + 15 dias ->', end_date);
    var getTimeDiff = Math.abs(current_date.getTime() - end_date.getTime());
    // console.log('getTimeDiff ->', getTimeDiff);
    var date_range = Math.ceil(getTimeDiff / (1000 * 3600 * 24)) + 1;
    // console.log('date_range ->', date_range);

    var weekday = ['Sun', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    var months = [
      'JAN',
      'FEB',
      'MAR',
      'APR',
      'MAY',
      'JUN',
      'JUL',
      'AUG',
      'SEP',
      'OCT',
      'NOV',
      'DEC',
    ];

    var hoursWeek = [
      '8:00',
      '8:30',
      '9:00',
      '9:30',
      '10:00',
      '10:30',
      '11:00',
      '11:30',
      '12:00',
      '12:30',
      '13:00',
      '13:30',
      '14:00',
      '14:30',
      '15:00',
      '15:30',
      '16:00',
      '16:30',
      '17:00',
      '17:30',
      '18:00',
      '18:30',
    ];
    var hoursSat = [
      '8:00',
      '8:30',
      '9:00',
      '9:30',
      '10:00',
      '10:30',
      '11:00',
      '11:30',
      '12:00',
      '12:30',
      '13:00',
      '13:30',
    ];
    var dates = new Array();

    // for (var i = 0; i <= date_range; i++) {
    for (var i = 0; i <= date_range; i++) {
      var getDate,
        getMonth = '';

      if (current_date.getDate() < 10) {
        getDate = '0' + current_date.getDate();
      } else {
        getDate = current_date.getDate();
      }

      if (current_date.getMonth() < 9) {
        getMonth = '0' + (current_date.getMonth() + 1);
      } else {
        getMonth = current_date.getMonth().toString();
      }

      var row_date;
      var hours;
      if (current_date.getDay() == 6) {
        //console.log(current_date.getDay());

        hours = hoursSat;
        row_date = {
          day: getDate,
          month: getMonth,
          year: current_date.getFullYear(),
          hours,
        };
        //console.log(row_date);
      } else {
        hours = hoursWeek;
        row_date = {
          day: getDate,
          month: getMonth,
          year: current_date.getFullYear(),
          hours,
        };
        //console.log(row_date);
      }

      var fmt_date = {
        weekDay: weekday[current_date.getDay()],
        date: getDate,
        month: months[current_date.getMonth()],
      };
      var is_weekend = false;
      if (current_date.getDay() == 0 || current_date.getDay() == 6) {
        is_weekend = true;
      }

      if (current_date.getDay() != 0) {
        dates.push({
          row_date: row_date,
          fmt_date: fmt_date,
          is_weekend: is_weekend,
        });
      }
      current_date.setDate(current_date.getDate() + 1);
      //console.log(row_date.hours);
    }
    //console.log(dates);

    this.fechas = dates;

    console.log(this.fechas);
  }

  getHorasByDia(dia: string): string[] {
    let retorno = [];
    switch (dia) {
      case 'MON':
        retorno = this.getArrayHoras(
          false,
          this.especialistaSeleccionado.horarios.horarioLunes[0].desde,
          this.especialistaSeleccionado.horarios.horarioLunes[0].hasta
        );
        break;
      case 'TUE':
        retorno = this.getArrayHoras(
          false,
          this.especialistaSeleccionado.horarios.horarioMartes[0].desde,
          this.especialistaSeleccionado.horarios.horarioMartes[0].hasta
        );
        break;
      case 'WED':
        retorno = this.getArrayHoras(
          false,
          this.especialistaSeleccionado.horarios.horarioMiercoles[0].desde,
          this.especialistaSeleccionado.horarios.horarioMiercoles[0].hasta
        );
        break;
      case 'THU':
        retorno = this.getArrayHoras(
          false,
          this.especialistaSeleccionado.horarios.horarioJueves[0].desde,
          this.especialistaSeleccionado.horarios.horarioJueves[0].hasta
        );
        break;
      case 'FRI':
        retorno = this.getArrayHoras(
          false,
          this.especialistaSeleccionado.horarios.horarioViernes[0].desde,
          this.especialistaSeleccionado.horarios.horarioViernes[0].hasta
        );
        break;
      case 'SAT':
        retorno = this.getArrayHoras(
          true,
          this.especialistaSeleccionado.horarios.horarioSabado[0].desde,
          this.especialistaSeleccionado.horarios.horarioSabado[0].hasta
        );
        break;
      default:
        alert('Los Domingo no se trabaja!');
    }
    return retorno;
  }

  getArrayHoras(
    esSabado: boolean,
    horaDesde: string,
    horaHasta: string
  ): any[] {
    console.log('esSabado: ', esSabado);
    console.log('horaDesde: ', horaDesde);
    console.log('horaHasta: ', horaHasta);
    var hoursWeek = [
      '08:00',
      '08:30',
      '09:00',
      '09:30',
      '10:00',
      '10:30',
      '11:00',
      '11:30',
      '12:00',
      '12:30',
      '13:00',
      '13:30',
      '14:00',
      '14:30',
      '15:00',
      '15:30',
      '16:00',
      '16:30',
      '17:00',
      '17:30',
      '18:00',
      '18:30',
    ];
    var hoursSat = [
      '08:00',
      '08:30',
      '09:00',
      '09:30',
      '10:00',
      '10:30',
      '11:00',
      '11:30',
      '12:00',
      '12:30',
      '13:00',
      '13:30',
    ];
    let hoursWeekOK = new Array();
    let hoursSatOK = new Array();
    if (!esSabado) {
      hoursWeek.forEach((hora) => {
        if (hora >= horaDesde && hora < horaHasta) {
          hoursWeekOK.push(hora);
        }
      });
      console.log('hoursWeekOK ->', hoursWeekOK);
      return hoursWeekOK;
    }

    hoursSat.forEach((hora) => {
      if (hora >= horaDesde && hora < horaHasta) {
        hoursSatOK.push(hora);
      }
    });
    console.log('hoursSatOK ->', hoursSatOK);
    return hoursSatOK;
  }

  cargarTurnosDisponibles() {
    this.turnosDisponibles = [];
    var fechaDis;
    this.turnosOcupados.forEach((turno: any) => {
      if (
        turno.estado != ENUM_ESTADO_TURNO.RECHAZADO &&
        turno.estado != ENUM_ESTADO_TURNO.CANCELADO
      ) {
        for (let index = 0; index < this.fechas.length; index++) {
          const element = this.fechas[index];
          // fechaDis =
          //   element.row_date.day +
          //   '/' +
          //   element.row_date.month +
          //   '/' +
          //   element.row_date.year;

          //2021-09-09
          fechaDis =
            element.row_date.year +
            '-' +
            element.row_date.month +
            '-' +
            element.row_date.day;

          if (turno.fecha == fechaDis) {
            // console.log("fechaDis " + fechaDis);
            // console.log("fecha turno ocupado " + turno.fecha);
            // console.log(element);

            for (
              let index = 0;
              index < element.row_date.hours.length;
              index++
            ) {
              const item = element.row_date.hours[index];
              if (item == turno.hora) {
                // console.log("element: " + item + "hora ocupada:  " + turno.hora + " en fecha   " + fechaDis);
                //fecha.row_date.hours.splice(fecha.row_date.hours[index], 1);
                element.row_date.hours[index] = null;
                //fecha.row_date.hours[index] = fecha.row_date.hours[index].replace(element, "")
                // console.log("horario eliminado   " + item);
              }
            }
          }
          this.turnosDisponibles.push(element);
        }
      }
    });
    console.log(this.turnosDisponibles);
    this.turnosDisponibles = this.turnosDisponibles.filter(
      (item: any, index: any) => {
        return this.turnosDisponibles.indexOf(item) === index;
      }
    );
    console.log(this.turnosDisponibles);

    if (this.turnosDisponibles.length == 0) {
      console.log('no hay turnos disponibles');
      this.turnosDisponibles = this.fechas;
      console.log(this.turnosDisponibles);
    }
  }

  // ------------------------------------------------------- registra turno
  registrarTurno() {
    console.log(this.especialistaSeleccionado);
    console.log(this.horaElegida);
    this.spinnerShow();
    if (
      this.authSvc.usuarioLogeado &&
      this.especialistaSeleccionado &&
      this.horaElegida
    ) {
      this.turno = new Turno();

      this.turno.id = '';
      this.turno.estado = ENUM_ESTADO_TURNO.PENDIENTE;
      this.turno.especialista = this.especialistaSeleccionado;
      this.turno.especialidad = this.especialidadSeleccionado;
      if (this.authSvc.ITEM_ACCESOS.isAdmin) {
        this.paciente = this.pacienteSeleccionado;
        this.turno.paciente = this.pacienteSeleccionado;
      } else if (this.authSvc.ITEM_ACCESOS.isPaciente) {
        this.paciente = this.authSvc.usuarioLogeado;
        this.turno.paciente = this.paciente;
      }
      // this.turno.fecha =
      //   this.fechaElegida.row_date.day +
      //   '/' +
      //   this.fechaElegida.row_date.month +
      //   '/' +
      //   this.fechaElegida.row_date.year;

      //2021-09-09
      this.turno.fecha =
        this.fechaElegida.row_date.year +
        '-' +
        this.fechaElegida.row_date.month +
        '-' +
        this.fechaElegida.row_date.day;

      this.turno.hora = this.horaElegida;

      this.turno.comentariosPaciente = '';
      this.turno.comentariosEspecialista = '';
      this.turno.comentariosAdmin = '';
      this.turno.historiaClinica = new HistoriaClinica();
      this.turno.encuesta = '';
      this.turno.calificacionAtencion = '';

      this.turnoSvc
        .addTurno(this.turno)
        .then((res: any) => {
          this.successOperation = true;

          this.setearTurno();

          setTimeout(() => {
            if (this.authSvc.ITEM_ACCESOS.isPaciente) {
              this.router.navigate(['/intranet/mis-turnos-paciente']);
            } else if (this.authSvc.ITEM_ACCESOS.isAdmin) {
              this.router.navigate(['/administracion/turnos']);
            }
          }, 2000);
          // this.router.navigate(['/intranet/solicitar-turno']);
        })
        .catch((error: any) => {
          this.spinnerHide();
          console.error(error);
        });
    }
  }

  setearFechaYHora() {
    this.fechaElegida = null;
    this.horaElegida = '';
  }

  setearTurno() {
    this.spinnerHide();
    this.pacienteSeleccionado = null;
    this.especialistaSeleccionado = null;
    this.especialidadSeleccionado = null;
    this.setearFechaYHora();
  }
}
