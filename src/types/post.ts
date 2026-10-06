export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  category: string;
  tags: string[];
  excerpt: string;
  cover?: string;
  readingTimeMin: number;
}

export interface Post extends PostMeta {
  content: string;
}
