import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { EmailValidators } from 'ng2-validators'

import { Store } from '@ngrx/store';
import { AuthProviders } from 'angularfire2';

import { AuthActions } from '../../store/actions';
import { AuthState } from '../../store/reducers';
import { getAuth, isLoggedIn } from '../../store/selectors';
import * as RootStore from '../../store';
import { EmailPasswordCredentials } from '../../models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public returnUrl: string;
  public authState: AuthState;
  public form: FormGroup;
  public submitted: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<RootStore.AppState>,
    private authActions: AuthActions,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.submitted = false;
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || 'home';

    this.store.select(getAuth).subscribe(state => {
      this.authState = state;
    });

    this.store.select(isLoggedIn).subscribe(loggedIn => {
      if (loggedIn) {
        this.router.navigate([this.returnUrl]);
      }
    });

    this.form = this.formBuilder.group({
      email: [null, Validators.compose([Validators.required, EmailValidators.simple])],
      password: [null, Validators.required]
    });
  }

  login(credentials: EmailPasswordCredentials, isValid: boolean) {
    this.submitted = true; 

    if (isValid) {
      this.store.dispatch(this.authActions.login(credentials));
    }
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
