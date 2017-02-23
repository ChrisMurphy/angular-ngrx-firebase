import { Action } from '@ngrx/store';
import { FirebaseAuthState } from 'angularfire2';

import { AuthActions } from './../actions';

export interface AuthState {
    authenticating: boolean;
    authInfo: FirebaseAuthState;
}

const initialState: AuthState = {
    authenticating: false,
    authInfo: null
};

export default function (state = initialState, action: Action): AuthState {

    switch (action.type) {

        case AuthActions.LOGIN:
            return Object.assign({}, state, { authenticating: true });

        case AuthActions.AUTH_SUCCESS:
            return Object.assign({}, state, { authenticating: false, authInfo: action.payload });

        case AuthActions.LOGOUT:
            return initialState;

        default:
            return Object.assign({}, state);
    }

}
