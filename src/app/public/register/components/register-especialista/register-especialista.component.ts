import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ROLES_ENUM } from 'src/app/enumerators/roles.enum';
import { Especialidad } from 'src/app/models/especialidad';
import { AuthService } from 'src/app/services/auth.service';
import { EspecialistaService } from 'src/app/services/especialista.service';

@Component({
  selector: 'app-register-especialista',
  templateUrl: './register-especialista.component.html',
  styleUrls: ['./register-especialista.component.css'],
})
export class RegisterEspecialistaComponent implements OnInit, OnDestroy {
  public especialidadesSeleccionadas: Especialidad[] = [];
  public formRegister: FormGroup;
  public selectedFiles!: FileList;
  public msjSucces: string = '';
  public resultadoCaptcha: any;

  constructor(
    public formBuilder: FormBuilder,
    public especialistaService: EspecialistaService,
    public authService: AuthService,
    public router: Router
  ) {
    this.formRegister = formBuilder.group({
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      dni: ['', [Validators.required, Validators.min(8)]],
      edad: [
        '',
        [Validators.required, Validators.min(18), Validators.max(120)],
      ],
      email: ['', [Validators.required]],
      // especialidades: ['', [Validators.required ]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password_confirm: ['', [Validators.required, Validators.minLength(6)]],
      urlFoto: ['', [Validators.required]],
    });
  }

  passwordMatchValidator(control: AbstractControl) {
    const password: string = this.formRegister.controls['password'].value;
    const confirmPassword: string =
      this.formRegister.controls['password_confirm'].value;

    if (password !== confirmPassword) {
      this.formRegister.controls['password_confirm'].setErrors({
        NoPassswordMatch: true,
      });
    }
  }

  ngOnInit(): void {}
  ngOnDestroy(): void {
    this.authService.setearMsjError();
  }

  async submit() {
    let item = {
      id: '',
      nombre: this.formRegister.controls['nombre'].value,
      apellido: this.formRegister.controls['apellido'].value,
      dni: this.formRegister.controls['dni'].value,
      edad: this.formRegister.controls['edad'].value,
      email: this.formRegister.controls['email'].value,
      password: this.formRegister.controls['password'].value,
      especialidades: this.especialidadesSeleccionadas,
      cuentaHabilitada: false,
      urlFoto: '',
      roles: [ROLES_ENUM.ESPECIALISTA],
      horarios: '',
      fechaAlta: new Date().toLocaleString(),
    };

    try {
      const user = await this.authService.register(item.email, item.password);
      console.log(user);
      if (user) {
        this.especialistaService
          .uploadImageAndCreate(item, this.selectedFiles)
          .then((res: any) => {
            this.setearCamposForm();
            const isVerified = this.authService.isEmailVerified(user);
            this.redirectUser(isVerified);
          });
      }
    } catch (error) {
      console.log('Error', error);
    }
  }

  private redirectUser(isVerified: boolean): void {
    if (isVerified) {
      this.router.navigate(['inicio']);
    } else {
      this.router.navigate(['registro/verificar-correo']);
    }
  }

  private setearCamposForm() {
    this.especialidadesSeleccionadas = [];
    this.formRegister.setValue({
      nombre: '',
      apellido: '',
      dni: '',
      edad: '',
      email: '',
      password: '',
      password_confirm: '',
      urlFoto: '',
    });
  }

  changeEspecialidadSeleccionada(item: Especialidad) {
    console.log(item);
    if (!this.especialidadesSeleccionadas.includes(item)) {
      this.especialidadesSeleccionadas.push(item);
      //this.formRegister.controls['especialidades'].setValue(this.especialidadesSeleccionadas);
    }
  }

  borrarEspecialidad(item: any) {
    this.especialidadesSeleccionadas = this.especialidadesSeleccionadas.filter(
      function (e) {
        return e.descripcion !== item;
      }
    );
  }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files[0];
    console.log(this.selectedFiles);
  }

  onRegisterEspecialidad() {
    this.router.navigate(['/registro/especialidad']);
  }

  getResultadoCaptcha(res: any) {
    this.resultadoCaptcha = res;
    console.log('Resultado Captcha ->', this.resultadoCaptcha);
  }
}
