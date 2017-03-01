import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as RootStore from './store';
import { isLoggedIn } from './store/selectors';
import { AuthService } from './providers/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app works!';
  isLoggedIn$: Observable<boolean>;

  constructor(private store: Store<RootStore.AppState>) {
  }

  ngOnInit() {
    this.isLoggedIn$ = this.store.select(isLoggedIn);
  }
}
