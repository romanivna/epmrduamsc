import { NgForNumberPipe } from './ng-for-number.pipe';

describe('NgForNumberPipe', () => {
  const pipe = new NgForNumberPipe();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  describe('when applied', () => {
    it('should return array', () => {
      expect(Array.isArray(pipe.transform(3))).toBeTruthy();
    });

    it('should return an array with length equal arg', () => {
      expect(pipe.transform(3).length).toBe(3);
    });

    it('should filled an array with numbers from 1 to arg', () => {
      expect(pipe.transform(3)).toEqual([1, 2, 3]);
    });

    it('should throw an error if arg < 1', () => {
      expect(() => pipe.transform(-3)).toThrowError(Error);
    });

    it('should make a whole integer number if arg is float number', () => {
      expect(pipe.transform(5.123)).toEqual([1, 2, 3, 4, 5]);
    });
  });
});
