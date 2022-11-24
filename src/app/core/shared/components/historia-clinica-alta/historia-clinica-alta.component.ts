import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HistoriaClinica } from 'src/app/models/historia-clinica';
import { HistoriaClinicaService } from 'src/app/services/historia-clinica.service';
import { TurnoService } from 'src/app/services/turno.service';

@Component({
  selector: 'app-historia-clinica-alta',
  templateUrl: './historia-clinica-alta.component.html',
  styleUrls: ['./historia-clinica-alta.component.css'],
})
export class HistoriaClinicaAltaComponent implements OnInit {
  @Input() turno: any;
  formulario: FormGroup;
  //TurnoSeleccionado!: any;
  orderObj!: any;
  //public Turno: any;

  @Input() TurnoAMostrar: any = '';

  constructor(
    public fb: FormBuilder,
    public routeActivate: ActivatedRoute,
    public historiaClinicaService: HistoriaClinicaService,
    public route: Router,
    private turnoSvc: TurnoService
  ) {
    this.formulario = fb.group({
      Altura: ['', Validators.required],
      Peso: ['', Validators.required],
      Temperatura: [
        '',
        [Validators.required, Validators.min(34), Validators.max(45)],
      ],
      Presion: ['', [Validators.required]],
      Clave1: ['', Validators.required],
      Valor1: ['', Validators.required],
      Clave2: ['', Validators.required],
      Valor2: ['', Validators.required],
      Clave3: [''],
      Valor3: [''],
      Clave4: [''],
      Valor4: [''],
      Clave5: [''],
      Valor5: [''],
      Clave6: [''],
      Valor6: [''],
    });
  }

  ngOnInit(): void {}

  aceptar() {
    const historia = new HistoriaClinica();
    historia.altura = this.formulario.controls['Altura'].value;
    historia.peso = this.formulario.controls['Peso'].value;
    historia.temperatura = this.formulario.controls['Temperatura'].value;
    historia.presion = this.formulario.controls['Presion'].value;
    historia.clave1 = this.formulario.controls['Clave1'].value;
    historia.valor1 = this.formulario.controls['Valor1'].value;
    historia.clave2 = this.formulario.controls['Clave2'].value;
    historia.valor2 = this.formulario.controls['Valor2'].value;
    historia.clave3 = this.formulario.controls['Clave3'].value;
    historia.valor3 = this.formulario.controls['Valor3'].value;
    historia.clave4 = this.formulario.controls['Clave4'].value;
    historia.valor4 = this.formulario.controls['Valor4'].value;
    historia.clave5 = this.formulario.controls['Clave5'].value;
    historia.valor5 = this.formulario.controls['Valor5'].value;
    historia.clave6 = this.formulario.controls['Clave6'].value;
    historia.valor6 = this.formulario.controls['Valor6'].value;
    //historia.turnoId = this.turno.id;
    console.log(this.formulario.value);

    this.turnoSvc
      .updateTurnoHistoriaClinica(historia, this.turno.id)
      .then((res) => {
        this.formulario.reset();
        this.route.navigate(['/intranet/mis-pacientes']);
      });
  }
}
