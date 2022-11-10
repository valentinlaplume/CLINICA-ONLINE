import { ROLES_ENUM } from "../enumerators/roles.enum";

export class Admin{
    id!:string;
    nombre!: string;
    apellido!: string;
    edad!: number;
    dni!: number;
    email!:string;
    password!: string;
    urlFoto!: string;
    roles!: ROLES_ENUM[];
}