import { ROLES_ENUM } from '../enumerators/roles.enum';
import { Especialidad } from '../models/especialidad';

export class Especialista {
  id!: string;
  nombre!: string;
  apellido!: string;
  edad!: number;
  dni!: number;
  especialidades!: Especialidad[];
  email!: string;
  //emailVerificado!:boolean;
  cuentaHabilitada!: boolean;
  password!: string;
  urlFoto!: string;
  roles!: ROLES_ENUM[];
  fechaAlta!: string;
  horarios!: string;
}
