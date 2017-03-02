import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Store } from '@ngrx/store';
import { AuthProviders } from 'angularfire2';

import { AuthActions } from '../store/actions';
import { AuthState } from '../store/reducers';
import * as RootStore from '../store';
import { EmailPasswordCredentials } from '../models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public returnUrl: string;
  public authState: AuthState;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<RootStore.AppState>,
    private authActions: AuthActions,
  ) { }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || 'home';

    this.store.select(store => store.authState).subscribe(state => {
      // Do selector stuff instead?
      this.authState = state;

      if (state.authInfo) {
        this.router.navigate([this.returnUrl]);
      }
    });
  }

  login() {
    let credentials: EmailPasswordCredentials = { email: 'monkeeman69@googlemail.com', password: 'password123' }
    this.store.dispatch(this.authActions.login(credentials));
  }

  loginGoogle() {
    this.store.dispatch(this.authActions.loginSocial(AuthProviders.Google));
  }

  loginFacebook() {
    this.store.dispatch(this.authActions.loginSocial(AuthProviders.Facebook));
  }

  loginTwitter() {
    this.store.dispatch(this.authActions.loginSocial(AuthProviders.Twitter));
  }

  loginGithub() {
    this.store.dispatch(this.authActions.loginSocial(AuthProviders.Github));
  }

}
