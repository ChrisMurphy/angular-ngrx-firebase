import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { AuthService } from '../providers/auth.service';
import { AuthActions } from '../store/actions';
import * as RootStore from '../store';
import { getUserEmail } from '../store/selectors';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public userEmail$: Observable<string>;

  constructor(
    private router: Router,
    private store: Store<RootStore.AppState>,
    private authActions: AuthActions,
  ) { }

  ngOnInit() {
    this.userEmail$ = this.store.select(getUserEmail);
  }

  logout() {
    this.store.dispatch(this.authActions.logout());
    this.router.navigate(['users']);
  }

}
