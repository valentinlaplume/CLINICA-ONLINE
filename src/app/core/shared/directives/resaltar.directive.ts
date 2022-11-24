import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appResaltar]',
})
export class ResaltarDirective {
  constructor(private elemento: ElementRef) {
    elemento.nativeElement.style.backgroundColor = '#f4c63d';
    elemento.nativeElement.style.padding = '10';
  }
}
