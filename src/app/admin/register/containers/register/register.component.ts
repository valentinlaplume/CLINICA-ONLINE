import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ROLES_ENUM } from 'src/app/enumerators/roles.enum';
import { AuthService } from 'src/app/services/auth.service';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  public formRegister: FormGroup;
  public selectedFile!: FileList;
  public msjSucces: string = '';
  public spinner = false;
  public resultadoCaptcha: any;
  constructor(
    public formBuilder: FormBuilder,
    public authService: AuthService,
    public router: Router,
    public adminAdminService: AdminService
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

  private spinnerShow() {
    this.spinner = true;
  }

  private spinnerHide() {
    this.spinner = false;
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
      urlFoto: [],
      roles: [ROLES_ENUM.ADMIN],
      fechaAlta: new Date().toLocaleString(),
    };

    try {
      this.spinnerShow();
      const user = await this.authService.register(item.email, item.password);
      console.log(user);
      if (user) {
        this.adminAdminService
          .uploadImageAndCreate(item, this.selectedFile)
          .then((res: any) => {
            this.spinnerHide();
            this.setearCamposForm();
            const isVerified = this.authService.isEmailVerified(user);
            this.redirectUser(isVerified);
          });
      }
    } catch (error) {
      this.spinnerHide();
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
      edad: '',
      email: '',
      password: '',
      password_confirm: '',
    });
  }

  selectFile(event: any): void {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
  }

  getResultadoCaptcha(res: any) {
    this.resultadoCaptcha = res;
    console.log('Resultado Captcha ->', this.resultadoCaptcha);
  }
}
