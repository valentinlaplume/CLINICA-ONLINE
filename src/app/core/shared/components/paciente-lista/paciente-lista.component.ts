import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Paciente } from 'src/app/models/paciente';

@Component({
  selector: 'app-paciente-lista',
  templateUrl: './paciente-lista.component.html',
  styleUrls: ['./paciente-lista.component.css'],
})
export class PacienteListaComponent implements OnInit {
  @Output() pacienteSeleccionado: EventEmitter<any> = new EventEmitter<any>();
  @Input() lista: Paciente[] = [];
  // usuario!: Especialista;

  constructor() {}

  ngOnInit(): void {
    //this.cargarUsuarios()
  }

  enviarPaciente(item: any) {
    this.pacienteSeleccionado.emit(item);
  }
}
