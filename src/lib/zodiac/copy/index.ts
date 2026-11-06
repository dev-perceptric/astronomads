import type { SignKey } from '@/components/Glyph';
import { ARIES } from './aries';
import type { SignCopy } from './types';

/** Signs whose page is written. Pages are built only for these. */
export const SIGN_COPY: Partial<Record<SignKey, SignCopy>> = { aries: ARIES };
export type { SignCopy };
