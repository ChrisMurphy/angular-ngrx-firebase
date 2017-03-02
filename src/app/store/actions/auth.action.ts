import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { FirebaseAuthState, AuthProviders } from 'angularfire2';
import { EmailPasswordCredentials } from '../../models';

@Injectable()
export class AuthActions {

    static LOGIN = '[auth] LOGIN';
    static LOGIN_SOCIAL = '[auth] LOGIN_SOCIAL';
    static AUTH_CHECK = '[auth] AUTH_CHECK';
    static AUTH_SUCCESS = '[auth] AUTH_SUCCESS';
    static AUTH_FAILURE = '[auth] FAILURE AUTH_FAILURE';
    static LOGOUT = '[auth] LOGOUT';
    static AUTH_REVOKED = '[auth] AUTH_REVOKED';

    login(credentials: EmailPasswordCredentials): Action {
        return { type: AuthActions.LOGIN, payload: credentials };
    }

    loginSocial(provider: AuthProviders): Action {
        return { type: AuthActions.LOGIN_SOCIAL, payload: provider };
    }

    logout(): Action {
        return { type: AuthActions.LOGOUT };
    }

    authRevoked(): Action {
        return { type: AuthActions.AUTH_REVOKED };
    }

    authCheck(): Action {
        return { type: AuthActions.AUTH_CHECK };
    }

    authSuccess(authInfo: FirebaseAuthState) {
        return { type: AuthActions.AUTH_SUCCESS, payload: authInfo };
    }

    authFailure(error) {
        return { type: AuthActions.AUTH_FAILURE, payload: error };
    }
}
