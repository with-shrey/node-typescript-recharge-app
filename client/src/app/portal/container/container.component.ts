import {Component} from '@angular/core';
import {navItems} from '../_nav';
import {NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router} from '@angular/router';
import {AuthService} from '../../shared/services/auth.service';

@Component({
    selector: 'app-container',
    templateUrl: './container.component.html',
    styleUrls: ['./container.component.scss'],
})
export class ContainerComponent {
    public sidebarMinimized = false;
    public navItems = navItems;
    public loading: boolean;

    toggleMinimize(e) {
        this.sidebarMinimized = e;
    }

    constructor(private router: Router, public authService: AuthService) {
        this.router.events.subscribe((event) => {
            switch (true) {
                case event instanceof NavigationStart: {
                    this.loading = true;
                    break;
                }

                case event instanceof NavigationEnd:
                case event instanceof NavigationCancel:
                case event instanceof NavigationError: {
                    this.loading = false;
                    break;
                }
                default: {
                    break;
                }
            }
        });
    }
}
