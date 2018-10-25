import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../shared/services';
import { Router } from '@angular/router';
import { GaleryNotificationsService } from '../../../../services/';

@Component({
  selector: 'app-initial-page',
  templateUrl: 'initial-page.template.html',
  styleUrls: ['initial-page.styles.scss']
})
export class InitialPageComponent implements OnInit {
  public navigationLinks = [
    {
      name: 'about school',
      link: 'about-us'
    },
    {
      name: 'news',
      link: 'news'
    },
    {
      name: 'events',
      link: 'events'
    },
    {
      name: 'history',
      link: 'history'
    },
    {
      name: 'admission rules',
      link: 'admission-rules'
    },
    {
      name: 'gallery',
      link: 'gallery'
    },
    {
      name: 'departments',
      link: 'departments'
    },
    // { name: 'personal account',
    //   link: 'personal-account'
    // },
    {
      name: 'teachers',
      link: 'teachers-management'
    },
    {
      name: 'education',
      link: 'education'
    },
    {
      name: 'alumni',
      link: 'alumni-management'
    },
    {
      name: 'laureates',
      link: 'laureates-management'
    },
    {
      name: 'ensembles',
      link: 'ensembles'
    }
  ];

  public adminNavigationLinks = [
    {
      name: 'applications',
      link: 'applications'
    },
    {
      name: 'users',
      link: 'user-management'
    }
  ];

  public menuStateOpened: boolean;
  public isAdmin: boolean;
  public isAdminPageOpen: boolean;

  constructor(private authService: AuthService,
              private router: Router,
              public service: GaleryNotificationsService) {
    this.isAdmin = this.authService.isAdminLoggedIn;
    if (this.isAdmin && this.router.url === '/admin') {
      router.navigate(['/admin/user-management']);
    }
  }

  ngOnInit() {
    this.isAdminPageOpen = true;
    this.service.notificationsStream
      .subscribe((data) => {
        this.isAdminPageOpen = data === 'open';
      });

  }

  public changeMenuState(state: boolean): void {
    this.menuStateOpened = state;
  }

}
