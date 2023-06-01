import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AbstractControl } from '@angular/forms';

const VALIDATION_MSG:any = {
 required:"Email should not be empty",
  email:"Email is not valid"

}

@Component({
  selector: 'input-validation',
  templateUrl: './input-validation.component.html',
  styleUrls: ['./input-validation.component.css']
})
export class InputValidationComponent implements OnInit,OnChanges {


  @Input()
  control!:AbstractControl;  // gives validation value for fc.email and likewise

  @Input()
  showError:boolean = true

  errorMsg :string[] = []
  

  constructor(){}

  
  ngOnChanges(changes: SimpleChanges): void {
    this.checkValidation()
  }

  ngOnInit(): void {

    this.control.statusChanges.subscribe(()=>{
      this.checkValidation()
    });

    this.control.valueChanges.subscribe(()=>{
      this.checkValidation()
    })

    
  }

  checkValidation(){
    const errors = this.control.errors

    if(!errors){

     this.errorMsg = []
     return;
    }


    const errorKeys = Object.keys(errors);

    this.errorMsg = errorKeys.map(key => VALIDATION_MSG[key])

  }

 


}
