import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ROLES_ENUM } from 'src/app/enumerators/roles.enum';
import { AuthService } from 'src/app/services/auth.service';
import { PacienteService } from 'src/app/services/paciente.service';

@Component({
  selector: 'app-register-paciente',
  templateUrl: './register-paciente.component.html',
  styleUrls: ['./register-paciente.component.css'],
})
export class RegisterPacienteComponent implements OnInit {
  public formRegister: FormGroup;
  public selectedFile!: FileList;
  public selectedFile2!: FileList;
  public msjSucces: string = '';
  public resultadoCaptcha: any;
  public spinner = false;

  constructor(
    public formBuilder: FormBuilder,
    public authService: AuthService,
    public router: Router,
    public pacienteService: PacienteService
  ) {
    this.formRegister = formBuilder.group({
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      edad: [
        '',
        [Validators.required, Validators.min(18), Validators.max(120)],
      ],
      dni: ['', [Validators.required, Validators.min(8)]],
      email: ['', [Validators.required]],
      obraSocial: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password_confirm: ['', [Validators.required, Validators.minLength(6)]],
      urlFoto: ['', [Validators.required]],
      urlFoto2: ['', [Validators.required]],
    });
  }
  private spinnerShow() {
    this.spinner = true;
  }

  private spinnerHide() {
    this.spinner = false;
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
      obraSocial: this.formRegister.controls['obraSocial'].value,
      edad: this.formRegister.controls['edad'].value,
      email: this.formRegister.controls['email'].value,
      password: this.formRegister.controls['password'].value,
      cuentaHabilitada: false,
      urlFotos: [],
      roles: [ROLES_ENUM.PACIENTE],
      fechaAlta: new Date().toLocaleString(),
    };

    let arrayFiles = [];
    arrayFiles.push(this.selectedFile);
    arrayFiles.push(this.selectedFile2);

    try {
      this.spinnerShow();
      const user = await this.authService.register(item.email, item.password);
      console.log(user);
      if (user) {
        this.pacienteService
          .uploadImagesAndCreate(item, arrayFiles)
          .then((res: any) => {
            this.spinnerHide();
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
    this.formRegister.setValue({
      nombre: '',
      apellido: '',
      dni: '',
      obraSocial: '',
      edad: '',
      email: '',
      password: '',
      password_confirm: '',
      urlFotos: [],
    });
  }

  selectFile(event: any): void {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
  }

  selectFile2(event: any): void {
    this.selectedFile2 = event.target.files[0];
    console.log(this.selectedFile2);
  }

  getResultadoCaptcha(res: any) {
    this.resultadoCaptcha = res;
    console.log('Resultado Captcha ->', this.resultadoCaptcha);
  }
}
