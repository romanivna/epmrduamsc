import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import 'rxjs/add/operator/filter';
import { LocalizatorService } from '../../../../shared/services/localizator/localizator.service';

@Component({
  selector: 'app-navigation',
  templateUrl: 'navigation.template.html',
  styleUrls: ['navigation.styles.scss']
})
export class NavigationComponent implements OnInit, OnDestroy {
  public isEnglish = false;
  private localeSubscription;
  public MenuLinks = [
    {
      name: 'about us',
      submenu: [
        'about school',
        'contacts',
        'history',
        'departments',
        'our teachers',
        // 'video',
        'alumni',
        'laureates',
        'gallery',
        'ensembles'
      ]
    },
    {
      name: 'news'
    },
    {
      name: 'events'
    },
    {
      name: 'education',
      submenu: [
        'compulsory education',
        'music education'
      ]
    },
    {
      name: 'admission rules'
    },
    {
      name: 'apply'
    }
  ];

  public menuDropdownState = {
    menuState: false,
    'about us': false,
    'education': false,
    'ensembles': false
  };

  constructor(private router: Router,
              private localizatorService: LocalizatorService) {
  }

  ngOnInit() {
    this.router.events.filter((event) => event instanceof NavigationEnd)
      .takeWhile(() => this.MenuLinks !== null)
      .subscribe(() => {
        if (this.menuDropdownState.menuState) {
          this.toggleMenuState('menuState');
        }
      });

    this.localeSubscription = this.localizatorService.currentLocaleObservable().subscribe(lang => {
      if (lang === 'en') {
        this.isEnglish = true;
      } else {
        this.isEnglish = false;
      }
    });
  }

  public toggleMenuState(menu: string, e?: any): void {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    const keys = Object.keys(this.menuDropdownState);
    let position: boolean;
    keys.forEach((key) => {
      if (key === menu) {
        position = this.menuDropdownState[key];
      }
      this.menuDropdownState[key] = false;
    });
    if (menu === 'menuState') {
      this.menuDropdownState.menuState = !position;
    } else {
      this.menuDropdownState.menuState = true;
      this.menuDropdownState[menu] = !position;
    }
  }

  public navigateTo(link: string): void {
    this.router.navigate(['/', link]);
  }

  ngOnDestroy() {
    this.localeSubscription.unsubscribe();
  }
}
