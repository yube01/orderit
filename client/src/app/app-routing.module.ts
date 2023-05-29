import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './page/home/home.component';
import { FoodPageComponent } from './page/food-page/food-page.component';
import { CartPageComponent } from './page/cart-page/cart-page.component';

const routes: Routes = [
  {
    path:'',
    component:HomeComponent
  },
  {
    path:'search/:searchTerm',
    component:HomeComponent
  },
  {
    path:"tag/:tag",
    component:HomeComponent
  },
  {
    path:"food/:id",
    component:FoodPageComponent
  },
  {
    path:"cart-page",
    component:CartPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
