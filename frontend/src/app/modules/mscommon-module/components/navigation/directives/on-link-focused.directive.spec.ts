import { OnLinkFocusedDirective } from './on-link-focused.directive';
import {ElementRef} from '@angular/core';

const mockTemplate = `<ul>
    <li>
        <a></a>
        <a></a>

      <ul>
        <li>
          <a class='nav__menu-link nav__menu-link--sub'></a>
        </li>
      </ul>
    </li>
  </ul>`;

const mockElement = document.createElement('div');
mockElement.classList.add('test');
mockElement.innerHTML = mockTemplate;

const directive = new OnLinkFocusedDirective(new ElementRef(mockElement));

describe('OnLinkFocusedDirective: ', () => {

  describe('onFocus: ', () => {

    it('should add class to menu element', () => {
      (directive as any).onFocus(mockElement.querySelector('.nav__menu-link'));
      expect(mockElement.querySelector('nav__menu-item--focused')).toBeDefined();
    });

  });

  describe('onBlur: ', () => {

    it('should remove class from menu element', () => {
      (directive as any).onBlur(mockElement.querySelector('.nav__menu-link'));
      expect(mockElement.querySelector('nav__menu-item--focused')).toBeNull();
    });

  });

  describe('onClick: ', () => {

    it('should remove class from menu element', () => {
      (directive as any).onClick(mockElement.querySelector('.nav__menu-link'));
      expect(mockElement.querySelector('nav__menu-item--focused')).toBeNull();
    });

  });

  describe('onBlur: ', () => {

    it('should remove class from menu element', () => {
      (directive as any).onBlur(mockElement.querySelector('.nav__menu-link'));
      expect(mockElement.querySelector('nav__menu-item--focused')).toBeNull();
    });

  });

  describe('getParent: ', () => {

    it('should find exact parent of current element', () => {
      const el = (OnLinkFocusedDirective as any).getParent(mockElement.querySelector('.nav__menu-link'), 1);
      expect(el.nodeName).toEqual('LI');
    });

    it('should find exact parent of current element', () => {
      const el = (OnLinkFocusedDirective as any).getParent(mockElement.querySelector('.nav__menu-link'), 2);
      expect(el.nodeName).toEqual('UL');
    });

  });

});
