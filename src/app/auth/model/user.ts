import { Entity } from "../../setup/model/entity";

export class User {
    id?: string;
    email?: string;
    password?: string;
    firstName?: string;
    lastName?: string;
    birthdayDate?: string;
    entity?: Entity;
    cotractStartDate?: string;
    poste?: string;
    department?: string;
    token?: string;
    picture?:string;
    active?:boolean
    country?:string

}