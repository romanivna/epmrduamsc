import { NamedItem } from '../../../shared/declaration/index';

export interface MusicDepartmentsItemPreview extends NamedItem {
  description: string;
  head_id: string;
  img: {
    id: string;
    link: string;
    title: string;
  };
}

export interface MusicDepartmentsItemPreviews {
  departments: MusicDepartmentsItemPreview[];
}

export interface EducationType extends NamedItem {
  description: string;
  educationTypeId: number;
  img: {
    id: string;
    link: string;
    title: string;
  };
  title: string;
  langId?: null;
}
