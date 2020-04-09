import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {WebsiteComponent} from './website.component';


const routes: Routes = [{
    path: '',
    component: WebsiteComponent,
    children: [
        {
            path: 'about', loadChildren: () => import('./about/about.module').then((m) => m.AboutModule)
        },
        {
            path: 'contact', loadChildren: () => import('./contact/contact.module').then((m) => m.ContactModule)
        },
        {
            path: 'services', loadChildren: () => import('./services/services.module').then((m) => m.ServicesModule)
        },
        {
            path: '', loadChildren: () => import('./home/home.module').then((m) => m.HomeModule)
        }
    ]
}];


@NgModule({
    declarations: [WebsiteComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class WebsiteRoutingModule {

}
