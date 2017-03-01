import * as RootStore from '../../store';

export const isLoggedIn = (state:RootStore.AppState) => !!state.authState.authInfo;
