import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { Especialista } from 'src/app/models/especialista';
import { EspecialistaService } from 'src/app/services/especialista.service';

@Component({
  selector: 'app-habilitar-cuentas',
  templateUrl: './habilitar-cuentas.component.html',
  styleUrls: ['./habilitar-cuentas.component.css'],
})
export class HabilitarCuentasComponent implements OnInit, OnDestroy {
  public lista: Especialista[] = [];
  suscripciones: Subscription[] = [];
  @Output() seleccionado = new EventEmitter();

  constructor(public especialistaService: EspecialistaService) {}

  ngOnInit(): void {
    this.getList();
  }

  ngOnDestroy(): void {
    this.suscripciones.forEach((observable) => {
      observable.unsubscribe();
      console.log(
        'cantidad de unsubscribe HabilitarCuentasComponent: ',
        this.suscripciones.length
      );
    });
  }

  getList() {
    this.suscripciones.push(
      this.especialistaService.getAll().subscribe((snapshot) => {
        this.lista = [];
        snapshot.forEach((item: any) => {
          const data = item.payload.doc.data() as Especialista;
          data.id = item.payload.doc.id;
          this.lista.push(data);
        });
      })
    );
  }

  seleccionar(item: Especialista) {
    this.seleccionado.emit(item);
  }

  habilitarCuenta(item: any) {
    this.lista = [];
    this.especialistaService.habilitarCuenta(item.id).then((res) => {});
  }
  deshabilitarCuenta(item: any) {
    this.lista = [];
    this.especialistaService.deshabilitarCuenta(item.id).then((res) => {});
  }
}
