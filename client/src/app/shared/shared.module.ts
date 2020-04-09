import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AppAsideModule, AppBreadcrumbModule, AppFooterModule, AppHeaderModule, AppSidebarModule,} from '@coreui/angular';

import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {TabsModule} from 'ngx-bootstrap/tabs';
import {PerfectScrollbarConfigInterface, PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UserService} from './services/user.service';
import {AuthService} from './services/auth.service';
import {NgxLoadingModule} from 'ngx-loading';
import {AlertModule} from 'ngx-bootstrap';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    suppressScrollX: true
};

@NgModule({
    declarations: [],
    imports: [
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        PerfectScrollbarModule,
        NgxLoadingModule.forRoot({}),
        // Core UI Modules
        AppAsideModule,
        AppBreadcrumbModule.forRoot(),
        AppHeaderModule,
        AppFooterModule,
        AppSidebarModule,
        // ngx-bootstrap
        BsDropdownModule.forRoot(),
        TabsModule.forRoot(),
        AlertModule.forRoot()
    ],
    exports: [
        HttpClientModule,
        PerfectScrollbarModule,
        FormsModule,
        ReactiveFormsModule,
        NgxLoadingModule,
        //CoreUI
        AppAsideModule,
        AppBreadcrumbModule,
        AppHeaderModule,
        AppFooterModule,
        AppSidebarModule,
        // ngx-bootstrap
        BsDropdownModule,
        TabsModule,
        AlertModule
    ]
})
export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: [UserService, AuthService]
        };
    }
}
