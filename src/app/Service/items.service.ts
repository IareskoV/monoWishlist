import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { Item } from '../Models/item';
import { CRUDService } from './crud.service';

@Injectable({
  providedIn: 'root'
})
export class ItemsService extends CRUDService<Item>  {
  collectionName = 'items';
  constructor(db: Firestore) {
    super(db);
  }
}
