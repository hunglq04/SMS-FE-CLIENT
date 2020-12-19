import { Account } from './account.model'
import { Item} from './item.model'
export class Order {
  public customer: Account;
  public date: Date;
  public item: Item;
  public total: number;
  public oderStatus: string;
  public email: string;
  public name: string;
  public phone: string;
  public address: string;
  public description: string;
  constructor(
  ){}
}
