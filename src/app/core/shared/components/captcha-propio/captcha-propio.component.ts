import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-captcha-propio',
  templateUrl: './captcha-propio.component.html',
  styleUrls: ['./captcha-propio.component.css'],
})
export class CaptchaPropioComponent implements OnInit {
  permitted_chars = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
  ];
  string_length = 6;
  captcha!: string;
  captchaParaVerificar!: string;
  captchaResult: boolean = false;
  @Output() resultadoCaptcha: EventEmitter<any> = new EventEmitter<any>();
  checkBtn = document.querySelector('.check-btn');
  statusTxt = document.querySelector('.status-text');
  deshabilitado: boolean = false;

  constructor() {
    this.getCaptcha();
  }

  ngOnInit(): void {}

  getCaptcha() {
    this.captcha = '';
    for (let i = 0; i < 6; i++) {
      //getting 6 random characters from the array
      let randomCharacter =
        this.permitted_chars[
          Math.floor(Math.random() * this.permitted_chars.length)
        ];
      this.captcha += randomCharacter; //passing 6 random characters inside captcha innerText
    }
    console.log('this.captcha: ', this.captcha);
  }

  verificarCaptcha() {
    if (this.captcha == this.captchaParaVerificar) {
      this.captchaResult = true;
    } else {
      console.log(this.statusTxt);
      // this.statusTxt = 'Incorrecto';
      this.captchaParaVerificar = '';
      this.getCaptcha();
    }
    this.resultadoCaptcha.emit(this.captchaResult);
  }

  onVerificarCaptcha(event: any) {
    this.captchaResult = event;
    return this.captchaResult;
  }

  onDeshabilitarEvent(event: any) {
    this.deshabilitado = event;
    this.resultadoCaptcha.emit(this.deshabilitado);
  }

  // onObtenerCaptchaEvent(event:any){
  //   this.captcha = event;
  //   //this.resultadoCaptcha.emit(true);
  // }
}
