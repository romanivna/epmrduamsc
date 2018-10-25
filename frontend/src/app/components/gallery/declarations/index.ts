import { NamedItem } from '../../../shared/declaration/index';

export interface Source {
  id: any;
  link: string;
  title?: string;
}

export interface Album extends NamedItem {
  sources: Source[];
}
