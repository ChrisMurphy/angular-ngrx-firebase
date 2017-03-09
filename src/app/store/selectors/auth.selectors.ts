import * as RootStore from '../../store';

export const isLoggedIn = (state: RootStore.AppState) => !!state.authState.authInfo;

export const getUserEmail = (state: RootStore.AppState) => { 
	if (state.authState.authInfo) return state.authState.authInfo.auth.email 
};

export const getAuth = (state: RootStore.AppState) => state.authState;
