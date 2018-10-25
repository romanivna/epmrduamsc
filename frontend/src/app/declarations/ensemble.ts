export interface IEnsemble {
  id: number;
}
export interface Ensemble extends IEnsemble {
  name: string;
  description: string;
  img: {
    id: string;
    link: string;
    title: string;
  };
}
