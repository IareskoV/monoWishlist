import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../Service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public authService:AuthService,private router:Router) { }
  user$ = this.authService.currentUser$;
  logout(){
    this.authService.logout().subscribe(()=>{
      this.router.navigate([''])
    })}
  ngOnInit(): void {
  }

}
