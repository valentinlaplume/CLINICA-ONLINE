import { Component, Input, OnInit } from '@angular/core';
import {
  trigger,
  transition,
  animate,
  style,
  state,
  group,
} from '@angular/animations';
import { Horarios } from 'src/app/models/horarios';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { map } from 'rxjs';
import { EspecialistaService } from 'src/app/services/especialista.service';
import { AuthService } from 'src/app/services/auth.service';
import { Especialista } from 'src/app/models/especialista';

@Component({
  selector: 'app-mis-horarios',
  templateUrl: './mis-horarios.component.html',
  styleUrls: ['./mis-horarios.component.css'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('1200ms ease-in', style({ transform: 'translateX(0%)' })),
      ]),
      transition(':leave', [
        animate('500ms ease-in', style({ transform: 'translateX(-100%)' })),
      ]),
    ]),
  ],
})
export class MisHorariosComponent implements OnInit {
  formulario!: FormGroup;
  @Input() especialistaHorarios!: Especialista;
  especialidad!: string;
  horario!: Horarios;
  horarioAux!: Horarios;
  dia!: string;
  horarios!: any;
  usuario: any;
  horariosUsuario!: any;
  captchaPropio: boolean = false;
  successOperation: boolean = false;
  spinner: boolean;

  constructor(
    public fv: FormBuilder,
    private especialistaService: EspecialistaService,
    private authSvc: AuthService
  ) {
    this.spinner = false;
    this.successOperation = false;
    this.usuario = this.authSvc.usuarioLogeado;

    this.formulario = fv.group({
      //especialidad: ['', Validators.required],
      lunesHoraDesde: ['', [this.validarMinutos, this.validarHora]],
      lunesHoraHasta: ['', [this.validarMinutos, this.validarHora]],
      martesHoraDesde: ['', [this.validarMinutos, this.validarHora]],
      martesHoraHasta: ['', [this.validarMinutos, this.validarHora]],
      miercolesHoraDesde: ['', [this.validarMinutos, this.validarHora]],
      miercolesHoraHasta: ['', [this.validarMinutos, this.validarHora]],
      juevesHoraDesde: ['', [this.validarMinutos, this.validarHora]],
      juevesHoraHasta: ['', [this.validarMinutos, this.validarHora]],
      viernesHoraDesde: ['', [this.validarMinutos, this.validarHora]],
      viernesHoraHasta: ['', [this.validarMinutos, this.validarHora]],
      sabadoHoraDesde: ['', [this.validarMinutos, this.validarSabadoHora]],
      sabadoHoraHasta: ['', [this.validarMinutos, this.validarSabadoHora]],
    });

    console.log(this.usuario.horarios);
    this.setearHorarios();
  }

  setearHorarios() {
    if (this.usuario.horarios != '') {
      const horarios = this.usuario.horarios;
      this.formulario.controls['lunesHoraDesde'].setValue(
        horarios.horarioLunes[0].desde
      );
      this.formulario.controls['lunesHoraHasta'].setValue(
        horarios.horarioLunes[0].hasta
      );
      this.formulario.controls['martesHoraDesde'].setValue(
        horarios.horarioMartes[0].desde
      );
      this.formulario.controls['martesHoraHasta'].setValue(
        horarios.horarioMartes[0].hasta
      );
      this.formulario.controls['miercolesHoraDesde'].setValue(
        horarios.horarioMiercoles[0].desde
      );
      this.formulario.controls['miercolesHoraHasta'].setValue(
        horarios.horarioMiercoles[0].hasta
      );
      this.formulario.controls['juevesHoraDesde'].setValue(
        horarios.horarioJueves[0].desde
      );
      this.formulario.controls['juevesHoraHasta'].setValue(
        horarios.horarioJueves[0].hasta
      );
      this.formulario.controls['viernesHoraDesde'].setValue(
        horarios.horarioViernes[0].desde
      );
      this.formulario.controls['viernesHoraHasta'].setValue(
        horarios.horarioViernes[0].hasta
      );
      this.formulario.controls['sabadoHoraDesde'].setValue(
        horarios.horarioSabado[0].desde
      );
      this.formulario.controls['sabadoHoraHasta'].setValue(
        horarios.horarioSabado[0].hasta
      );
    } else {
      this.formulario.reset();
    }
  }

  ngOnInit(): void {
    //console.log(this.especialistaHorarios.especialidades);
  }

  private spinnerShow() {
    this.spinner = true;
  }

  private spinnerHide() {
    this.spinner = false;
  }

  cargarTurnos() {
    // this.turnoSvc.getTurnos().subscribe(turnos => {
    //   this.turnosOcupados = turnos;
    // });

    this.horarios
      .snapshotChanges()
      .pipe(
        map((data: any) => {
          this.horariosUsuario = new Array<Horarios>();
          data.map((item: any) => {
            if (item.payload.doc.data().idEspecialista == this.usuario.id) {
              //var turno = item;
              var horario = new Horarios();
              //horario.id = item.payload.doc.id;
              horario.idEspecialista = item.payload.doc.data().idEspecialista;
              horario.emailEspecialista =
                item.payload.doc.data().emailEspecialista;
              horario.horarioLunes = item.payload.doc.data().horarioLunes;
              horario.horarioMartes = item.payload.doc.data().horarioMartes;
              horario.horarioMiercoles =
                item.payload.doc.data().horarioMiercoles;
              horario.horarioJueves = item.payload.doc.data().horarioJueves;
              horario.horarioViernes = item.payload.doc.data().horarioViernes;
              horario.horarioSabado = item.payload.doc.data().horarioSabado;

              console.log(this.horariosUsuario);
            }
          });
        })
      )
      .subscribe();
    console.log(this.horariosUsuario);
  }

  validarMinutos(control: AbstractControl) {
    const nombre = control.value;
    if (nombre != '' && nombre != null) {
      var minutos = nombre.split(':')[1];
      var minCero = minutos.includes('00');
      var minTreinta = minutos.includes('30');
      //console.log(minutos);

      if (minCero) {
        return null;
      }

      if (minTreinta) {
        return null;
      }

      if (!minCero && !minTreinta) return { minValido: true };
    }
    return null;
  }

  validarHora(control: AbstractControl) {
    const nombre = control.value;
    if (nombre != '' && nombre != null) {
      var hora = nombre.split(':')[0];
      //console.log(hora);

      if (hora < 8 || hora > 19) {
        return { horaValido: true };
      }
    }
    return null;
  }

  validarSabadoHora(control: AbstractControl) {
    const nombre = control.value;
    if (nombre != '' && nombre != null) {
      var hora = nombre.split(':')[0];
      //console.log(hora);

      if (hora < 8 || hora > 14) {
        return { horaValido: true };
      }
    }
    return null;
  }

  registrar() {
    this.spinnerShow();
    console.log(this.formulario);
    this.horario = new Horarios();
    this.horario.horarioLunes = [
      {
        desde: this.formulario.controls['lunesHoraDesde'].value,
        hasta: this.formulario.controls['lunesHoraHasta'].value,
      },
    ];
    this.horario.horarioMartes = [
      {
        desde: this.formulario.controls['martesHoraDesde'].value,
        hasta: this.formulario.controls['martesHoraHasta'].value,
      },
    ];
    this.horario.horarioMiercoles = [
      {
        desde: this.formulario.controls['miercolesHoraDesde'].value,
        hasta: this.formulario.controls['miercolesHoraHasta'].value,
      },
    ];
    this.horario.horarioJueves = [
      {
        desde: this.formulario.controls['juevesHoraDesde'].value,
        hasta: this.formulario.controls['juevesHoraHasta'].value,
      },
    ];
    this.horario.horarioViernes = [
      {
        desde: this.formulario.controls['viernesHoraDesde'].value,
        hasta: this.formulario.controls['viernesHoraHasta'].value,
      },
    ];
    this.horario.horarioSabado = [
      {
        desde: this.formulario.controls['sabadoHoraDesde'].value,
        hasta: this.formulario.controls['sabadoHoraHasta'].value,
      },
    ];
    this.horariosUsuario = this.horario;
    this.usuario.horarios = this.horariosUsuario;
    this.especialistaService.updateHorarios(this.usuario).then((res: any) => {
      console.log(res);
      setTimeout(() => {
        this.spinnerHide();
        this.successOperation = true;
        setTimeout(() => {
          location.reload();
        }, 1000);
      }, 2000);
      // this.setearHorarios();
      // this.formulario.reset();
    });
  }
}
