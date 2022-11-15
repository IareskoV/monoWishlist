import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { UserData } from '../Models/user-data';
import { UserDataService } from '../Service/user-data.service';
import { HttpClient } from '@angular/common/http';
import { Items } from '../Models/items';
import { ItemsService } from '../Service/items.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  db = new UserDataService(this.firestore);
  itemsDb = new ItemsService(this.firestore);
  id = ''
  items:Items[] = []

  user = new UserData('','','','',[],'loading','loading')
  constructor(private router : Router, private auth:Auth, private firestore: Firestore,private http: HttpClient) {
   }
   updateApi(api:string){
    let updatedUser = new UserData(this.user.firstName,this.user.secondName,this.user.email,this.user.uid,this.user.wishlist,this.user.balance,api)
    this.db.update(this.id,updatedUser).then(ans=>{this.getUserData()})

   }
   updateWishlist(event:string){
    let newWishlist = this.user.wishlist.concat(event)
    let updatedUser = new UserData(this.user.firstName,this.user.secondName,this.user.email,this.user.uid,newWishlist,this.user.balance,this.user.monobankApi)
    this.db.update(this.id,updatedUser).then(ans=>this.getUserData())
   }


  ngOnInit(): void {

    this.getUserData()
  }
  getUserData(){
    if(this.auth.currentUser){
      this.db.getUser(this.auth.currentUser.uid).subscribe( arr=>{
        const obj = arr[0]

        this.user =  new UserData(obj['firstName'],undefined,obj['email'],obj['uid'],obj['wishlist'],obj['balance'],obj['monobankApi'])
        this.id = obj['id']
        this.wishlistToItems()
      })
    }
  }
wishlistToItems(){
   this.db.getItemsbyArray(this.user.wishlist)
  }
}

