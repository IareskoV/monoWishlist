import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { fromRef } from '@angular/fire/compat/database';
import { Firestore } from '@angular/fire/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from '@firebase/util';
import { from } from 'rxjs';
import { Items } from 'src/app/Models/items';
import { ItemsService } from 'src/app/Service/items.service';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.scss']
})
export class WishListComponent implements OnInit {
  @Input() wishlist:string[] | undefined
  @Output() addToWishlistEvent = new EventEmitter<string>();

  items:Items[] = []

  addItemForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    price:new FormControl('', [Validators.required]),
  });
    get name() {
    return this.addItemForm.get('name');
  }
  get price() {
    return this.addItemForm.get('price');
  }

  submit(){
    if (this.addItemForm.valid) {
      const { name,price } = this.addItemForm.value;
      console.log(name,price)
      if(price !=null && name != null){
        const item = new Items(price,name,)
        this.itemsDb.add(item).subscribe(ans=>{
          const id = ans.id
          this.addToWishlistEvent.emit(id)
          })
      }
    }
  }

  constructor(private firestore: Firestore) { }
  itemsDb = new ItemsService(this.firestore);

  ngOnInit(): void {

  }
  ngOnChanges( change: any){
    if (this.arraysEqual(change.wishlist.previousValue , change.wishlist.currentValue)){
      console.log(this.wishlist)
    }
  }
   arraysEqual(a:string[], b:string[]) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;

    for (var i = 0; i < a.length; ++i) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }

}
