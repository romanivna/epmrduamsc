import { DragAndDropService } from './drag-and-drop.service';
import {Observable} from 'rxjs/Observable';

describe('DragAndDropService', () => {

  let sut;


  const mockDetectBrowser = <any>{
    isIE11: jasmine.createSpy('isIE11').and.returnValue(false)
  };

  const mockServerGetter = <any>{
    post: jasmine.createSpy('post').and.returnValue(Observable.of('200'))
  };

  const mockNg2ImgMaxSerive = <any>{
    resize: jasmine.createSpy('resize').and.returnValue(Observable.of('result'))
  };

  const mockFileReader = <any>{
    readAsDataURL() {
      return 'kek';
    },
    onloadend() {
      return 'kek';
    }
  };

  const mockHtmlInput = {
    value: 'value'
  };

  beforeEach(() => {
    sut = new DragAndDropService(mockServerGetter, mockNg2ImgMaxSerive, <any>{}, mockDetectBrowser);
    spyOn(window, 'FileReader').and.returnValue(mockFileReader);
    spyOn(document, 'getElementById').and.returnValue(mockHtmlInput as HTMLInputElement);
  });

  describe('addImage', () => {

    let mockEvent, eventData;

    beforeEach(() => {
      mockEvent = <any>{
        target: {
          value: 'MOCK-VALUE',
          files: [{
            name: 'MOCK-FILE-NAME'
          }]
        },
        dataTransfer: {
          files: [{
            name: 'MOCK-FILE-NAME'
          }]
        }
      };
    });

    eventData = {
      img: {
        id: '',
        link: '',
        title: ''
      },
      id: '',
      content: '',
      title: ''
    };

    it('should call resize with proper params', () => {
      sut.fileReader = mockFileReader;
      sut.addImage(mockEvent, eventData, true);

      expect(mockNg2ImgMaxSerive.resize).toHaveBeenCalledWith([{
        name: 'MOCK-FILE-NAME'
      }], 2000, 1000);
    });

    it('should call resize with proper params twice', () => {
      sut.fileReader = mockFileReader;
      mockDetectBrowser.isIE11 = jasmine.createSpy('isIE11').and.returnValue(true);
      mockEvent.type = 'drop';
      sut.addImage(mockEvent, eventData, true);
      sut.fileReader.onloadend('some result');
      expect(mockServerGetter.post).toHaveBeenCalled();
    });



  });

});
