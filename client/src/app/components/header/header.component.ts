import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';
import { Cart } from 'src/app/sharerd/models/Cart';
import { User } from 'src/app/sharerd/models/User';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

cart=0
user!:User;

  constructor( private cartService:CartService,private userService:UserService){

    this.cartService.getCartObservable().subscribe((carts) => {
      this.cart = carts.totalCount;
    });

    userService.userObservable.subscribe((newUser)=>{
      this.user  =newUser
    })


   
  
   

  }

  ngOnInit(): void {

  }

  logout(){
    this.userService.logout()
  }

  get isAuth(){
    return this.user.token
  }

  

}
