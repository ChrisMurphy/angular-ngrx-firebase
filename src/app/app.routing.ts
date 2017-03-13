import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './guards';
import { authRoutes } from './auth/auth.routing';

const appRoutes: Routes = [
    { path: '', redirectTo: '/users', pathMatch: 'full' },
    { path: 'users', children: [...authRoutes] },
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] }
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes, { useHash: true })
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }
