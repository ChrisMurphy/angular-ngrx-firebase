import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { FirebaseAuthState } from 'angularfire2';

@Injectable()
export class AuthActions {

    static LOGIN = '[auth] LOGIN';
    static AUTH_SUCCESS = '[auth] AUTH_SUCCESS';
    static AUTH_FAILURE = '[auth] FAILURE AUTH_FAILURE';
    static LOGOUT = '[auth] LOGOUT';

    login(): Action {
        return { type: AuthActions.LOGIN };
    }

    logout(): Action {
        return { type: AuthActions.LOGOUT }
    }

    authSuccess(authInfo: FirebaseAuthState) {
        return { type: AuthActions.AUTH_SUCCESS, payload: authInfo };
    }
    authFailure(error) {
        return { type: AuthActions.AUTH_FAILURE, payload: error };
    }
}
