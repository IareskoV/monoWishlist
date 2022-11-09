import { NgIfContext } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { UserData } from 'src/app/Models/user-data';
import { AuthService } from 'src/app/Service/auth.service';
import { UserDataService } from 'src/app/Service/user-data.service';

export function passwordMatchValidator():ValidatorFn{
  return (control:AbstractControl):ValidationErrors | null =>{
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    if (password && confirmPassword &&password!== confirmPassword){
      return{
        passwordsDontMatch:true
      }
    }
    return null
  }
}

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  signUpForm = new FormGroup({
    name: new FormControl('',Validators.required),
    email:new FormControl('',[Validators.email,Validators.required]),
    password: new FormControl('',Validators.required),
    confirmPassword :  new FormControl('',Validators.required)
  },{validators:passwordMatchValidator()})
  constructor(private authService:AuthService,private router:Router,private toast:HotToastService,public auth: Auth,private firestore: Firestore,) { }
  db = new UserDataService(this.firestore);
  ngOnInit(): void {
  }

  get email(){
    return this.signUpForm.get('email')
  }
  get name(){
    return this.signUpForm.get('name')
  }
  get password(){
    return this.signUpForm.get('password')
  }
  get confirmPassword(){
    return this.signUpForm.get('confirmPassword')
  }
  submit(){
    if(this.signUpForm.valid){
      const {name,email,password} = this.signUpForm.value
      if(name && email && password){
        this.authService.signUp(name as string,email as string,password as string).pipe(

          this.toast.observe({
            success:"user created",
            loading:"loading",
            error:({err})=> `${err}`
          })
        ).subscribe((s)=>{
          this.auth.onAuthStateChanged((user) => {
            if(user){
              const registeredUser = new UserData(name,undefined,email,user.uid,)
              this.db.add(registeredUser)
            }})
          console.log(s)
          this.router.navigate(['/user'])
        })
      }

    }
  }


}
