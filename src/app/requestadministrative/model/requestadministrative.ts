import { User } from "../../auth/model/user";

export class Requestadministrative {
  id!: number;
 
  userId!: User;
  type!: string;
  status!: string; 
  interneStatus!: string;
  remarks!: string;


}
