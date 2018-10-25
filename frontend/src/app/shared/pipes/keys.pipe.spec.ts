import { TestBed, async } from '@angular/core/testing';
import { KeysPipe } from './keys.pipe';

describe('KeysPipe', () => {
  const pipe = new KeysPipe();
  it('transforms { a: 1 } to [{ key: "a", value: 1 }]', () => {
    expect(pipe.transform({ a: 1 })).toEqual([{ key: 'a', value: 1 }]);
  });
  it('should not create more instances than members in input object', () => {
    const obj = { a: 1, b: 2, c: 3 };
    const length = Object.keys(obj).length;
    expect(pipe.transform(obj).length).not.toBeGreaterThan(length);
  });
});
