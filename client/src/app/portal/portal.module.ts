import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PortalRoutingModule} from './portal-routing.module';
import {PortalComponent} from './portal.component';
import {ContainerComponent} from './container/container.component';
import {SharedModule} from '../shared/shared.module';


@NgModule({
    declarations: [PortalComponent, ContainerComponent],
    imports: [
        CommonModule,
        PortalRoutingModule,
        SharedModule,
    ]
})
export class PortalModule {
}
