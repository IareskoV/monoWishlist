import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { Items } from 'src/app/Models/items';
import { ItemsService } from 'src/app/Service/items.service';

@Component({
  selector: 'app-item-instance',
  templateUrl: './item-instance.component.html',
  styleUrls: ['./item-instance.component.scss']
})
export class ItemInstanceComponent implements OnInit {
  @Input() id:string | undefined
  item= new Items('loading',"loading")
  constructor( private firestore: Firestore) { }
  itemsDb = new ItemsService(this.firestore);

  ngOnInit(): void {
    console.log(this.id)
    if(this.id){
      this.itemsDb.get(this.id).subscribe(ans=>{
        const obj = ans as Items
        this.item = new Items(obj['price'],obj['name'])
      })
    }


  }

}
