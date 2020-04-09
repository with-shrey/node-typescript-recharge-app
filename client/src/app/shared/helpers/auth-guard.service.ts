import {Injectable} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';

@Injectable({
    providedIn: 'root'
})

export class AuthGuardService implements CanActivate {


    constructor(private router: Router,
                private authService: AuthService) {
    }


    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | import('rxjs').Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        const token = this.authService.getToken();
        if (token) {
            return true;
        }

        this.router.navigate(['/portal/login'], {queryParams: {returnUrl: state.url}});
        return false;
    }

}
