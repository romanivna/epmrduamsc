import { Component, Output, EventEmitter, HostListener } from '@angular/core';

import { modalWindowAnimations } from './animations';

@Component({
  selector: 'app-modal-window',
  templateUrl: 'modal-window.template.html',
  styleUrls: ['modal-window.styles.scss'],
  animations: modalWindowAnimations
})
export class ModalWindowComponent {

  @Output() public close: EventEmitter<any> = new EventEmitter();

  @HostListener('click', ['$event.target.classList'])
  private onModalClick(targetClassList): void {
    if (targetClassList.contains('modal__content') || targetClassList.contains('modal__close-btn')) {
      this.close.emit();
    }
  }

}
