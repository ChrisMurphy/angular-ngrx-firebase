import { NgModule } from '@angular/core';
import { compose } from '@ngrx/core/compose';
import { EffectsModule } from '@ngrx/effects';
import { combineReducers, StoreModule } from '@ngrx/store';
import { storeLogger } from 'ngrx-store-logger';

import { AuthActions } from './actions';
import { AuthEffects } from './effects';
import { authReducer, AuthState } from './reducers/auth.reducers';

export interface AppState {
  authState: AuthState;
};

export const actions = [
  AuthActions
];

export const composeStore = compose(storeLogger(), combineReducers)
  ({
    authState: authReducer
  });

export function reducer(state: any, action: any) {
 return composeStore(state, action);
}

@NgModule({
  imports: [
    StoreModule.provideStore(reducer),
    EffectsModule.run(AuthEffects)
  ],
  declarations: [],
  exports: [],
  providers: [...actions]
})

export class AppStoreModule { };
