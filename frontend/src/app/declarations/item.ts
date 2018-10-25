export interface Item {
  id: number;
}

export interface NamedItem extends Item {
  name: string;
}

export interface NewsItem extends Item {
  img: {
    id: string;
    link: string;
    title: string;
  };
  date: number;
  header: string;
  content: string;
  lang: string[];
}
