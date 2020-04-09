import {Component, OnInit} from '@angular/core';
import {OrganisationService} from '../../../shared/services/organisation.service';
import Organisation from '../../../../../../common/model/Organisation';

@Component({
    selector: 'app-org-lists',
    templateUrl: './org-lists.component.html',
    styleUrls: ['./org-lists.component.scss']
})
export class OrgListsComponent implements OnInit {

    list: Organisation[];
    error: any;

  constructor(private organisationService: OrganisationService) { 
  
  }

  ngOnInit() {
      this.getListedOrganisation();
  }

  getListedOrganisation(){
      this.organisationService.getOrganisations()
    .subscribe(data=>{
        this.list = (data);
        console.log('Org list', this.list.length);
    },error=>{
        this.error = error;
    });
  }

}
