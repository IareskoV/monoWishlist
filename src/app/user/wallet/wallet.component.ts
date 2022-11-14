import { Component, Input, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { AddApikeyModalComponent } from '../add-apikey-modal/add-apikey-modal.component';
import { Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss']
})


export class WalletComponent implements OnInit {

  @Input() wallet:any
  @Output() updateApiEvent = new EventEmitter<string>();
  constructor(private http: HttpClient,  public dialog: MatDialog,) { }

  openDialog(
    enterAnimationDuration = '0ms',
    exitAnimationDuration = '0ms'
  ) {
    let config = {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: { name: '' },
    };

    const dialogRef = this.dialog.open(AddApikeyModalComponent, config);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if(result !=0){
          this.updateApiEvent.emit(result);
        }
      }
    });
  }

  ngOnInit(): void {
    const headers= new HttpHeaders().set('X-Token', this.wallet.monobankApi)

      this.http.get("https://api.monobank.ua/personal/client-info?",{ 'headers': headers }).subscribe((ans)=>{

      })
    if(this.wallet.monobankApi === ""){
      console.log(this.wallet.monobankApi)
      this.openDialog()
    }
    else{
      const headers= new HttpHeaders().set('X-Token', this.wallet.monobankApi)
      this.http.get("https://api.monobank.ua/personal/client-info?",{ 'headers': headers }).subscribe(ans=>{
       console.log(ans)
      })
    }
  }

}

