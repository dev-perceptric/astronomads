import Link from 'next/link';
import Logo from '@/components/Logo';
import Stipple from '@/components/Stipple';

/** The signature footer: the carved wordmark across an Astral star field. */
export default function SiteFooter() {
  return (
    <footer className="nm-section nm-void nm-signature">
      <Stipple kind="field" tone="astral" className="nm-signature-field" />
      <div className="nm-signature-inner">
        <p className="nm-label" style={{ textTransform: 'none' }}>
          Astronomads © 2026
        </p>
        <Logo kind="wordmark" fg="#fff" ground="#000" className="nm-signature-mark" title="Astronomads" />
        <div className="nm-foot-links">
          <Link href="/chart">My chart</Link>
          <Link href="/today">Today</Link>
          <Link href="/zodiac">Zodiac</Link>
          <Link href="/compatibility">Compatibility</Link>
          <Link href="/reports">Reports</Link>
          <Link href="/account">Account</Link>
          <Link href="/brand">Brand</Link>
          <span>
            City data © <a href="https://www.geonames.org" target="_blank" rel="noreferrer">GeoNames</a> (CC BY 4.0)
          </span>
        </div>
      </div>
    </footer>
  );
}
