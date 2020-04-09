import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgxLoadingModule} from 'ngx-loading';
import { SharedModule } from './shared/shared.module';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserAnimationsModule,
        AppRoutingModule,
        NgxLoadingModule,
        SharedModule.forRoot()

    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
