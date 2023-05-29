import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.css']
})
export class NotfoundComponent implements OnInit {

  @Input()
  visible=false

@Input()
notFoundMsg= "Nothing to show"


@Input()
resetLinkText="Reset"


@Input()
resetLinkRoute = "/"

  constructor(){}

  ngOnInit(): void {

  }

}
