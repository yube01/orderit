import { Injectable } from '@angular/core';
import { Food } from '../sharerd/models/Food';
import { sample_foods, sample_tag } from 'src/data';
import { Tags } from '../sharerd/models/tag';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor() { }
  getAll():Food[]{
    return sample_foods;
  }
  getAllFoodsBySearchName(searchTerm:string){
return this.getAll().filter(food=>food.name.toLowerCase().includes(searchTerm.toLowerCase()))
  }

getAllTag():Tags[]{
  return sample_tag;
}
getAllFoodByTags(tag:string){
return tag === "All"?
this.getAll():
this.getAll().filter(food => food.tags?.includes(tag))
}

getFoodById(foodId:string):Food{
  return this.getAll().find(food => food.id == foodId) ?? new Food()
}

}
