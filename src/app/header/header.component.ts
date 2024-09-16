import { HttpClient,HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  

  constructor(private http:HttpClient, private router:Router)
  { }

  ngOnInit(): void {

  }

 

}
