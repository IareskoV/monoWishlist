import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { WishListComponent } from './wish-list/wish-list.component';
import { WalletComponent } from './wallet/wallet.component';


@NgModule({
  declarations: [
    UserComponent,
    WishListComponent,
    WalletComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule
  ]
})
export class UserModule { }
