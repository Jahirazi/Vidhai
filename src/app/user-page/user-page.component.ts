import { Component,OnInit } from '@angular/core';
import{HttpClient, HttpClientModule} from "@angular/common/http"
import { Router } from '@angular/router';
import { ProductService  } from '../product.service';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {

  products: any[]=[];
  cartValue:number = 0;
  searchTerm:string='';

  constructor(private http:HttpClient , private router:Router , 
    private productService:ProductService , private cartService:CartService){

  }

  ngOnInit(): void {
    this.productService.getProducts().subscribe((data)=>{
      this.products = data;
      this.cartService.cart$.subscribe(cartItems=>{
        this.cartValue = cartItems.length;

        this.products.forEach(product=>{
          product.isAdded = cartItems.some(item=>item.id === product.id);

          if (product.isAdded){
            product.quantity = cartItems.find(item => item.id === product.id).quantity;
          }
        });
      });
    });
    
  }

  get filteredProducts(){
    return this.products.filter(product=>product.name.toLowerCase().includes(this.searchTerm.toLowerCase())
  );
  }

  addToBag(product:any):void{
    if(!product.isAdded){
    product.isAdded=true;
    product.quantity = 1 ;
      this.cartService.addToBag(product);
    }
  }
 increaseQuantity(product:any):void{
  product.quantity++;
  this.cartService.updateItemQuantity(product,product.quantity);
 }
 decreaseQuantity(product:any):void{
  if(product.quantity > 1){
    product.quantity--;

    this.cartService.updateItemQuantity(product,product.quantity)
  }else{
    product.isAdded = false;

    this.cartService.removeFromCart(product);
  }
 }

 cart(){
    this.router.navigate(['/cart'])
  }
}
