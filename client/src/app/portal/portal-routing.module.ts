import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ContainerComponent} from './container/container.component';
import {PortalComponent} from './portal.component';
import {AuthGuardService} from '../shared/helpers/auth-guard.service';

const routes: Routes = [
    {
        path: '',
        component: PortalComponent,
        children: [
            {
                path: 'login',
                loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
            },
            {
                path: '',
                component: ContainerComponent,
                canActivate: [AuthGuardService],
                children: [
                    {
                        path: 'org',
                        loadChildren: () => import('./org/org.module').then(m => m.OrgModule),
                        data: {
                            title: 'Organisation'
                        }
                    }
                ]
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PortalRoutingModule {
}
