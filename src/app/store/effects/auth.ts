import { Injectable } from '@angular/core';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../providers';
import { AuthActions } from '../actions';

@Injectable()
export class AuthEffects {

    constructor(
        private actions$: Actions,
        private authActions: AuthActions,
        private authService: AuthService
    ) { }

    @Effect() login$ = this.actions$
        .ofType(AuthActions.LOGIN)
        .map(toPayload)
        .switchMap(() =>
            this.authService.loginWithGoogle().then(
                authInfo => this.authActions.authSuccess(authInfo), 
                error => this.authActions.authFailure(error))
        );

}
