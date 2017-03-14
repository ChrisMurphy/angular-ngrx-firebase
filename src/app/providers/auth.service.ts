import { Injectable } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods, FirebaseAuthState, AngularFireAuth, } from 'angularfire2';
// import * as firebase from 'firebase';

import { EmailPasswordCredentials } from '../models';

@Injectable()
export class AuthService {

  constructor(public angularFire: AngularFire) { }

  /**
   * Gets the angularfire auth object
   * @returns {AngularFireAuth}
   */
  get auth() {
    return this.angularFire.auth;
  }

  /**
   * Logs in the user using Email/Password
   * @returns {firebase.Promise<FirebaseAuthState>}
   */
  public login(credentials: EmailPasswordCredentials): firebase.Promise<FirebaseAuthState> {
    return this.angularFire.auth.login(credentials);
  }

  /**
   * Logs in the user using social provider
   * @returns {firebase.Promise<FirebaseAuthState>}
   */
  public loginSocial(provider: AuthProviders): firebase.Promise<FirebaseAuthState> {
    return this.angularFire.auth.login({
      provider: provider,
      method: AuthMethods.Popup,
    });
  }

  /**
   * Logs out the current user
   */
  public logout(): Promise<void> {
    return this.angularFire.auth.logout();
  }

  /**
   * Registers a user using Email/Password
   * @returns {firebase.Promise<FirebaseAuthState>}
   */
  public register(credentials: EmailPasswordCredentials): firebase.Promise<FirebaseAuthState> {
    return this.angularFire.auth.createUser(credentials);
  }  

}
