import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: any[]=[];
  private cartSubject = new BehaviorSubject<any[]>(this.cartItems);

  cart$=this.cartSubject.asObservable();

  addToBag(product:any):void{
    this.cartItems.push({...product});

    this.cartSubject.next(this.cartItems);
  }

  updateItemQuantity(product:any,quantity:number):void{
    const item = this.cartItems.find(item =>item.id === product.id);
    if(item){
      item.quantity=quantity;
    }
    this.cartSubject.next(this.cartItems);
  }

  removeFromCart(product:any):void{
    const index = this.cartItems.findIndex(item => item.id === product.id);
    if(index > -1){
      this.cartItems.splice(index,1);
      this.cartSubject.next(this.cartItems);
    }
  }
  getCart():any[]{
    return this.cartItems;
  }

  clearCart()
{
  this.cartItems=[];
  this.cartSubject.next(this.cartItems)
}
}
