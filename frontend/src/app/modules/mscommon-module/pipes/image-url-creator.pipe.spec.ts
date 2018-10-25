import { ImageUrlCreatorPipe } from './image-url-creator.pipe';
import { urls } from '../../../shared/constants/index';

describe('ImageUrlCreatorPipe', () => {
  let pipe: ImageUrlCreatorPipe;

  beforeEach(() => {
    pipe = new ImageUrlCreatorPipe();
  });

  it('should create', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform id to correct img url', () => {
    const id = 322;
    const transformedUrl = pipe.transform(id);
    const baseUrl = urls.api.prod.images;
    expect(transformedUrl).toBe(`${baseUrl}/${id}`);
  });
});
