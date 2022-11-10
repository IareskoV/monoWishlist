import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';

import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserData } from '../Models/user-data';
import { UserDataService } from '../Service/user-data.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  db = new UserDataService(this.firestore);

  user = new UserData()
  constructor(private router : Router, private auth:Auth, private firestore: Firestore,) {
   }




  ngOnInit(): void {
    if(this.auth.currentUser){
      this.db.getUser(this.auth.currentUser.uid).subscribe(arr=>{
        const obj = arr[0] as UserData
        console.log(obj)
        this.user =  new UserData(obj.firstName,undefined,obj.email,obj.uid,obj.wishlist,obj.balance)
        console.log(this.user)
      })
    }
    // this.http.get('https://api.monobank.ua/personal/client-info',{
    //   headers:{'X-Token':'uKS-KnoE837v2Lyc5kxy3QtQvp-Hwq9AJ7tnl8lF97YI'}
    // }).subscribe(res=>{console.log(res)})
  }

}
function updateBalance(){
  return

}
