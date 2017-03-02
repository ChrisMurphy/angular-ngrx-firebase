import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import 'hammerjs';
import { MaterialModule , MdIconRegistry } from '@angular/material';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';

import { AppComponent } from './app.component';
import { AuthService } from './providers';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app.routing';
import { HomeComponent } from './home/home.component';
import { AppStoreModule } from './store/index';
import { AuthGuard } from './guards';
import { LoadingComponent } from './loading/loading.component';

// Must export the config
export const firebaseConfig = {
  apiKey: 'AIzaSyCmOeiETtgBaBrgMDtyvgDtMDW9hQkZNio',
  authDomain: 'angular-ngrx-firebase.firebaseapp.com',
  databaseURL: 'https://angular-ngrx-firebase.firebaseio.com',
  storageBucket: 'angular-ngrx-firebase.appspot.com',
  messagingSenderId: '404040318364'
};

export const firebaseAuthConfig = {
    provider: AuthProviders.Password,
    method: AuthMethods.Password
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule,
    AngularFireModule.initializeApp(firebaseConfig, firebaseAuthConfig),
    AppRoutingModule,
    AppStoreModule
  ],
  providers: [AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private mdIconRegistry: MdIconRegistry) {
    mdIconRegistry.registerFontClassAlias('materialdesignicons', 'mdi');
  }
}
