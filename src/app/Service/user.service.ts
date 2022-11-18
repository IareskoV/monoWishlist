import { Injectable } from '@angular/core';
import { CRUDService } from './crud.service';
import { Firestore } from '@angular/fire/firestore';
import { User} from '../Models/user';
Injectable({
  providedIn: 'root'
})


export class UserDataService extends CRUDService<User>  {
  collectionName = 'users';
  constructor(db: Firestore) {
    super(db);
  }
}
