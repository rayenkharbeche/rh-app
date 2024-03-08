import { Department } from "../../setup/model/department";
import { Entity } from "../../setup/model/entity";
import { Poste } from "../../setup/model/poste";
import { image } from "./image";
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
    contractStartDate?: string;
    poste?: Poste;
    department?: Department;
    token?: string;
    image?:image;
    actif?:boolean
    country?:string
    isManager?:boolean
    selected?: boolean;
    manager?:boolean
    teamLead?: boolean;
    leaveCredit?: number;
    rttCredit?: number;
    contractType?: string;
    assurance?: boolean;
    telephone?: string;
    address?: string;
    matricule?:string;
    familySituation?:string;
    childNumber?:string;
    remoteNbr?:number;
    updatedAt?:Date;
    superior?:User;

    

}