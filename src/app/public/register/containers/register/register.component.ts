import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { ROLES_ENUM } from 'src/app/enumerators/roles.enum';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public formRegister: FormGroup;

  constructor(
    public formBuilder:FormBuilder,
    )
  {
    this.formRegister = formBuilder.group({
      nombre: ['', [Validators.required ]],
      apellido: ['', [Validators.required ]],
      dni: ['', [Validators.required, Validators.minLength(8)]],
      edad: ['', [Validators.required, Validators.min(18), Validators.max(120)]],
      email: ['', [Validators.required ]],
      password: ['', [Validators.required ]],
      urlFoto: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
  }

  submit(){

  }

}
