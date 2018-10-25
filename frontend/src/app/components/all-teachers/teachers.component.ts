import { Component, OnInit, OnDestroy } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-teachers',
  templateUrl: 'teachers.component.html',
  styleUrls: ['teachers.component.scss']
})
export class TeachersComponent implements OnInit, OnDestroy {
  public tabItems = [
    {
      name: 'All Teachers',
      link: 'all'
    },
    {
      name: 'Teachers by Department',
      link: 'all-teachers'
    }
  ];
  public url: any;
  public all_teachers: boolean;
  public tab: any;
  private subscriptions;

  constructor(private router: ActivatedRoute) { }

  ngOnInit() {
    this.subscriptions = this.router.children[0].data.subscribe(data => {
      this.url = data;
      if (this.url.route === 'all') {
        this.all_teachers = true;
      } else {
        this.all_teachers = false;
      }
    });
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  public changeTab(event) {
    this.tab = event.target.getAttribute('tab');
    if (this.tab === 'all') {
      this.all_teachers = true;
    } else {
      this.all_teachers = false;
    }
  }
}
