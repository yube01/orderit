import { Injectable } from '@angular/core';
import { Food } from '../sharerd/models/Food';

import { Tags } from '../sharerd/models/tag';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FOODS_URL } from '../sharerd/constants/urls';
import { FOODS_URL_SEARCH } from '../sharerd/constants/urls';
import { FOODS_URL_TAG } from '../sharerd/constants/urls';
import { FOODS_URL_TAGS } from '../sharerd/constants/urls';
import { FOODS_URL_ID } from '../sharerd/constants/urls';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor(private http:HttpClient) { }
  getAll():Observable<Food[]>{
    return this.http.get<Food[]>(FOODS_URL);
  }
  getAllFoodsBySearchName(searchTerm:string){
return this.http.get<Food[]>(FOODS_URL_SEARCH + searchTerm)
  }

getAllTag():Observable<Tags[]>{
  return this.http.get<Tags[]>(FOODS_URL_TAG);
}
getAllFoodByTags(tag:string):Observable<Food[]> {
return tag === "All"?
this.getAll():
this.http.get<Food[]>(FOODS_URL_TAGS + tag);
}

getFoodById(foodId:string):Observable<Food>{
  return this.http.get<Food>(FOODS_URL_ID + foodId);
}

}
