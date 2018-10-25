import { NamedItem } from '../../../shared/declaration/index';
import { Teacher } from 'app/declarations';

interface Director {
  name: string;
  link: string;
}

export interface EducationDivisionDescription extends NamedItem {
  description: string[] | string;
  headTeacher: Teacher;
}

export interface SchoolInfo {
  name: string;
  logo: string;
  director: Director;
}
