import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private router:Router) { }

  login(uname:string , pword:string){
    if(uname === 'admin' && pword === 'admin123'){
      return 200;
    }else{
      return 403;
    }
  }
  
}
