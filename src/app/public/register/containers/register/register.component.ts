import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { ROLES_ENUM } from 'src/app/enumerators/roles.enum';
import {
  trigger,
  transition,
  animate,
  style,
  state,
  group,
} from '@angular/animations';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('1000ms ease-in', style({ transform: 'translateX(0%)' })),
      ]),
      transition(':leave', [
        animate('500ms ease-in', style({ transform: 'translateX(-100%)' })),
      ]),
    ]),
  ],
})
export class RegisterComponent implements OnInit {
  public formRegister: FormGroup;

  constructor(public formBuilder: FormBuilder) {
    this.formRegister = formBuilder.group({
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      dni: ['', [Validators.required, Validators.minLength(8)]],
      edad: [
        '',
        [Validators.required, Validators.min(18), Validators.max(120)],
      ],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      urlFoto: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  submit() {}
}
