import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ROLES_ENUM } from 'src/app/enumerators/roles.enum';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  public formulario: FormGroup;
  public spinner = false;

  constructor(
    public formBuilder: FormBuilder,
    public authService: AuthService,
    public router: Router
  ) {
    this.formulario = formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {}

  async submit() {
    let item = {
      email: this.formulario.controls['email'].value,
      password: this.formulario.controls['password'].value,
    };

    try {
      this.spinnerShow();
      this.authService.login(item.email, item.password).then((res) => {
        this.spinnerHide();
        if (this.authService.msjError == '') {
          this.router.navigate(['inicio']);
        }
      });
    } catch (error) {
      this.spinnerHide();
    }
  }

  ngOnDestroy(): void {
    this.authService.setearMsjError();
  }

  onAdmin1() {
    this.formulario.controls['email'].setValue('laplu.me.valen@gmail.com');
    this.formulario.controls['password'].setValue('asd123');
  }

  onEspecialista1() {
    this.formulario.controls['email'].setValue('qslu_sakbx91@yutep.com');
    this.formulario.controls['password'].setValue('asd123');
  }

  onEspecialista2() {
    this.formulario.controls['email'].setValue('agvh_ygquw46@yutep.com');
    this.formulario.controls['password'].setValue('asd123');
  }

  onPaciente1() {
    this.formulario.controls['email'].setValue('344216dd55@inboxmail.life');
    this.formulario.controls['password'].setValue('asd123');
  }

  onPaciente2() {
    this.formulario.controls['email'].setValue('nidabo6702@hempyl.com');
    this.formulario.controls['password'].setValue('ASD123');
  }

  onPaciente3() {
    this.formulario.controls['email'].setValue('wehiri7193@ktasy.com');
    this.formulario.controls['password'].setValue('asd123');
  }

  private spinnerShow() {
    this.spinner = true;
  }

  private spinnerHide() {
    this.spinner = false;
  }
}
