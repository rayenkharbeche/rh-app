import { User } from "../../auth/model/user";

export class Requestleave {
  id!: number;
  startDate!: Date;
  endDate!: Date;
  user!: User;
  leaveType!: string;
  status!: string;
  


}
