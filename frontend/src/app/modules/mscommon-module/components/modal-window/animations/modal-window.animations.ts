import { trigger, style, animate, transition } from '@angular/animations';

export const modalWindowAnimations = [
  trigger('btnTransitions', [
    transition('void => *', [
      style({
        transform: 'scale(1.6) rotate(25deg)'
      }),
      animate(700)
    ])
  ]),
  trigger('bgAppear', [
    transition('void => *', [
      style({
        opacity: '0'
      }),
      animate(200)
    ])
  ]),
  trigger('contentSlideFromTop', [
    transition('void => *', [
      style({
        transform: 'translateY(-10%)',
      }),
      animate(200)
    ])
  ])
];
