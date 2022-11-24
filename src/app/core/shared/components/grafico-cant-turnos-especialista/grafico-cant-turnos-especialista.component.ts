import { Component, OnInit } from '@angular/core';
import { TurnoService } from 'src/app/services/turno.service';
import * as Highcharts from 'highcharts';
import { concatMapTo, finalize, first, lastValueFrom } from 'rxjs';
import html2canvas from 'html2canvas';
import { Especialista } from 'src/app/models/especialista';
import { EspecialistaService } from 'src/app/services/especialista.service';
let jsPDF = require('../../../../../../node_modules/jspdf/dist/jspdf.min.js');

@Component({
  selector: 'app-grafico-cant-turnos-especialista',
  templateUrl: './grafico-cant-turnos-especialista.component.html',
  styleUrls: ['./grafico-cant-turnos-especialista.component.css'],
})
export class GraficoCantTurnosEspecialistaComponent implements OnInit {
  especialistas: any = [];
  listaTurnos: any = [];
  turnosPorMedico: number = 0;
  dataTurnosXDia: any = [];
  medicos: any = [];
  cantidades: any = [];
  dias!: string;

  title = 'myHighchart';

  data: any = [
    {
      name: 'Médicos'.toUpperCase(),
      data: this.cantidades,
    },
  ];

  highcharts = Highcharts;
  chartOptions: any = {
    chart: {
      type: 'bar',
    },
    title: {
      text: 'Cantidad de turnos por Médico'.toUpperCase(),
    },
    xAxis: {
      categories: this.medicos,
    },
    yAxis: {
      title: {
        text: 'Cantidad de Turnos'.toUpperCase(),
      },
      allowDecimals: false,
    },
    series: this.data,
  };
  constructor(
    public turnoSvc: TurnoService,
    public especialistaService: EspecialistaService
  ) {
    this.especialistaService.getAll().subscribe((snapshot) => {
      snapshot.forEach((item: any) => {
        {
          const data = item.payload.doc.data() as Especialista;
          data.id = item.payload.doc.id;
          if (data.cuentaHabilitada) {
            this.especialistas.push(data);
          }
        }
      });
      this.turnoSvc.getTurnos().subscribe((turnos) => {
        this.listaTurnos = turnos;
        console.log(this.especialistas);
        console.log(this.listaTurnos);
        this.contarTurnosPorMedico();
      });
    });
  }

  contarTurnosPorMedico() {
    for (let i = 0; i < this.especialistas.length; i++) {
      var item = this.especialistas[i];
      var nombreYApellido = item.nombre + ' ' + item.apellido;
      this.medicos.push(nombreYApellido);

      var turnosPorMedico = this.listaTurnos.filter(
        (element: any, index: any, array: any) => {
          return item.email == element.especialista.email;
        }
      );
      this.cantidades.push(turnosPorMedico.length);
    }
    console.log(this.medicos);

    console.log(this.cantidades);
    Highcharts.chart('chart-line', this.chartOptions);
  }
  ngOnInit(): void {}

  crearPdf() {
    let DATA = <HTMLElement>document.getElementById('pdfTable');

    html2canvas(DATA).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;

      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      var nombreArchivo = 'turnosxMedico.pdf';
      PDF.save(nombreArchivo);
    });
  }
}
