import { Component, OnInit } from '@angular/core';
import { ServerGetterService } from '../../../../shared/services/';

@Component({
  selector: 'app-gallery-page',
  templateUrl: './gallery-page.component.html',
  styleUrls: ['./gallery-page.component.scss']
})
export class GalleryPageComponent implements OnInit {

  constructor(private serverGetterService: ServerGetterService) { }

  ngOnInit() {
  }

}
