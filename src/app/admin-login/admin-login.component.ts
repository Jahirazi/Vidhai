import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder,FormGroup,FormControl,AbstractControl,Validators,FormsModule } from '@angular/forms';
import { AuthService } from './service/auth.service';
@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {

  username='';
  password='';
  errormsg='';
  imageUrl:string="https://cdn.dribbble.com/userupload/4488163/file/original-10106973d919ba6b19473d47fc07bb7c.png?resize=1600x1200";
  
  isUserFormVisible = true;
  isAdminFormVisible = false;

  showUserForm(){
    this.isUserFormVisible = true;
    this.isAdminFormVisible = false;
  }
  showAdminForm(){
    this.isUserFormVisible = false;
    this.isAdminFormVisible = true;
  }

   
 constructor( private auth:AuthService , private router:Router){ }

  ngOnInit(): void {
  }

  onLogin(){
    if(this.username.trim().length===0){
      this.errormsg='Username is Required';
    }else if(this.password.trim().length===0){
      this.errormsg='Password is Required'
    }else{
      this.errormsg=''
      let res =this.auth.login(this.username , this.password);
      if (res === 200){
        this.router.navigate(['admin-page'])
      }
      if (res === 403){
        alert('Wrong Credentials')      
      }

    }
  }

      }
      
    
  