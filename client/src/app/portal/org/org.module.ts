import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {OrgRoutingModule} from './org-routing.module';
import {CreateOrgComponent} from './create-org/create-org.component';
import {OrgListsComponent} from './org-lists/org-lists.component';
import {SharedModule} from '../../shared/shared.module';
import {EditOrgResolverService} from './resolver/edit-org-resolver.service';

@NgModule({
  declarations: [CreateOrgComponent, OrgListsComponent],
  imports: [
    CommonModule,
    OrgRoutingModule,
    SharedModule,
  ],
  providers: [EditOrgResolverService]
})
export class OrgModule {
}
