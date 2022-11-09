import { Injectable } from '@angular/core';
import { CRUDService } from './crud.service';
import { Firestore } from '@angular/fire/firestore';
import { UserData} from '../Models/user-data';
Injectable({
  providedIn: 'root'
})


export class UserDataService extends CRUDService<UserData>  {

  collectionName = 'users';
  constructor(db: Firestore) {
    super(db);
  }
}
