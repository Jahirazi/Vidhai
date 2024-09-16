import { Component , OnInit} from '@angular/core';
import { CartService } from '../cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cartItems:any[]=[];
  totalPrice:number=0;
  itemCount:number=0;
addressArr:any[]=[];
address:any={
  addressId:0,
  name:'',
  address:''
};
orderConfirmation:boolean=false;
orderDetails={
  name:'',
  address:''
};
product: any;


  constructor(private cartService:CartService , private router:Router){}

  ngOnInit(): void {

    this.cartService.cart$.subscribe((items)=>{
      this.cartItems= this.cartService.getCart();
      this.calculateTotals();
    });
    const localData = localStorage.getItem('AddressList');
    if(localData != null){
      this.addressArr = JSON.parse(localData);
    }
    
  }

  removeFromCart(product:any){
    this.cartService.removeFromCart(product);
  }
  decreaseQuantity(product:any){

  }
  increaseQuantity(product:any){

}
  clearCart(){
    this.cartService.clearCart();
  }

  goToProducts(){
    this.router.navigate(['/user-page'])
  }

  
 increaseitem(item:any):void{
  item.quantity++;
  this.cartService.updateItemQuantity(item,item.quantity);
 }
 decreaseitem(item:any):void{
  if(item.quantity > 1){
    item.quantity--;

    this.cartService.updateItemQuantity(item,item.quantity)
  }else{
    item.isAdded = false;

    this.cartService.removeFromCart(item);
  }
 }

  calculateTotals():void{
    this.totalPrice = this.cartItems.reduce((sum,item)=>sum + Number( item.price * item.quantity),0);
    this.itemCount=this.cartItems.length;

  }
  openModal(){
    const notNull = document.getElementById('addressModal')
    if(notNull !== null){
      notNull.style.display='block';
    } 
  }
  closeModal(){
    const notNull = document.getElementById('addressModal')
    if(notNull !== null){
      notNull.style.display='none'
    }
  }
  closeCart(){
    const notNull = document.getElementById('cart')
    if(notNull !== null){
      notNull.style.display='none'
    }
  }
  placeOrder(){
    this.orderDetails.name =this.address.name;
    this.orderDetails.address =this.address.address;
this.orderConfirmation=true;
this.closeModal();
this.closeCart();
this.address={
  name:'',
  address:''
}
setTimeout(()=>{
  this.router.navigateByUrl('/user-page')
},3000);
this.cartService.clearCart();

  }

}
