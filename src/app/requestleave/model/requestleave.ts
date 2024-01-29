import { User } from "../../auth/model/user";
import { FileDB } from "./filedb";

export class Requestleave {
  id!: number;
  startDate!: Date;
  endDate!: Date;
  userId!: User;
  leaveType!: string;
  status!: string;
  interneStatus!: string;
  fileDB!: FileDB;


}