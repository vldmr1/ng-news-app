export interface NewsSourceInterface {
  id: string;
  name: string;
  description: string;
  url: string;
  category: string;
  language: string;
  country: string;
}

export interface SourcesResponseInterface {
  status: string;
  sources: NewsSourceInterface[];
}

export interface ArticleInterface {
  _id?: string
  source?: {
    id: string;
    name: string;
  };
  author?: string;
  title?: string;
  description?: string;
  url?: string;
  urlToImage?: string;
  publishedAt?: string;
  content?: string;
}

export interface ArticlesResponseInterface {
  status: string;
  source: string;
  sortBy: string;
  articles: ArticleInterface[];
}
