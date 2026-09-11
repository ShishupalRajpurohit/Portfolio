import type { MetadataRoute } from 'next';
import data from '../src/data/portfolio.json';

export default function sitemap(): MetadataRoute.Sitemap {
  return data.site.url ? [{ url: data.site.url, lastModified: new Date() }] : [];
}
