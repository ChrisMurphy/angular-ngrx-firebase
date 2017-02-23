import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import 'hammerjs';
import { MaterialModule } from '@angular/material';
import { AngularFireModule } from 'angularfire2';

import { AppComponent } from './app.component';
import { AuthService } from './providers/auth-service';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app.routing';
import { HomeComponent } from './home/home.component';

// Must export the config
export const firebaseConfig = {
  apiKey: "AIzaSyCmOeiETtgBaBrgMDtyvgDtMDW9hQkZNio",
  authDomain: "angular-ngrx-firebase.firebaseapp.com",
  databaseURL: "https://angular-ngrx-firebase.firebaseio.com",
  storageBucket: "angular-ngrx-firebase.appspot.com",
  messagingSenderId: "404040318364"
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AppRoutingModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
