import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Ensemble } from 'app/declarations';

@Component({
  selector: 'app-ensembles-item-preview',
  templateUrl: './ensembles-item-preview.component.html',
  styleUrls: ['./ensembles-item-preview.component.scss']
})
export class EnsemblesItemPreviewComponent implements OnInit {
  private readonly ensembleItemContentMaxLength = 252;
  private cuttedEnsembleItem: Ensemble;

  @Input() public set ensembleItem(item) {

    item.description = this.cutEnsembleItemContent(item.description);
    this.cuttedEnsembleItem = item;
  };

  @Input() public extended = false;

  @Output() removedEnsemble: EventEmitter<number> = new EventEmitter();

  public get ensembleItem() {
    return this.cuttedEnsembleItem;
  }

  constructor(private router: Router) { }

  private cutEnsembleItemContent(ensembleItemContent): string {
    if (ensembleItemContent.length > this.ensembleItemContentMaxLength) {
      ensembleItemContent = ensembleItemContent.replace(/<img[^>]+>/g, '')
        .slice(0, this.ensembleItemContentMaxLength);
      return ensembleItemContent.slice(0, ensembleItemContent.lastIndexOf(' ')) + ' ...';
    }
    return ensembleItemContent;
  }

  public remove(): void {
    this.removedEnsemble.emit(this.cuttedEnsembleItem.id);
  }

  ngOnInit() {
  }

}
