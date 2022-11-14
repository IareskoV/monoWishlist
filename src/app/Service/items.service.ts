import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { Items } from '../Models/items';
import { CRUDService } from './crud.service';

@Injectable({
  providedIn: 'root'
})
export class ItemsService extends CRUDService<Items>  {
  collectionName = 'items';
  constructor(db: Firestore) {
    super(db);
  }
}
