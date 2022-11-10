import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MonobankService {
  balanceUrl = 'https://api.monobank.ua/personal/client-info';
  constructor(private http: HttpClient) { }

  getUser(){
    this.http.get(this.balanceUrl,{
      headers:{'X-Token':'uKS-KnoE837v2Lyc5kxy3QtQvp-Hwq9AJ7tnl8lF97YI'}
    }).subscribe(res=>{console.log(res)})
  }
}
