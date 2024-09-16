import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productsUrl='./assets/data/products.json';
  private productsSubject = new BehaviorSubject<any[]>([]);
  public products$ = this.productsSubject.asObservable();

  constructor (private http:HttpClient){
    this.loadProducts();
  }
  private loadProducts(){
    this.http.get<any[]>(this.productsUrl).subscribe(products =>{
      this.productsSubject.next(products);
    });

  }

  updateProductPrice(productId:number , newPrice:number){
    const updateProducts = this.productsSubject.getValue().map(product=>{
      if (product.id === productId){
        return {...product,price:newPrice};
      }
      return product;
    });
    this.productsSubject.next(updateProducts);
  }

  getProducts():Observable<any[]>{
return this.products$;
  }

}
