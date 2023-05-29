import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Cart } from 'src/app/sharerd/models/Cart';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

cart=0

  constructor( private cartService:CartService){

    this.cartService.getCartObservable().subscribe((carts) => {
      this.cart = carts.totalCount;
    });

  }

  ngOnInit(): void {

  }

}
