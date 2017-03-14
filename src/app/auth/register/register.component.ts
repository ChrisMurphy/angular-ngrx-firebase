import { register } from 'ts-node/dist';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { Store } from '@ngrx/store';

import { FormComponent } from '../form/form.component';
import { EmailPasswordCredentials } from '../../models/email-password-credentials';
import * as RootStore from '../../store';
import { AuthActions } from '../../store/actions';
import { getAuth, isLoggedIn } from '../../store/selectors';
import { AuthState } from '../../store/reducers/auth.reducers';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
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

  register(credentials: EmailPasswordCredentials) {
    this.store.dispatch(this.authActions.register(credentials));
  }

  reset() {
    this.store.dispatch(this.authActions.authReset());
  }
}
