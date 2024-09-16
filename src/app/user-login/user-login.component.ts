import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractControl,FormsModule,FormBuilder,FormGroup,FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit {

  userLogin = new FormGroup({
    username:new FormControl('',[Validators.required]),
    password :new FormControl ('',[Validators.required,Validators.minLength(6)])
  })


  constructor( private formBuilder: FormBuilder,
    private router:Router
  )
  {}

  ngOnInit(): void {
  this.userLogin=this.formBuilder.group({
    username:['',[Validators.required]],
    password:['',[Validators.required,Validators.minLength(6)]]
  })  ;
  }

  onSubmit(){
if (this.userLogin.invalid){
  alert("Login Failure")
}else{
  this.router.navigate(['/user-page'])
}
  }

}
