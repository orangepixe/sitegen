
export interface Project {
  id: string;
  websiteName: string;
  logo?: string;
  productPhotos: string[];
  productTitle: string;
  shortDescription: string;
  fullDescription: string;
  price: number;
  buyButtonText: string;
  mainWebsiteUrl: string;
  googleAdsScript?: string;
  template: 'modern' | 'classic';
  extraFields?: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

export interface Template {
  id: string;
  name: string;
  preview: string;
  generate: (project: Project) => string;
}
