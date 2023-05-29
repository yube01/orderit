import { Injectable } from '@angular/core';
import { Cart } from '../sharerd/models/Cart';
import { BehaviorSubject, Observable } from 'rxjs';
import { Food } from '../sharerd/models/Food';
import { CartItem } from '../sharerd/models/CartItem';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart: Cart = this.getCardFromLocalStorage()
  private cartSubject: BehaviorSubject<Cart> = new BehaviorSubject(this.cart);

  constructor() {}

  addToCart(food: Food): void {
    let cartItem = this.cart.items.find((item) => item.food.id === food.id);
    if (cartItem) return;

    this.cart.items.push(new CartItem(food));
    this.setCardToLocalStorage()
  }

  removeCart(foodId: string): void {
    this.cart.items = this.cart.items.filter((item) => item.food.id != foodId);
    this.setCardToLocalStorage()
  }

  changeQuantity(foodId: string, quantity: number) {
    let cartItem = this.cart.items.find((item) => item.food.id === foodId);

    if (!cartItem) return;

    cartItem.quantity = quantity;

    cartItem.price = quantity * cartItem.food.price;
    this.setCardToLocalStorage()
  }

  clearCart() {
    this.cart = new Cart();
    this.setCardToLocalStorage()
  }

  getCartObservable(): Observable<Cart> {
    return this.cartSubject.asObservable();
  }


  private setCardToLocalStorage():void{
    this.cart.totalPrice = this.cart.items.reduce((prevSum,currentItem)=>
      prevSum + currentItem.price ,0
    )
    this.cart.totalCount  = this.cart.items.reduce((prevSum,currentItem)=>prevSum+currentItem.quantity,0)
    const cartJson = JSON.stringify(this.cart)
    localStorage.setItem("Cart",cartJson)
    this.cartSubject.next(this.cart)
  }

  private getCardFromLocalStorage():Cart{
    const cartJson = localStorage.getItem("Cart")
    return cartJson? JSON.parse(cartJson): new Cart()
  }

}
