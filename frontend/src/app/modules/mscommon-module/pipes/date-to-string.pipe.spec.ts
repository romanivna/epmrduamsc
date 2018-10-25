import { DateToStringPipe } from './date-to-string.pipe';

describe('DateToStringPipe', () => {
  it('create an instance', () => {
    const pipe = new DateToStringPipe();
    expect(pipe).toBeTruthy();
  });

  it('should transform date from Date object to correct string representation', () => {
    const pipe = new DateToStringPipe();
    expect(pipe.transform(1506286800000)).toBe('Monday, September 25.');
  });

  it('should transform date from Date object to correct string representation with hyphens', () => {
    const pipe = new DateToStringPipe();
    expect(pipe.transform(1506286800000, true)).toBe(' - Monday, September 25.');
  });
});
