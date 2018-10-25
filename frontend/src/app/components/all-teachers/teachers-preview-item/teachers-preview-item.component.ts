import { Component, Input } from '@angular/core';
import { Teacher } from 'app/declarations';

@Component({
  selector: 'app-teachers-preview-item',
  templateUrl: './teachers-preview-item.component.html',
  styleUrls: ['./teachers-preview-item.component.scss']
})
export class TeachersPreviewItemComponent {
  @Input() public teacher: Teacher;

  public readonly maxContentLength = 150;
}
