import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css'],
})
export class EstadisticasComponent implements OnInit {
  mostrarLogs: boolean = false;
  mostrarTurnosEspecialidad: boolean = false;
  mostrarTurnosXDia: boolean = false;
  mostrarTurnosXEspecialista: boolean = false;
  mostrarTurnosXEspecialistaFinalizados: boolean = false;
  constructor() {}

  ngOnInit(): void {}

  mostrarIngresos() {
    this.mostrarLogs = true;
    this.mostrarTurnosXDia = false;
    this.mostrarTurnosEspecialidad = false;
    this.mostrarTurnosXEspecialista = false;
    this.mostrarTurnosXEspecialistaFinalizados = false;
  }

  mostrarTurnosByEspecialidad() {
    this.mostrarTurnosEspecialidad = true;
    this.mostrarLogs = false;
    this.mostrarTurnosXDia = false;
    this.mostrarTurnosXEspecialista = false;
    this.mostrarTurnosXEspecialistaFinalizados = false;
  }

  mostrarTurnosPorDia() {
    this.mostrarTurnosXDia = true;
    this.mostrarLogs = false;
    this.mostrarTurnosEspecialidad = false;
    this.mostrarTurnosXEspecialista = false;
    this.mostrarTurnosXEspecialistaFinalizados = false;
  }

  mostrarTurnosXMedico() {
    this.mostrarTurnosXDia = false;
    this.mostrarLogs = false;
    this.mostrarTurnosEspecialidad = false;
    this.mostrarTurnosXEspecialista = true;
    this.mostrarTurnosXEspecialistaFinalizados = false;
  }

  mostrarTurnosXMedicoFinalizados() {
    this.mostrarTurnosXDia = false;
    this.mostrarLogs = false;
    this.mostrarTurnosEspecialidad = false;
    this.mostrarTurnosXEspecialista = false;
    this.mostrarTurnosXEspecialistaFinalizados = true;
  }
}
