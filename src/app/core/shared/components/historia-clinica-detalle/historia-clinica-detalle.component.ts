import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-historia-clinica-detalle',
  templateUrl: './historia-clinica-detalle.component.html',
  styleUrls: ['./historia-clinica-detalle.component.css'],
})
export class HistoriaClinicaDetalleComponent implements OnInit {
  @Input() turnoDetalle!: any;

  constructor() {}

  ngOnInit(): void {}
}
