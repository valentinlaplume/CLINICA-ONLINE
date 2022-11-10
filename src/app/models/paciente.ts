import { ROLES_ENUM } from "../enumerators/roles.enum";

export class Paciente{
    id!:string;
    nombre!: string;
    apellido!: string;
    edad!: number;
    dni!: number;
    obraSocial!: string;
    email!:string;
    //emailVerificado!:boolean;
    password!: string;
    urlFotos!: string[];
    roles!: ROLES_ENUM[];

}