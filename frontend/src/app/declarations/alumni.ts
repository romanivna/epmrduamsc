export interface IAlumni {
  gradeYear: string;
  lang: string;
  img: {
    link: string;
    title: string;
    id: any;
  };
  id: any;
  name: string;
  about: string;
}

export interface EditedAlumni {
  gradeYear: string;
  id: any;
  img: {
    link: string;
    title: string;
    id: any;
  };
  uk: {
    name: string;
    about: string;
  };
  ru: {
    name: string;
    about: string;
  };
  en: {
    name: string;
    about: string;
  };
}

export class Alumni implements IAlumni {
  gradeYear: string;
  lang: string;
  img: {
    link: string;
    title: string;
    id: any;
    };
  id: any;
  name: string;
  about: string;
}

export type Alumnies = IAlumni[];
