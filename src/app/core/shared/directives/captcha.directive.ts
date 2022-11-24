import { DOCUMENT } from '@angular/common';
import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Inject,
  Input,
  NgZone,
  OnInit,
  Output,
  Renderer2,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appCaptcha]',
})
export class CaptchaDirective {
  @Output('resultadoCaptcha') resultadoCaptchaEvent = new EventEmitter();
  @Output('deshabilitar') deshabilitarEvent = new EventEmitter();
  @Input('obtenerCapctha') obtenerCaptchaEvent = new EventEmitter();
  deshabilitar: boolean = false;
  captchaGenerado!: string;
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
  captchaParaVerificar!: string;
  captchaResult: boolean = false;

  constructor() {}

  @HostListener('click')
  onClick() {
    console.log('deshabilitando');
    if (!this.deshabilitar) {
      this.deshabilitar = true;
      this.deshabilitarEvent.emit(this.deshabilitar);
    } else {
      this.deshabilitar = false;
      this.deshabilitarEvent.emit(this.deshabilitar);
    }
  }
}
