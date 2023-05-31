import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../sharerd/models/User';
import { IuserLogin } from '../sharerd/interfaces/IuserLogin';
import { HttpClient } from '@angular/common/http';
import { USER_LOGIN_URLS } from '../sharerd/constants/urls';
import { ToastrService } from 'ngx-toastr';


const USER_KEY = "user"

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userSubject = new BehaviorSubject<User>(this.getUserFromLocalStorage())
  public userObservable:Observable<User>

  constructor( private http:HttpClient,private toastrService:ToastrService) { 
    this.userObservable = this.userSubject.asObservable();

  }

  login(userLogin:IuserLogin):Observable<User>{
    return this.http.post<User>(USER_LOGIN_URLS,userLogin).pipe(
      tap({
        next:(user)=>{
          this.setUserToLocalStorage(user);
          this.userSubject.next(user)
          this.toastrService.success(
            `Welcome to orderit ${user.name}!`,
            'Login Successful'
          )
        },
        error:(errorResponse)=>{
          this.toastrService.error(errorResponse.error, "Login Fail")

        }
      })
    )

  }

  logout(){
    this.userSubject.next(new User())
    localStorage.removeItem(USER_KEY)
    window.location.reload()
  }


  private setUserToLocalStorage(user:User){
    localStorage.setItem(USER_KEY,JSON.stringify(user))
  }

  private getUserFromLocalStorage():User{
    const userJson = localStorage.getItem(USER_KEY)

    if(userJson) return JSON.parse(userJson) as User
    return new User()

  }
}
