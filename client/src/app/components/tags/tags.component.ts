import { Component, OnInit } from '@angular/core';
import { FoodService } from 'src/app/services/food.service';
import { Tags } from 'src/app/sharerd/models/tag';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit {


tags?:Tags[]


  constructor( foodService:FoodService){
    this.tags = foodService.getAllTag()
  }

  ngOnInit(): void {

  }


}
