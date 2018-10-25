export interface IGeneralEducation {
  description: string | string[];
  photo?: string;
  photos?: string[];
  headTeacher: { name: string; link: string };
}

export class GeneralEducation implements IGeneralEducation {
  description: string | string[];
  photo?: string;
  photos?: string[];
  headTeacher: { name: string; link: string };
}

export interface Education {
  id: number;
  title: string;
  description: string;
  img: {
    id: string;
    link: string;
    title: string;
  };
  educationTypeId: number;
}
