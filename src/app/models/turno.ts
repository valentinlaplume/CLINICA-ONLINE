import { Especialidad } from './especialidad';
import { Especialista } from './especialista';
import { HistoriaClinica } from './historia-clinica';
import { Paciente } from './paciente';

export class Turno {
  id!: string;
  // idEspecialista!: string;
  // idPaciente!: string;
  estado!: string;
  paciente!: Paciente;
  especialista!: Especialista;
  especialidad!: Especialidad;
  fecha!: string;
  hora!: string;
  comentariosPaciente!: string;
  comentariosEspecialista!: string;
  comentariosAdmin!: string;
  historiaClinica!: HistoriaClinica;
  encuesta!: string;
  calificacionAtencion!: string;
}
