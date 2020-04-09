import {Component} from '@angular/core';
import {RouteConfigLoadEnd, RouteConfigLoadStart, Router} from '@angular/router';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'app-root',
    template: `
        <ngx-loading [show]="loading"
                     [config]="{backdropBackgroundColour: 'rgb(255, 255, 255)', primaryColour: '#000', secondaryColour: '#000', tertiaryColour: '#000'}"
        ></ngx-loading>
        <router-outlet></router-outlet>`,
})
export class AppComponent {
    loading = false;

    constructor(private router: Router) {
        this.router.events.subscribe((event) => {
            switch (true) {
                case event instanceof RouteConfigLoadStart: {
                    this.loading = true;
                    break;
                }

                case event instanceof RouteConfigLoadEnd: {
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
