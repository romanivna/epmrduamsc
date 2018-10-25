import { Item } from '../../../../../shared/declaration';

export interface EventsContentPreviewItem extends Item {
  header: string;
  lang: any;
  title: string;
  date: string[];
  time?: any;
  imgId?: string;
  img: {
    id: string;
    link: string;
    title: string;
  };
  description?: string;
  photos?: string[];
  place: {
    name: string,
    link: string,
    address: string
  };
}
