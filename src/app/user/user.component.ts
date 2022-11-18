import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { User } from '../Models/user';
import { UserDataService } from '../Service/user.service';
import { HttpClient } from '@angular/common/http';
import { Item } from '../Models/item';
import { ItemsService } from '../Service/items.service';
import { HotToastService } from '@ngneat/hot-toast';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  db = new UserDataService(this.firestore);
  itemsDb = new ItemsService(this.firestore);
  id = ''
  items:Item[] = []

  user = new User('','','','',[],'loading','loading')
  constructor(private router : Router, private auth:Auth, private firestore: Firestore,private http: HttpClient,private toastService: HotToastService) {
   }
   updateApi(api:string){
    let updatedUser = new User(this.user.firstName,this.user.secondName,this.user.email,this.user.uid,this.user.wishlist,this.user.balance,api)
    this.db.update(this.id,updatedUser).then(ans=>{this.getUserData()})

   }
   updateWishlist(event:string){
    let newWishlist = this.user.wishlist.concat(event)
    let updatedUser = new User(this.user.firstName,this.user.secondName,this.user.email,this.user.uid,newWishlist,this.user.balance,this.user.monobankApi)
    this.db.update(this.id,updatedUser).then(ans=>this.getUserData())
   }
   handleDelete(id:string){
    console.log(id)
    let newWishlist = this.user.wishlist.filter(a=>a!=id)
    let updatedUser = new User(this.user.firstName,this.user.secondName,this.user.email,this.user.uid,newWishlist,this.user.balance,this.user.monobankApi)
    this.db.update(this.id,updatedUser).then(ans=>this.getUserData())
   }
   updateBalance(newBalance:string){
    let updatedUser = new User(this.user.firstName,this.user.secondName,this.user.email,this.user.uid,this.user.wishlist,newBalance,this.user.monobankApi)
    this.db.update(this.id,updatedUser).then(ans=>{this.getUserData()})
   }
   handlePrice(event:Item){

    if(parseInt(this.user.balance)>parseInt(event.price)){
      console.log(event)
      this.toastService.show(`U have enough money to buy ${event.name}`)
    }
   }


  ngOnInit(): void {

    this.getUserData()
  }
  getUserData(){
    if(this.auth.currentUser){
      this.db.getUser(this.auth.currentUser.uid).subscribe( arr=>{
        const obj = arr[0]
        this.user =  new User(obj['firstName'],undefined,obj['email'],obj['uid'],obj['wishlist'],obj['balance'],obj['monobankApi'])
        this.id = obj['id']
        this.wishlistToItems()

      })
    }
  }
wishlistToItems(){
   this.db.getItemsbyArray(this.user.wishlist)
  }
}

