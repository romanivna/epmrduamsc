import { Directive, ElementRef, Input, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[appOnLinkFocused]'
})
export class OnLinkFocusedDirective implements AfterViewInit {
  @Input() appOnLinkFocused: string;
  private readonly NESTED_LEVEL = 3;

  private static getParent(el: HTMLElement, count: number): HTMLElement {
    let parent: HTMLElement = el;
    while (count--) {
      parent = parent.parentElement;
    }
    return parent;
  }

  constructor(private el: ElementRef) { }

  ngAfterViewInit() {
    const children = this.el.nativeElement.querySelectorAll(this.appOnLinkFocused);
    Array.from(children).forEach((elem: HTMLElement, index) => {
      elem.addEventListener('focus', this.onFocus.bind(this, children[index]));
      elem.addEventListener('blur', this.onBlur.bind(this, children[index]));
      elem.addEventListener('click', this.onClick.bind(this, children[index]));
    });
  }

  private onFocus(element: HTMLElement): void {
    this.toggleClass(element, true);
  }

  private onBlur(element: HTMLElement): void {
   this.toggleClass(element, false);
  }

  private onClick(element: HTMLElement): void {
   this.toggleClass(element, false);
  }

  private toggleClass(element: HTMLElement, switcher: boolean) {
    if (switcher) {
      OnLinkFocusedDirective.getParent(element, this.NESTED_LEVEL).classList.add('nav__menu-item--focused');
    } else {
      OnLinkFocusedDirective.getParent(element, this.NESTED_LEVEL).classList.remove('nav__menu-item--focused');
    }
  }

}
