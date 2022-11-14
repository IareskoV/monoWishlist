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

  user = new UserData()
  constructor(private router : Router, private auth:Auth, private firestore: Firestore,private http: HttpClient) {
   }
   updateApi(api:string){
    this.user.monobankApi = api
    this.db.update(this.id,this.user).then(ans=>{this.getUserData()})

   }
   updateWishlist(event:string){
    this.user.wishlist.push(event)
    this.db.update(this.id,this.user).then(ans=>this.getUserData())
   }


  ngOnInit(): void {

    this.getUserData()
    this.wishlistToItems()
  }
  getUserData(){
    if(this.auth.currentUser){
      this.db.getUser(this.auth.currentUser.uid).subscribe(async arr=>{
        const obj = arr[0]
        this.user =  new UserData(obj['firstName'],undefined,obj['email'],obj['uid'],obj['wishlist'],obj['balance'],obj['monobankApi'])
        this.id = obj['id']
        console.log(this.user)
        this.wishlistToItems()
      })
    }
  }
wishlistToItems(){
    if(this.user.wishlist  != undefined){
      for (const item of this.user.wishlist) {
        console.log(item)
        this.itemsDb.get(item).subscribe(ans=>{
          console.log(ans)
          this.items = [...this.items,ans as Items]
        })
      }
    }
  }
}

function updateBalance(){
  return

}
