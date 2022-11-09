export class UserData {
  public firstName
  public secondNamae: string
  public email: string;
  public uid: string;
  public wishlist: string[];

  constructor(firstName:string, secondName:string = "",email:string,uid:string,wishlist:string[]= []){
    this.firstName = firstName;
    this.secondNamae  = secondName;
    this.email = email;
    this.uid = uid,
    this.wishlist = wishlist
  }

  public get fullname(){
    return `${this.secondNamae} ${this.firstName}`
  }

}
