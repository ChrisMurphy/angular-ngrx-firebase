import { Injectable } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods, FirebaseAuthState, AngularFireAuth } from 'angularfire2';
// import * as firebase from 'firebase';

@Injectable()
export class AuthService {

  constructor(public angularFire: AngularFire) {}

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
  public login(credentials: any): firebase.Promise<FirebaseAuthState> {
    return this.angularFire.auth.login(credentials);
  }

  /**
   * Logs in the userusing Google
   * @returns {firebase.Promise<FirebaseAuthState>}
   */
  public loginWithGoogle(): firebase.Promise<FirebaseAuthState> {
    return this.angularFire.auth.login({
      provider: AuthProviders.Google,
      method: AuthMethods.Popup,
    });
  }

  /**
   * Logs out the current user
   */
  public logout(): Promise<void> {
    return this.angularFire.auth.logout();
  }

}
