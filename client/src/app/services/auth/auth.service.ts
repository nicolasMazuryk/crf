import { Injectable } from '@angular/core';
import {Http, Headers} from "@angular/http";

@Injectable()
export class AuthService {
  private loggedIn = false

  constructor(private http: Http) {
    this.loggedIn = !!localStorage.getItem('Authorization')
    console.log('authService works')
  }

  login(user) {
    let headers = new Headers()
    headers.append('Content-Type', 'application/json')

    return this.http.post(
      'http://localhost:7000/login',
      JSON.stringify(user)
      )
      .map(res => {
        res.json()
      })
      .map(res => {
        if (res.payload.token) {
          localStorage.setItem('Authorization', res.payload.token)
          this.loggedIn = true
        }
        return res
      })
  }

  logout() {
    localStorage.removeItem('Authorization')
    this.loggedIn = false
  }

  isLoggedIn() {
    return this.loggedIn
  }
}
