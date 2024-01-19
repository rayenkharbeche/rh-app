import { User } from "../../auth/model/user";
import { Department } from "./department";

export class Team {
  id!: number;
  name!:string;
  department!: Department
  teamlead!: User;
  manager!: User;
  consultant!: User;
}
