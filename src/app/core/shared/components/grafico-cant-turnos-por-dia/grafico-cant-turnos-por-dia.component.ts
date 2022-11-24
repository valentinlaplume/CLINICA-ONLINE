import { Component, OnInit } from '@angular/core';
let jsPDF = require('../../../../../../node_modules/jspdf/dist/jspdf.min.js');
import html2canvas from 'html2canvas';
import { Configuration } from 'ng-chartist';

import { ChartEvent } from 'ng-chartist';
import Highcharts from 'highcharts';
import { TurnoService } from 'src/app/services/turno.service';

@Component({
  selector: 'app-grafico-cant-turnos-por-dia',
  templateUrl: './grafico-cant-turnos-por-dia.component.html',
  styleUrls: ['./grafico-cant-turnos-por-dia.component.css'],
})
export class GraficoCantTurnosPorDiaComponent implements OnInit {
  listaTurnos: any = [];
  turnosPorDia: number = 0;
  dataTurnosXDia: any = [];
  fechas: any = [];
  cantidades: any = [];
  dias!: string;

  title = 'myHighchart';

  data: any = [
    {
      name: 'Días'.toUpperCase(),
      data: this.cantidades,
    },
  ];

  highcharts = Highcharts;
  chartOptions: any = {
    chart: {
      type: 'line',
    },
    title: {
      text: 'Cantidad de turnos por día'.toUpperCase(),
    },
    xAxis: {
      categories: this.fechas,
    },
    yAxis: {
      title: {
        text: 'Cantidad de Turnos'.toUpperCase(),
      },
      allowDecimals: false,
    },
    series: this.data,
  };

  // barChart: any = {
  //   type: 'Bar',
  //   data: this.cantidades,
  //   options: {
  //     fullwidth: true,
  //     height: '350px',
  //     seriesBarDistance: 21,
  //     axisX: {
  //       showGrid: false,
  //       offset: 100,
  //     },

  //     axisY: {
  //       scaleMinSpace: 30,
  //     },
  //   },
  // };

  constructor(private turnoSvc: TurnoService) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.turnoSvc.getTurnos().subscribe((turnos) => {
        this.listaTurnos = turnos;
        this.contarTurnosPorDia();
      });
    }, 1000);
  }

  contarTurnosPorDia() {
    for (let i = 0; i < this.listaTurnos.length; i++) {
      var turnosPorDia = this.listaTurnos.filter(
        (element: any, index: any, array: any) => {
          return element.fecha == this.listaTurnos[i].fecha;
        }
      );
      this.dataTurnosXDia.push({
        dia: this.listaTurnos[i].fecha,
        cantidad: turnosPorDia.length,
      });
      this.fechas.push(this.listaTurnos[i].fecha);
    }

    this.dataTurnosXDia.forEach((element: any) => {
      // this.fechas.push(element.fecha);+
      this.cantidades.push(element.cantidad);
    });

    Highcharts.chart('chart-line', this.chartOptions);
  }

  crearPdf() {
    let DATA = <HTMLElement>document.getElementById('pdfTable');

    html2canvas(DATA).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;

      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      var nombreArchivo = 'turnosXDia.pdf';
      PDF.save(nombreArchivo);
    });
  }
}
