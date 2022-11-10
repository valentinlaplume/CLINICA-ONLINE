import { Especialista } from 'src/app/models/especialista';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-especialista-lista',
  templateUrl: './especialista-lista.component.html',
  styleUrls: ['./especialista-lista.component.css'],
})
export class EspecialistaListaComponent implements OnInit {
  @Output() especialistaSeleccionado: EventEmitter<any> =
    new EventEmitter<any>();
  @Input() lista: Especialista[] = [];
  // usuario!: Especialista;

  constructor() {}

  ngOnInit(): void {
    //this.cargarUsuarios()
  }

  enviarEspecialista(item: any) {
    this.especialistaSeleccionado.emit(item);
  }
}
