import { Department } from "../../setup/model/department";
import { Entity } from "../../setup/model/entity";
import { Poste } from "../../setup/model/poste";

export class User {
    id?: string;
    email?: string;
    password?: string;
    firstname?: string;
    lastName?: string;
    birthdayDate?: string;
    entity?: Entity;
    cotractStartDate?: string;
    poste?: Poste;
    department?: Department;
    token?: string;
    image?:String;
    active?:boolean
    country?:string

}