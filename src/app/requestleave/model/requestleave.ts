import { User } from "../../auth/model/user";

export class Requestleave {
  id!: number;
  StartDate!: Date;
  EndDate!: Date;
  user!: User;
  type!: string;
  status!: string;



}
