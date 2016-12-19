import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import AppRouter from './app.routes';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NavigationComponent } from './navigation/navigation.component';
import { HomepageComponent } from './homepage/homepage.component';

import { AuthService } from "./services/auth/auth.service";

import { LoggedInGuard } from "./guards/loggedIn.guard";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavigationComponent,
    HomepageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRouter
  ],
  providers: [AuthService, LoggedInGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
