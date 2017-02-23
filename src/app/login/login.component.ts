import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { Store } from '@ngrx/store';

import { AuthService } from '../providers/auth-service';
import { AuthActions } from '../store/actions';
import * as RootStore from '../store';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private router: Router,
    private store: Store<RootStore.AppState>,
    private authActions: AuthActions,
  ) { }

  ngOnInit() {
    this.store.select(store => store.authState).subscribe(state => {
      // Do selector stuff instead?
      if (state.authInfo) {
        this.router.navigate(['home']);
      }
    });
  }

  login() {
    this.store.dispatch(this.authActions.login());
  }

}
