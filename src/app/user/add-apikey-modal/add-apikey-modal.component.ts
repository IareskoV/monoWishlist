import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { HotToastService } from '@ngneat/hot-toast';
@Component({
  selector: 'app-add-apikey-modal',
  templateUrl: './add-apikey-modal.component.html',
  styleUrls: ['./add-apikey-modal.component.scss']
})
export class AddApikeyModalComponent implements OnInit {
  constructor(private toast: HotToastService) { }

  apiForm = new FormGroup({
    api: new FormControl('', [Validators.required]),
  });
  get api() {
    return this.apiForm.get('api');
  }

  submit(){
    if (this.apiForm.valid) {
      const { api } = this.apiForm.value;
      return api
    }
    else{ return 0}

  }

  ngOnInit(): void {
  }

}
