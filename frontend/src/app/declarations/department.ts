export interface IDepartment {
  id: number;
  head_id: number;
  name: string;
  description: string;
  imgs?: string[];
}
export class Department implements IDepartment {
  id: number;
  head_id: number;
  name: string;
  description: string;
  imgs?: string[];
  img: {
    id: string;
    link: string;
    title: string;
  };
  educationType: number;
}
export type Departments = IDepartment[];
