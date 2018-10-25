import { RouterLinkStubDirective } from './router-stub';

describe('RouterLinkStubDirective: ', () => {
  it('should prevent router link behaviour', () => {
    const routerLink = new RouterLinkStubDirective();
    routerLink.routerLink = 'qwerty';
    routerLink.navigatedTo = 'lorem';
    routerLink.onClick();
    expect(routerLink.navigatedTo).toEqual(routerLink.routerLink);
  });
});
