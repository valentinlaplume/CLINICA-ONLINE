import { Component, OnInit } from '@angular/core';
import { Especialista } from 'src/app/models/especialista';
import { AuthService } from 'src/app/services/auth.service';
import { TurnoService } from 'src/app/services/turno.service';

@Component({
  selector: 'app-mis-pacientes',
  templateUrl: './mis-pacientes.component.html',
  styleUrls: ['./mis-pacientes.component.css'],
})
export class MisPacientesComponent implements OnInit {
  turnos!: any;
  turnosEspecialista: any[] = [];
  pacientesEspecialista: any[] = [];
  turnosPacienteSeleccionado: any[] = [];

  turnoSeleccionado!: any;
  pacienteSeleccionado!: any;
  //especialista: any;
  turnosPacientesAtendidos: any[] = [];

  constructor(public turnoSvc: TurnoService, private authSvc: AuthService) {
    // this.especialista = this.authSvc.usuarioLogeado;
  }

  ngOnInit(): void {
    this.turnoSvc.getTurnos().subscribe((element: any) => {
      // OBTENGO TODOS LOS TURNOS
      this.turnos = element;

      // FILTRO TODOS LOS TURNOS DEL ESPECIALISTA
      if (this.turnos != null && this.authSvc.usuarioLogeado) {
        this.turnosEspecialista = this.turnos.filter(
          (item: any) =>
            item.especialista.email == this.authSvc.usuarioLogeado.email
        );
      }

      if (this.turnosEspecialista != null) {
        // OBTENGO TODOS LOS PACIENTES  DEL ESPECIALISTA SIN REPETIR
        const emailUnicos = [''];
        for (var i = 0; i < this.turnosEspecialista.length; i++) {
          const email = this.turnosEspecialista[i].paciente.email;

          if (!emailUnicos.includes(email)) {
            emailUnicos.push(email);
            const pacienteFormateado = {
              email: this.turnosEspecialista[i].paciente.email,
              nombre: this.turnosEspecialista[i].paciente.nombre,
              apellido: this.turnosEspecialista[i].paciente.apellido,
              urlFotos: this.turnosEspecialista[i].paciente.urlFotos,
              ultimosTresTurnos: [''],
            };

            this.pacientesEspecialista.push(pacienteFormateado);
          }
        }

        console.log('this.turnosEspecialista -> ', this.turnosEspecialista);
        console.log('emailUnicos -> ', emailUnicos);
        console.log(
          'this.pacientesEspecialista -> ',
          this.pacientesEspecialista
        );

        // OBTENGO LOS TURNOS DEL PACIENTE
        this.pacientesEspecialista.forEach((paciente) => {
          for (var i = 0; i < this.turnosEspecialista.length; i++) {
            if (this.turnosEspecialista[i].paciente.email == paciente.email) {
              // let arrFechaNumber = this.turnosEspecialista[i].fecha.split('-');
              // let fechaNumber =
              // const turnoFormateado = {

              // }

              paciente.ultimosTresTurnos.push(this.turnosEspecialista[i]);
            }
          }
        });

        // OBTENGO LOS ULTIMOS 3 TURNOS DEL PACIENTE
        this.pacientesEspecialista.forEach((paciente) => {
          let arrFecha = paciente.ultimosTresTurnos;
          let len = paciente.ultimosTresTurnos.length;
          if (len > 3) {
            let turno1 = paciente.ultimosTresTurnos[len - 1];
            let turno2 = paciente.ultimosTresTurnos[len - 2];
            let turno3 = paciente.ultimosTresTurnos[len - 3];

            paciente.ultimosTresTurnos = [''];
            paciente.ultimosTresTurnos.push(turno3);
            paciente.ultimosTresTurnos.push(turno2);
            paciente.ultimosTresTurnos.push(turno1);
          }
        });
      }

      // if (this.turnosEspecialista != null) {
      //   for (let i = 0; i < this.turnosEspecialista.length; i++) {
      //     var espe = null;
      //     var aux = null;
      //     if (this.turnosEspecialista[i] != null) {
      //       if (this.turnosEspecialista[i + 1] != undefined) {
      //         espe = this.turnosEspecialista[i + 1].especialista;
      //       } else {
      //         espe = { email: '' };
      //       }
      //       aux = this.turnosEspecialista[i].especialista;
      //       if (espe.email === aux.email) {
      //         this.turnosPacientesAtendidos.push(this.turnosEspecialista[i]);
      //       }
      //     }
      //   }
      // }

      // if (this.turnosEspecialista != null) {
      //   for (let index = 0; index < this.turnosEspecialista.length; index++) {
      //     const paciente = this.turnosEspecialista[index].paciente;
      //     this.turnosPacientesAtendidos.push(paciente);

      // let indexIncluir = -1;
      // for (let j = 0; j < this.turnosPacientesAtendidos.length; j++)
      // {
      //   const pacienteAtendido = this.turnosPacientesAtendidos[j];
      //   if (pacienteAtendido.email == paciente.email) {
      //     estaIncluido = j;
      //     break;
      //   }
      // }

      // if (indexIncluir != -1) {
      //   this.turnosPacientesAtendidos.push(indexIncluir);
      // }
      //   }
      // }

      console.log(this.turnosPacientesAtendidos);
    });
  }

  // abrirMenu() {
  //   var element = <HTMLElement>(<unknown>document.getElementById('menu'));
  //   if (!this.open) {
  //     console.log(this.open + 'en false');
  //     element.classList.remove('d-none');
  //     element.classList.add('d-block');

  //     this.open = true;
  //   } else {
  //     console.log(this.open + 'en true');
  //     element.classList.remove('d-block');
  //     element.classList.add('d-none');

  //     this.open = false;
  //   }
  // }

  enviarTurno(turno: any) {
    this.turnoSeleccionado = turno;
    console.log(turno);
  }
}
