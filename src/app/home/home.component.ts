import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';

import { AuthService } from '../providers/auth.service';
import { AuthActions } from '../store/actions';
import * as RootStore from '../store';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private router: Router,
    private store: Store<RootStore.AppState>,
    private authActions: AuthActions,
  ) { }

  ngOnInit() {
  }

  logout() {
    this.store.dispatch(this.authActions.logout());
    this.router.navigate(['login']);
  }

}
