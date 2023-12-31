import { Department } from "../../setup/model/department";
import { Entity } from "../../setup/model/entity";
import { Poste } from "../../setup/model/poste";
import { Image } from "./image";
import { Role } from "./role";

export class User {
    id?: string;
    email?: string;
    password?: string;
    role?: Role;
    firstname?: string;
    lastName?: string;
    birthdayDate?: string;
    entity?: Entity;
    cotractStartDate?: string;
    poste?: Poste;
    department?: Department;
    token?: string;
    image?:Image;
    active?:boolean
    country?:string

}