import { User } from "../../auth/model/user";

export class RequestAuthorization{
  id!: number;
  authorisationDate!: Date;
  user!: User;
  type!: string;
  statutDemande!: string;
 

}
