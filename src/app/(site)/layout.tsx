import SiteHeader from '@/components/site/SiteHeader';
import SiteFooter from '@/components/site/SiteFooter';
import './site.css';

/** Brand pages (Night and Marble): full-bleed sections, glass header at the top, signature footer. */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="nm-root">
      <a href="#main" className="nm-skip">
        Skip to content
      </a>
      <SiteHeader />
      <main id="main">{children}</main>
      <SiteFooter />
    </div>
  );
}
