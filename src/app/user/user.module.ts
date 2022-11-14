import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { WishListComponent } from './wish-list/wish-list.component';
import { WalletComponent } from './wallet/wallet.component';
import { AddApikeyModalComponent } from './add-apikey-modal/add-apikey-modal.component';
import {MatDialogModule} from '@angular/material/dialog'
import {MatButtonModule} from '@angular/material/button'
import { FormsModule,ReactiveFormsModule }   from '@angular/forms';
import {MatInputModule} from '@angular/material/input'
@NgModule({
  declarations: [
    UserComponent,
    WishListComponent,
    WalletComponent,
    AddApikeyModalComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    HttpClientModule,
    MatDialogModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatInputModule
  ]
})
export class UserModule { }
