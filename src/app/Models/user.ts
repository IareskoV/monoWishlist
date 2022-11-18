export class User {
  public firstName;
  public secondName: string;
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
    this.secondName = secondName;
    this.email = email;
    this.uid = uid;
    this.wishlist = wishlist;
    this.balance = balance;
    this.monobankApi = monobankApi;
    console.log(monobankApi)
  }

  public get fullname() {
    return `${this.secondName} ${this.firstName}`;
  }
  public get wallet(){
    return [this.balance,this.monobankApi]
  }
}
