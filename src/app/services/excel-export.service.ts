import { Injectable } from '@angular/core';

import * as XLSX from 'xlsx';
import { AdminService } from './admin.service';
import { EspecialidadService } from './especialidad.service';
import { PacienteService } from './paciente.service';

@Injectable({
  providedIn: 'root',
})
export class ExcelExportService {
  constructor(
    public pacienteServoce: PacienteService,
    public adminService: AdminService,
    public especialidadService: EspecialidadService
  ) {}

  async exportar_ArrayObjetos_toExcel(
    arrayObjetos: any,
    nombreDeArchivoRecibido: string,
    nombreDeHojaRecibido: string
  ) {
    // let arrayUsuarios = await this.pacienteServoce.;
    // arrayUsuarios.concat(await this.srvFirebase.leerEspecialistasDB());
    // arrayUsuarios.concat(await this.srvFirebase.leerAdministradoresDB());

    const worksheet = XLSX.utils.json_to_sheet(arrayObjetos);
    console.log(worksheet);

    const wb: XLSX.WorkBook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(wb, worksheet, nombreDeHojaRecibido);

    XLSX.writeFile(wb, nombreDeArchivoRecibido + '.xlsx');
  }
}
