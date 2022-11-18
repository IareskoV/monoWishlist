import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { Item } from 'src/app/Models/item';
import { ItemsService } from 'src/app/Service/items.service';

@Component({
  selector: 'app-item-instance',
  templateUrl: './item-instance.component.html',
  styleUrls: ['./item-instance.component.scss']
})
export class ItemInstanceComponent implements OnInit {
  @Output() deleteItem = new EventEmitter<string>();
  @Input() id:string | undefined
  @Output() myPrice = new EventEmitter<Item>();

  item= new Item('loading',"loading")
  constructor( private firestore: Firestore) { }
  itemsDb = new ItemsService(this.firestore);

  ngOnInit(): void {
    if(this.id){
      this.itemsDb.get(this.id).subscribe(ans=>{
        const obj = ans as Item
        this.item = new Item(obj['price'],obj['name'])
        this.myPrice.emit(this.item)
      })
    }


  }
  handleDelete(){
    this.deleteItem.emit(this.id)
  }

}
