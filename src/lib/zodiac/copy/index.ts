import type { SignKey } from '@/components/Glyph';
import { ARIES } from './aries';
import { AQUARIUS } from './aquarius';
import { PISCES } from './pisces';
import type { SignCopy } from './types';

/** Signs whose page is written. Made by scripts/sign-pages.mjs; pages are built only for these. */
export const SIGN_COPY: Partial<Record<SignKey, SignCopy>> = { aries: ARIES, aquarius: AQUARIUS, pisces: PISCES };
export type { SignCopy };
