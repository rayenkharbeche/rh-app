import { User } from "../../auth/model/user";
import { FileDB } from "./filedb";

export class Requestleave {
  id!: number;
<<<<<<< Updated upstream
  StartDate!: Date;
  EndDate!: Date;
  user!: User;
  type!: string;
  status!: string;
=======
  startDate!: Date;
  endDate!: Date;
  userId!: User;
  leaveType!: string;
  status!: string;
  interneStatus!: string;

  fileDB!: FileDB;
>>>>>>> Stashed changes



}
