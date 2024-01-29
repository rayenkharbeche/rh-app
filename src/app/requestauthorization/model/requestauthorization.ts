import { User } from "../../auth/model/user";

export class RequestAuthorization{
  id!: number;
  authorisationDate!: Date;
  userId!: User;
  type!: string;
  status!: string;

  interneStatus!: string;

}
