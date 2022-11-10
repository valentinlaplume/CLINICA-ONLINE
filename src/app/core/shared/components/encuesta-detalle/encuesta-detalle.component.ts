import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-encuesta-detalle',
  templateUrl: './encuesta-detalle.component.html',
  styleUrls: ['./encuesta-detalle.component.css'],
})
export class EncuestaDetalleComponent implements OnInit {
  @Input() turnoDetalle!: any;

  constructor() {}

  ngOnInit(): void {}
}
