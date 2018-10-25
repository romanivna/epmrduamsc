import { RouteNormalizerPipe } from './route-normalizer.pipe';

describe('RouteNormalizerPipe', () => {
  const pipe = new RouteNormalizerPipe();
  it('transforms "a b c" to "a-b-c"', () => {
    expect(pipe.transform('a b c')).toBe('a-b-c');
  });
  it('transforms "abc   def" to "abc-def"', () => {
    expect(pipe.transform('abc   def')).toBe('abc-def');
  });
});
