import { User } from "../../auth/model/user";

export class Requestequipment {
  id!: number;
  userId!: User;
  type!: string;
  status!: string;
  equipmentName!: string;


}