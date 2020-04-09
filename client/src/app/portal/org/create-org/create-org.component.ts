import {Component, OnInit} from '@angular/core';
import {OrganisationService} from '../../../shared/services/organisation.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-create-org',
    templateUrl: './create-org.component.html',
    styleUrls: ['./create-org.component.scss']
})
export class CreateOrgComponent implements OnInit {
    loading: boolean;
    organisationForm: FormGroup;
    forwardUrl: string;
    valueReceived = false;
    error: any;
  failureUrl: any;
    orgId: number;

    constructor(private organisationService: OrganisationService,
                private router: Router,
                private route: ActivatedRoute,
                private formBuilder: FormBuilder) {
        this.organisationForm = new FormGroup({
            organisationName: new FormControl('', [Validators.required]),
            organisationUrl: new FormControl('', [Validators.required])
        });
    }

  ngOnInit() {
      this.route.data.subscribe(({organisation}) => {
          this.orgId = organisation.orgId;
          this.organisationName.setValue(organisation.orgName);
          this.organisationUrl.setValue(organisation.host);
      });

  }


    onSubmitForm() {
        if (this.findInvalidControls().length) {
            return;
        }
        this.loading = true;
        let request;
        if (this.orgId) {
            request = this.organisationService.updateOrganisation({
                orgId: this.orgId,
                orgName: this.organisationName.value,
                host: this.organisationUrl.value
            });
        } else {
            request = this.organisationService.createOrganisation(this.organisationName.value, this.organisationUrl.value);
        }

        request.subscribe(data => {
            console.log(data);
            this.loading = false;
            this.valueReceived = true;
            this.router.navigate(['/portal/org']);
        }, error => {
            this.loading = false;
            this.error = error.error.errors;
            console.log(error);
            this.valueReceived = false;
        });
}
get organisationName() {
  return this.organisationForm.get('organisationName');
}
get organisationUrl() {
  return this.organisationForm.get('organisationUrl');
}
  findInvalidControls() {
      const invalid = [];
      const controls = this.organisationForm.controls;
      for (const name in controls) {
          if (controls[name].invalid) {
              invalid.push(name);
          }
      }
      console.log(invalid);
      return invalid;
  }

}
