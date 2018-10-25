export interface ITeacher {
  id: number | string;
  firstName: string;
  lastName: string;
  photo: {
    id: string;
    link: string;
    title: string;
  };
  department: any[];
  lang: string;
  position?: string;
  slogan?: string;
  head?: boolean;
  about?: string;
  imgs?: string[];
  regalias?: string[];
  mail?: string;
  link?: string;
}

export class Teacher implements ITeacher {
  id: number | string;
  firstName: string;
  lastName: string;
  photo: {
    id: string;
    link: string;
    title: string;
  };
  department: any[];
  lang: string;
  position?: string;
  slogan?: string;
  head?: boolean;
  about?: string;
  imgs?: string[];
  regalias?: string[];
  mail?: string;
  link?: string;
}

export type Teachers = ITeacher[];
