import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CreateOrgComponent} from './create-org/create-org.component';
import {OrgListsComponent} from './org-lists/org-lists.component';
import {EditOrgResolverService} from './resolver/edit-org-resolver.service';


const routes: Routes = [
    {
        path: '',
        data: {
            title: 'Organisation'
        },
        children: [
            {
                path: 'createOrg',
                component: CreateOrgComponent,
                data: {
                    title: 'Create'
                }
            },

            {
                path: ':id',
                component: CreateOrgComponent,
                data: {
                    title: 'Edit'
                },
                resolve: {
                    organisation: EditOrgResolverService
                }
            },
            {
                path: '',
                component: OrgListsComponent,
                data: {
                    title: 'List'
                },
            },
        ]
    }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrgRoutingModule { }
