export class UserData {
  public firstName;
  public secondNamae: string;
  public email: string;
  public uid: string;
  public balance: string;
  public wishlist: string[];
  public monobankApi: string;

  constructor(
    firstName: string = '',
    secondName: string = '',
    email: string = '',
    uid: string = '',
    wishlist: string[] = [],
    balance: string = '0',
    monobankApi: string = ''
  ) {
    this.firstName = firstName;
    this.secondNamae = secondName;
    this.email = email;
    this.uid = uid;
    this.wishlist = wishlist;
    this.balance = balance;
    this.monobankApi = monobankApi;
  }

  public get fullname() {
    return `${this.secondNamae} ${this.firstName}`;
  }
  public get wallet(){
    return [this.balance,this.monobankApi]
  }
}
