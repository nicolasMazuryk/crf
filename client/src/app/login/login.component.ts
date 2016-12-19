import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../services/auth/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit(user) {
    this.authService.login(this.user).subscribe(result => {
      if (result) {
        this.router.navigate([''])
      }
    })
  }

  ngOnInit() {
  }

}
