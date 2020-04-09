import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import Organisation from '../../../../../../common/model/Organisation';
import {Observable} from 'rxjs';
import {OrganisationService} from '../../../shared/services/organisation.service';

@Injectable()
export class EditOrgResolverService implements Resolve<Organisation> {

  constructor(private organisationService: OrganisationService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Organisation> | Promise<Organisation> | Organisation {
    const id = route.paramMap.get('id');
    return this.organisationService.getOrganisation(Number(id));

  }
}
