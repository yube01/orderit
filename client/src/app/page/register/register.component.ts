import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { IuserRegister } from 'src/app/sharerd/interfaces/IuserRegister';
import { passwordMatch } from 'src/app/sharerd/validators/password_match';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm!:FormGroup;
  isSubmitted = false
  returnUrl=''

  constructor(private formBuilder:FormBuilder,private userService:UserService,private router:Router,private activatedRoute:ActivatedRoute){
    
  }

  ngOnInit(): void {

    this.registerForm = this.formBuilder.group({
      name:['',[Validators.required,Validators.minLength(4)]],
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.minLength(6)]],
      confirmedPassword:['',Validators.required],
      address:['',[Validators.required,Validators.minLength(5)]]

    },{
      validator: passwordMatch('password','confirmedPassword')
    })
    

    this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl
  } 

  get fc(){
    return this.registerForm.controls
  }

  submit(){
    this.isSubmitted = true
    if(this.registerForm.invalid) return;


    //from value
    const fv =  this.registerForm.value


    const user:IuserRegister = {
      name:fv.name,
      email:fv.email,
      password:fv.password,
      confirmedPassword:fv.confirmedPassword,
      address:fv.address

    }
    

    this.userService.register(user).subscribe(_ =>{
      this.router.navigateByUrl(this.returnUrl)
    })


  }
}
