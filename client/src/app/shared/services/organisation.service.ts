import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {AuthService} from './auth.service';
import Organisation from '../../../../../common/model/Organisation';

@Injectable({
  providedIn: 'root'
})
export class OrganisationService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.authService.getToken()
    })
  };

  getOrganisations(): Observable<any> {
    return this.http.get(this.baseUrl + '/V1/organisation', this.httpOptions);
  }

  createOrganisation(name: string, host: string): Observable<any> {
    return this.http.post(
        this.baseUrl + '/V1/organisation', {orgName: name, host}, this.httpOptions)
        .pipe(map(org => {
          return org;
        }));
  }

  getOrganisation(id: number): Observable<Organisation> {
    return this.http.get(
        this.baseUrl + `/V1/organisation/${id}`, this.httpOptions);
  }

  updateOrganisation(org: Organisation): Observable<any> {
    return this.http.patch<any>(this.baseUrl + `/V1/organisation/${org.orgId}`, org, this.httpOptions);
  }

}
