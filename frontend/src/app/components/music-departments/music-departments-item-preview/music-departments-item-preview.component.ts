import { Component, Input, OnInit } from '@angular/core';
import { MusicDepartmentsItemPreview } from '../declarations/music-departments-item-preview.model';
import { ServerGetterService } from './../../../shared/services';
import { urls } from './../../../shared/constants';
import {HideScrollElementService} from '../../../shared/services/';

@Component({
  selector: 'app-music-departments-item-preview',
  templateUrl: './music-departments-item-preview.template.html',
  styleUrls: ['./music-departments-item-preview.styles.scss']
})
export class MusicDepartmentsItemPreviewComponent implements OnInit {

  @Input() public musicDepartmentsItemPreview: MusicDepartmentsItemPreview;
  public headTeacher;
  constructor(private serverGetterService: ServerGetterService) { }

  ngOnInit() {
    this.getTeacher();
  }

  getTeacher() {
    const url: string = urls.api.prod.teachers;
    this.serverGetterService
      .get(`${ url }/${ this.musicDepartmentsItemPreview.head_id }`)
      .subscribe(({ data }) => {
        this.headTeacher = data;
        this.headTeacher.isHead = true;
      });
  }


}
