import {Component, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
    selector: 'app-portal',
    template: `
        <router-outlet></router-outlet>`,
    styleUrls: ['./portal.component.scss'],
    encapsulation: ViewEncapsulation.None,

})
export class PortalComponent implements OnInit {
    constructor() {

    }

    ngOnInit() {
    }

}
