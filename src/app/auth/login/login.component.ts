import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

import { Store } from '@ngrx/store';
import { AuthProviders } from 'angularfire2';

import { AuthActions } from '../../store/actions';
import { AuthState } from '../../store/reducers';
import { getAuth, isLoggedIn } from '../../store/selectors';
import * as RootStore from '../../store';
import { EmailPasswordCredentials } from '../../models';
import { FormComponent } from '../form/form.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild(FormComponent) public formComponent: FormComponent;
  public form: NgForm;
  public returnUrl: string;
  public authState: AuthState;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<RootStore.AppState>,
    private authActions: AuthActions
  ) { }

  ngOnInit() {
    this.form = this.formComponent.form;
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || 'home';

    this.store.select(getAuth).subscribe(state => {
      this.authState = state;
    });

    this.store.select(isLoggedIn).subscribe(loggedIn => {
      if (loggedIn) {
        this.router.navigate([this.returnUrl]);
      }
    });
  }

  login(credentials: EmailPasswordCredentials) {
    this.store.dispatch(this.authActions.login(credentials));
  }

  loginSocial(provider: AuthProviders) {
    this.store.dispatch(this.authActions.loginSocial(provider));
  }

  reset() {
    this.store.dispatch(this.authActions.authReset());
  }
}
