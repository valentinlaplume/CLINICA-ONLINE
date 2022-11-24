import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { ExcelExportService } from 'src/app/services/excel-export.service';

@Component({
  selector: 'app-log-ingresos',
  templateUrl: './log-ingresos.component.html',
  styleUrls: ['./log-ingresos.component.css'],
})
export class LogIngresosComponent implements OnInit {
  logs: Array<any> = [];

  constructor(
    private adminService: AdminService,
    public excelExport: ExcelExportService
  ) {
    this.adminService.getCollection('logIngresosClinica').subscribe((lista) => {
      this.logs = lista;
    });
  }

  ngOnInit(): void {}

  exportExcelAll() {
    this.excelExport.exportar_ArrayObjetos_toExcel(
      this.logs,
      'logsIngresosClinica',
      'hoja 1'
    );
  }
}
