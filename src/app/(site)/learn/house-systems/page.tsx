import { ARTICLE } from '@/lib/learn/articles/house-systems';
import ArticlePage, { articleMetadata } from '../_article/ArticlePage';
import { MORE } from '../more';

export const metadata = articleMetadata(ARTICLE);

export default function Page() {
  return <ArticlePage article={ARTICLE} more={MORE.filter((m) => m.href !== '/learn/house-systems')} />;
}
