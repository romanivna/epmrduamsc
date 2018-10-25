export interface EventHeader {
  title: string;
  place: any;
  time: any;
  date: {
    start: string | number,
    end: string | number
  };
  img: {
    id: string;
    link: string;
    title: string;
  };
};
