import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { Especialidad } from 'src/app/models/especialidad';
import { EspecialidadService } from '../../../../services/especialidad.service';
@Component({
  selector: 'app-tabla-especialidades',
  templateUrl: './tabla-especialidades.component.html',
  styleUrls: ['./tabla-especialidades.component.css'],
})
export class TablaEspecialidadesComponent implements OnInit, OnDestroy {
  @Output() seleccionado = new EventEmitter();
  private suscripciones: Subscription[] = [];
  public especialidades: Especialidad[] = [];
  public spinner_especialidades: boolean = true;

  constructor(public especialidadService: EspecialidadService) {
    this.suscripciones.push(
      this.especialidadService.getAll().subscribe((snapshot: any) => {
        this.especialidades = [];
        snapshot.forEach((item: any) => {
          const data = item.payload.doc.data() as Especialidad;
          data.id = item.payload.doc.id;
          this.especialidades.push(data);
        });

        if (this.especialidades.length > 0) {
          this.spinner_especialidades = false;
        }
      })
    );
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.suscripciones.forEach((observable) => {
      observable.unsubscribe();
      console.log(
        'cantidad de unsubscribe Especialidad: ',
        this.suscripciones.length
      );
    });
  }

  seleccionarItem(item: any) {
    this.seleccionado.emit(item);
  }
}
