import { Injectable } from '@angular/core';

import 'rxjs/add/operator/take';
import { Actions, Effect, toPayload } from '@ngrx/effects';

import { AuthService } from '../../providers';
import { AuthActions } from '../actions';

@Injectable()
export class AuthEffects {

    @Effect() load$ = this.actions$
        .ofType(AuthActions.AUTH_CHECK)
        .startWith(this.authActions.authCheck())
        .switchMap(() => this.authService.auth.take(1))
        .filter((authInfo) => !!authInfo)
        .map(authInfo => this.authActions.authSuccess(authInfo));

    @Effect() login$ = this.actions$
        .ofType(AuthActions.LOGIN)
        // .map(toPayload)
        .switchMap(() =>
            this.authService.login({ email: 'monkeeman69@googlemail.com', password: 'd1versify' }).then(
                authInfo => this.authActions.authSuccess(authInfo),
                error => this.authActions.authFailure(error))
        );

    @Effect() logout$ = this.actions$
        .ofType(AuthActions.LOGOUT)
        .switchMap(() =>
            this.authService.logout().then(
                () => this.authActions.authRevoked()
            )
        );        

    constructor(
        private actions$: Actions,
        private authActions: AuthActions,
        private authService: AuthService
    ) { }

}
