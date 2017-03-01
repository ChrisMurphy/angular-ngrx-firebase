import { Action } from '@ngrx/store';
import { FirebaseAuthState } from 'angularfire2';

import { AuthActions } from '../actions';

export interface AuthState {
    authenticating: boolean;
    authInfo: FirebaseAuthState;
    error: any;
}

const initialState: AuthState = {
    authenticating: false,
    authInfo: null,
    error: null
};

export function authReducer(state = initialState, action: Action): AuthState {

    switch (action.type) {

        case AuthActions.LOGIN:
            return Object.assign({}, state, { authenticating: true });

        case AuthActions.LOGOUT:
            return Object.assign({}, state, { authenticating: true });

        case AuthActions.AUTH_SUCCESS:
            return Object.assign({}, state, { authenticating: false, authInfo: action.payload });

        case AuthActions.AUTH_FAILURE:
            return Object.assign({}, state, { authenticating: false, error: action.payload });

        case AuthActions.AUTH_REVOKED:
            return initialState;

        default:
            return Object.assign({}, state);
    }

}
