import { Item } from '../../../../../shared/declaration/index';

export interface NewsItem extends Item {
  img: number;
  date: number;
  header: string;
  content: string;
}
