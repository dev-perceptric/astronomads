import FloatingNav from '@/components/site/FloatingNav';
import SiteFooter from '@/components/site/SiteFooter';
import './site.css';

/** Brand pages (Night and Marble): full-bleed sections, signature footer, floating glass navigation. */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="nm-root">
      {children}
      <SiteFooter />
      <FloatingNav />
    </div>
  );
}
