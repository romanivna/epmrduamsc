export interface AdmissionRule {
    id: number;
  }

  export interface AdmissionRules extends AdmissionRule {
    img: {
      id: string;
      link: string;
      title: string;
    };
    name: string;
    content: string;
  }
