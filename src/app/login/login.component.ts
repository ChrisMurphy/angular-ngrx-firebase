import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Store } from '@ngrx/store';

import { AuthActions } from '../store/actions';
import { AuthState } from '../store/reducers';
import * as RootStore from '../store';

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
    this.store.dispatch(this.authActions.login());
  }

}
