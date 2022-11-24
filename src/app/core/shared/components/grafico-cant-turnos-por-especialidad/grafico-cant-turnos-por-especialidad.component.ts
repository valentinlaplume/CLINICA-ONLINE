import { Component, OnInit } from '@angular/core';
import { elementAt, lastValueFrom, first } from 'rxjs';
import { TurnoService } from 'src/app/services/turno.service';
import { PacienteService } from 'src/app/services/paciente.service';
import { EspecialidadService } from 'src/app/services/especialidad.service';
import { Especialidad } from 'src/app/models/especialidad';

import * as Highcharts from 'highcharts';
import html2canvas from 'html2canvas';
let jsPDF = require('../../../../../../node_modules/jspdf/dist/jspdf.min.js');

import { BarChart, BarChartOptions } from 'chartist';
import lineBar from 'chartist';

import { PieChart, PieChartOptions, ResponsiveOptions } from 'chartist';
import { Turno } from 'src/app/models/turno';

@Component({
  selector: 'app-grafico-cant-turnos-por-especialidad',
  templateUrl: './grafico-cant-turnos-por-especialidad.component.html',
  styleUrls: ['./grafico-cant-turnos-por-especialidad.component.css'],
})
export class GraficoCantTurnosPorEspecialidadComponent implements OnInit {
  listaEspecialidades: any = [];
  listaTurnos: any = [];
  turnosPorEspecialidad: number = 0;
  dataTurnosXDia: any = [];
  cantidades: any = [];
  especialidades: any = [];

  datosProyectados: any = [];

  // title = 'myHighchart';

  // data: any = [
  //   {
  //     name: 'ESPECIALIDADES',
  //     data: this.cantidades,
  //   },
  // ];

  // highcharts = Highcharts;
  // chartOptions: any = {
  //   chart: {
  //     type: 'column',
  //   },
  //   title: {
  //     text: 'CANTIDAD DE TURNOS POR ESPECIALIDAD',
  //   },
  //   xAxis: {
  //     categories: this.especialidades,
  //   },
  //   yAxis: {
  //     title: {
  //       text: 'TURNOS',
  //     },
  //     allowDecimals: false,
  //   },
  //   series: this.data,
  // };
  turnRes: any;
  turnAll: Turno[] = [];
  dates: any = [];
  data = {
    labels: [''],
    series: [],
  };

  options: PieChartOptions = {
    labelInterpolationFnc: (value) => String(value)[0],
  };

  responsiveOptions: ResponsiveOptions<PieChartOptions> = [
    [
      'screen and (min-width: 640px)',
      {
        chartPadding: 30,
        labelOffset: 100,
        labelDirection: 'explode',
        labelInterpolationFnc: (value) => value,
      },
    ],
    [
      'screen and (min-width: 1024px)',
      {
        labelOffset: 80,
        chartPadding: 20,
      },
    ],
  ];

  ngOnInit(): void {
    setTimeout(() => {
      this.turnoSvc.getTurnos().subscribe((res) => {
        this.turnRes = res;
        this.turnAll = [...this.turnRes];
        this.turnAll.forEach((turn) =>
          this.dates.push(turn.especialidad.descripcion)
        );
        const result = this.dates.reduce(
          (json: any, val: any) => ({ ...json, [val]: (json[val] | 0) + 1 }),
          {}
        );
        let daysWeek = Object.keys(result);
        this.data.labels = [];
        daysWeek.forEach((res) => {
          this.data.labels.push(res.toUpperCase());
        });
        console.log(this.data.labels);
        this.data.series = Object.values(result);
        console.log(this.data.series);

        for (let index = 0; index < this.data.labels.length; index++) {
          const label = this.data.labels[index];
          const data = this.data.series[index];
          const item = {
            label: label,
            data: data,
          };
          this.datosProyectados.push(item);
        }
        new PieChart(
          '#chart4',
          this.data,
          this.options,
          this.responsiveOptions
        );
      });
    }, 1000);
  }

  constructor(
    private turnoSvc: TurnoService,
    private especialidadService: EspecialidadService
  ) {
    // this.turnoSvc.getTurnos().subscribe((turnos) => {
    //   this.listaTurnos = turnos;
    //   console.log(this.listaTurnos);
    // });
    // this.cargarEspecialidades();
  }

  // ngOnInit(): void {}

  async cargarEspecialidades() {
    this.especialidadService.getAll().subscribe((snapshot: any) => {
      this.especialidades = [];
      snapshot.forEach((item: any) => {
        const data = item.payload.doc.data() as Especialidad;
        data.id = item.payload.doc.id;
        this.especialidades.push(data.descripcion);
      });
      this.turnoSvc.getTurnos().subscribe((turnos) => {
        this.listaTurnos = turnos;
        console.log(this.listaTurnos);
        this.contarTurnosPorEspecialidad();
      });
      // this.contarTurnosPorEspecialidad();
    });
  }

  contarTurnosPorEspecialidad() {
    for (let i = 0; i < this.especialidades.length; i++) {
      var item = this.especialidades[i];
      var turnosPorEspecialidad = this.listaTurnos.filter(
        (element: any, index: any, array: any) => {
          return item == element.especialidad.descripcion;
        }
      );
      this.cantidades.push(turnosPorEspecialidad.length);
    }
    console.log('especialidades.length ->', this.especialidades.length);
    console.log('especialidades->', this.especialidades);

    console.log(this.cantidades);

    // this.chartOptions.xAxis.categories = this.especialidades;
    // console.log(this.chartOptions.xAxis.categories);
    // console.log(this.chartOptions.series);
    // Highcharts.chart('chart-line', this.chartOptions);
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
      var nombreArchivo = 'turnosxEspecialidad.pdf';
      PDF.save(nombreArchivo);
    });
  }
}
