import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {LoginRoutingModule} from './login-routing.module';
import {LoginComponent} from './login.component';
import {OtpFormComponent} from './otp-form/otp-form.component';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
    declarations: [LoginComponent, OtpFormComponent],
    imports: [
        CommonModule,
        LoginRoutingModule,
        SharedModule
    ],
    providers: []
})
export class LoginModule {
}
