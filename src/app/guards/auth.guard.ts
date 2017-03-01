import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import * as RootStore from '../store';
import { isLoggedIn } from '../store/selectors';

@Injectable()
export class AuthGuard implements CanActivate {
	
	constructor(
		private store: Store<RootStore.AppState>,
		private router: Router
	) { }

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
		return this.store.select(isLoggedIn)
			.map(data => {
				if (data) {
					return true;
				} else {
					// not logged in so redirect to login page with the return url and return false
					this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
					return false;
				}
			});
	}

}
