import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { SocialLinks } from 'app/declarations';
import { ServerGetterService } from '../../../shared/services/server-getter/server-getter.service';
import { urls } from '../../../shared/constants/index';
import { Credentials } from '../../../shared/declarations/credentials.model';

@Component({
  selector: 'app-credentials',
  templateUrl: 'credentials.template.html',
  styleUrls: ['credentials.styles.scss']
})
export class CredentialsComponent {
  public socialLinks = this.serverGetterService
    .get<SocialLinks>(urls.api.mock.socialLinks)
    .map(res => res.data);

  public credentials = this.serverGetterService
    .get<Credentials>(urls.api.mock.credentials)
    .map(res => res.data);

  constructor(private serverGetterService: ServerGetterService) { }
}
