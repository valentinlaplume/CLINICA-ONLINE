import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { EncuestaService } from 'src/app/services/encuesta.service';
import { TurnoService } from 'src/app/services/turno.service';
@Component({
  selector: 'app-registrar-calificacion-atencion',
  templateUrl: './registrar-calificacion-atencion.component.html',
  styleUrls: ['./registrar-calificacion-atencion.component.css'],
})
export class RegistrarCalificacionAtencionComponent implements OnInit {
  @Input() turno!: any;
  formulario!: FormGroup;
  usuario: any;
  public usuario$: Observable<any> = this.auth.afAuth.user;

  constructor(
    public fv: FormBuilder,
    public auth: AuthService,
    // public encuestaSvc: EncuestaService,
    public turnoService: TurnoService,
    public router: Router
  ) {
    setTimeout(() => {
      this.usuario = this.auth.usuario;
    }, 3000);

    this.formulario = fv.group({
      pregUno: ['', Validators.required],
      pregDos: ['', Validators.required],
      pregTres: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  enviar() {
    const pregUno = this.formulario.controls['pregUno'].value;
    const pregDos = this.formulario.controls['pregDos'].value;
    const pregTres = this.formulario.controls['pregTres'].value;

    const calificacionAtencion = {
      pregUno: pregUno,
      pregDos: pregDos,
      pregTres: pregTres,
      fecha: new Date().toLocaleDateString(),
    };

    this.turnoService
      .addCalificacionAtencion(this.turno, calificacionAtencion)
      .then((res) => {
        this.router.navigate(['/inicio']);
      });
  }
}
