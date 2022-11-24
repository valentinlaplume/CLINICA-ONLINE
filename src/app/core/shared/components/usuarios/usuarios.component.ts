import { Component, OnInit } from '@angular/core';
import { ExcelExportService } from 'src/app/services/excel-export.service';
import { AuthService } from 'src/app/services/auth.service';
import { TurnoService } from 'src/app/services/turno.service';
@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
})
export class UsuariosComponent implements OnInit {
  turnos!: any;
  // turnos: any[] = [];
  pacientes: any[] = [];
  turnosPacienteSeleccionado: any[] = [];

  pacienteSeleccionado!: any;
  //especialista: any;
  turnosPacientesAtendidos: any[] = [];

  constructor(
    public excelExport: ExcelExportService,
    public turnoSvc: TurnoService,
    private authSvc: AuthService
  ) {
    // this.especialista = this.authSvc.usuarioLogeado;
  }

  ngOnInit(): void {
    this.turnoSvc.getTurnos().subscribe((element: any) => {
      // OBTENGO TODOS LOS TURNOS
      this.turnos = element;

      // FILTRO TODOS LOS TURNOS DEL ESPECIALISTA
      if (this.turnos != null && this.authSvc.usuarioLogeado) {
        this.turnos = this.turnos.filter(
          (item: any) =>
            item.estado != 'RECHAZADO' &&
            item.estado != 'CANCELADO' &&
            item.estado != 'PENDIENTE'
        );
      }

      if (this.turnos != null) {
        // OBTENGO TODOS LOS PACIENTES  DEL ESPECIALISTA SIN REPETIR
        const emailUnicos = [''];
        for (var i = 0; i < this.turnos.length; i++) {
          const email = this.turnos[i].paciente.email;

          if (!emailUnicos.includes(email)) {
            emailUnicos.push(email);
            const pacienteFormateado = {
              email: this.turnos[i].paciente.email,
              nombre: this.turnos[i].paciente.nombre,
              apellido: this.turnos[i].paciente.apellido,
              dni: this.turnos[i].paciente.dni,
              edad: this.turnos[i].paciente.edad,
              obraSocial: this.turnos[i].paciente.obraSocial,
              urlFotos: this.turnos[i].paciente.urlFotos,
              turnos: [''],
            };

            this.pacientes.push(pacienteFormateado);
          }
        }

        console.log('this.turnos -> ', this.turnos);
        console.log('emailUnicos -> ', emailUnicos);
        console.log('this.pacientes -> ', this.pacientes);

        // OBTENGO LOS TURNOS DEL PACIENTE
        this.pacientes.forEach((paciente) => {
          for (var i = 0; i < this.turnos.length; i++) {
            if (this.turnos[i].paciente.email == paciente.email) {
              let turno = {
                fecha: this.turnos[i].fecha,
                hora: this.turnos[i].hora,
                estado: this.turnos[i].estado,
                especialista:
                  this.turnos[i].especialista.apellido +
                  ', ' +
                  this.turnos[i].especialista.nombre,
                especialidad: this.turnos[i].especialidad.descripcion,
              };

              paciente.turnos.push(turno);
            }
          }
        });
      }

      console.log(this.turnosPacientesAtendidos);
    });
  }

  exportExcel(paciente: any) {
    this.pacienteSeleccionado = paciente;

    let arrFormateado: {
      fecha: any;
      hora: any;
      estado: any;
      especialista: any;
      especialidad: any;
    }[] = [];

    this.pacienteSeleccionado.turnos.forEach((item: any) => {
      let turno = {
        fecha: item.fecha,
        hora: item.hora,
        estado: item.estado,
        especialista: item.especialista,
        especialidad: item.especialidad,
      };
      arrFormateado.push(turno);
    });

    console.log('ARR POR EXPORTAR EXCEL -> ', arrFormateado);
    this.excelExport.exportar_ArrayObjetos_toExcel(
      arrFormateado,
      this.pacienteSeleccionado.apellido +
        '-' +
        this.pacienteSeleccionado.nombre +
        '-turnos',
      'turnos detalle'
    );
  }

  exportExcelAll() {
    this.excelExport.exportar_ArrayObjetos_toExcel(
      this.pacientes,
      'turnos',
      'hoja 1'
    );
  }
}
