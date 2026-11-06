import SignPage, { signMetadata } from '../_sign/SignPage';

// Built once at deploy time; the live parts update in the browser.
export const dynamic = 'force-static';
export const metadata = signMetadata('leo');

export default function Page() {
  return <SignPage slug="leo" />;
}
