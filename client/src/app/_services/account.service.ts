import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import {map} from 'rxjs/operators';
import {User} from '../_models/user';


@Injectable({
  providedIn: 'root'
})
export class AccountService {
   baseUrl = 'https:///localhost:5001/api/';
   private currenUserSource = new ReplaySubject<User>(1)
   currentUser$ = this.currenUserSource.asObservable();

  constructor(private http: HttpClient) { }

  login(model: any) {
    return this.http.post<User>(this.baseUrl + 'account/login', model).pipe(
      map((reponse: User) => {
         const user = reponse;
         if (user) {
           localStorage.setItem('user', JSON.stringify(user));
           this.currenUserSource.next(user);
         }
      })
    )
  }

  register(model: any) {
    return this.http.post<User>(this.baseUrl + 'account/register', model).pipe(
      map((user: User) => {
         if (user) {
           localStorage.setItem('user', JSON.stringify(user));
           this.currenUserSource.next(user);
         }
      })
    )
  }

    setCurrentUser(user: User) {
      this.currenUserSource.next(user);
    }
    
    logout() {
      localStorage.removeItem('user');
      this.currenUserSource.next(null!);
    }
}
