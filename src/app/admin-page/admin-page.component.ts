import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent implements OnInit {
products:any[]=[];
filteredProducts: any[]=[];
searchTerm:string='';
selectedProduct:any={};
product: any;
  constructor(private http:HttpClient , private router:Router, private productService:ProductService){
    this.productService.getProducts().subscribe(products =>{
      this.products = products;
    });
  }

  ngOnInit(): void {
    const storedProducts = localStorage.getItem('products');
    if(storedProducts){
      this.products = JSON.parse(storedProducts);
      this.filteredProducts=[...this.products];
    }else{
      this.getProducts();
    }
  }

  // updatePrice(productId:number,newPrice:number){
  //   this.productService.updateProductPrice(productId,newPrice);
  // }

  getProducts():void{
    this.http.get('./assets/data/products.json').subscribe((products:any)=>{
      this.products = products;
      this.filteredProducts = [...products];
      localStorage.setItem('products',JSON.stringify(this.products));
    });
  }

filterProducts():void{
    if(!this.searchTerm){
      this.filteredProducts = [...this.products];
    }else{
      this.filteredProducts = this.products.filter(product=>product.name.toLowerCase().includes
    (this.searchTerm.toLowerCase())
  );
    }
  }

  onUpdate(product: any):void{
    this.selectedProduct = {...product};
    const notNull=document.getElementById('productmodel');
    if(notNull !== null){
      notNull.style.display ='block';
    }
  
  }

  onCloseModal(){
    const notNull=document.getElementById('productmodel');
    if(notNull !== null){
      notNull.style.display ='none';
    }
  } 

  updatePrice(productId:number,newPrice:number):void{
    
    this.productService.updateProductPrice(productId,newPrice);
    this.products = this.products.map(product => product.id === this.selectedProduct.id ? 
      {...this.selectedProduct} : product );
      this.filteredProducts = [...this.products];
      localStorage.setItem('products',JSON.stringify(this.products));
      this.onCloseModal();
  }
}
