export interface Achiever {
  id: string;
  name: string;
  role: string;
  country: string;
  achievement: string;
  story: string;
  imageUrl: string;
  featured?: boolean;
  order?: number;
  tags?: string[];
  createdAt?: string;
}

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: string;
  country: string;
  imageUrl: string;
  source: string;
  publishedAt: string;
  readTime?: string;
  createdAt?: string;
}

export interface ProjectShowcase {
  id: string;
  title: string;
  tagline: string;
  description: string;
  founder: string;
  country: string;
  category: string;
  imageUrl: string;
  projectUrl?: string;
  tags?: string[];
  status?: 'Live' | 'In Development' | 'Non-Profit';
  createdAt?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  authorBio?: string;
  category: string;
  imageUrl: string;
  readTime: string;
  publishedAt: string;
  createdAt?: string;
}

export interface DiasporaEvent {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  imageUrl: string;
  registrationLink?: string;
  category?: string;
  createdAt?: string;
}

export interface NewsDataArticle {
  article_id: string;
  title: string;
  link: string;
  description: string | null;
  pubDate: string;
  image_url: string | null;
  source_id?: string;
  source_name?: string;
  source_icon?: string | null;
  language?: string;
  country?: string[];
  category?: string[];
  keywords?: string[] | null;
}

export interface NewsDataResponse {
  status: string;
  totalResults?: number;
  results?: NewsDataArticle[];
  nextPage?: string | null;
  message?: string;
}

export type MagazineEditionId =
  | 'uniting-indian-diaspora'
  | 'glorious-diaspora-pride-of-india'
  | 'special-edition-pbd-2019';

export type NavTab = 'home' | 'about' | 'nri-pio' | 'events' | 'magazine' | 'publish-contact';


