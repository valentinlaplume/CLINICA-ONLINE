import { ROLES_ENUM } from "../enumerators/roles.enum";

export class Usuario{
    id!:string;
    email!:string;
    password!:string;
    emailVerified!: boolean;
    nombre!: string;
    fecha!: string;
}