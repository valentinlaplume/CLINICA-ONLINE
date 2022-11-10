import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { EspecialidadService } from 'src/app/services/especialidad.service';

@Component({
  selector: 'app-register-especialidad',
  templateUrl: './register-especialidad.component.html',
  styleUrls: ['./register-especialidad.component.css'],
})
export class RegisterEspecialidadComponent implements OnInit {
  formulario!: FormGroup;
  especialidad!: string;
  public selectedFiles!: FileList;

  constructor(
    public fv: FormBuilder,
    private especialidadService: EspecialidadService,
    public authService: AuthService,
    public router: Router
  ) {
    this.formulario = fv.group({
      especialidad: ['', Validators.required],
      urlFoto: [''],
    });
  }

  ngOnInit(): void {}

  guardar() {
    this.especialidad = this.formulario.controls['especialidad'].value;

    let item = {
      id: '',
      descripcion: this.formulario.controls['especialidad'].value,
      urlFoto: '',
      fechaAlta: new Date().toLocaleString(),
    };
    this.especialidadService
      .uploadImageAndCreate(item, this.selectedFiles)
      .then((x: any) => {
        console.log(x);
        alert('alta ok');
        this.formulario.reset();
      });
  }
  selectFile(event: any): void {
    this.selectedFiles = event.target.files[0];
    console.log(this.selectedFiles);
  }
}
