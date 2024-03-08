import { User } from "../../auth/model/user";

export class RequestAuthorization{
  id!: number;
  authorisationStartDate!: Date | null;
  authorisationEndDate!: Date | null;

  userId!: User;
  type!: string;
  status!: string;
  interneStatus!: string;
  remoteDays!:number

}
