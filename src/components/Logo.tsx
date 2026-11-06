import { logoSvg, type LogoKind, type LogoPaths } from '@/lib/logo';
import paths from './logo-paths.json';

const P = paths as LogoPaths;

type Props = {
  kind?: LogoKind;
  fg?: string;
  ground?: string;
  accent?: string;
  cut?: boolean;
  className?: string;
  title?: string;
};

/** The Astronomads logo as inline SVG. Static markup built from our own vector paths. */
export default function Logo({ kind = 'lockup', fg = 'currentColor', ground = '#000', accent, cut = true, className, title }: Props) {
  const svg = logoSvg(P, kind, { fg, ground, accent, cut, title });
  return <span className={className} style={{ display: 'inline-flex', lineHeight: 0 }} dangerouslySetInnerHTML={{ __html: svg }} />;
}
