import { Injectable } from '@angular/core';

import 'rxjs/add/operator/take';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { AuthProviders } from 'angularfire2';

import { AuthService } from '../../providers';
import { AuthActions } from '../actions';
import { EmailPasswordCredentials } from '../../models';

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
        .map(toPayload)
        .switchMap((credentials: EmailPasswordCredentials) =>
            this.authService.login(credentials).then(
                authInfo => this.authActions.authSuccess(authInfo),
                error => this.authActions.authFailure(error))
        );

    @Effect() loginSocial$ = this.actions$
        .ofType(AuthActions.LOGIN_SOCIAL)
        .map(toPayload)
        .switchMap((provider: AuthProviders) =>
            this.authService.loginSocial(provider).then(
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
