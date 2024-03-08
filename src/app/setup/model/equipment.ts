import { User } from "../../auth/model/user";

export class Equipment {
  id!: number;
  name!: string;
  reference!: string;
  user!: User;
  
}
