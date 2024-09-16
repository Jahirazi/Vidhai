import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
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

}
