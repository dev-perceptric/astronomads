import type { SignKey } from '@/components/Glyph';
import { ARIES } from './aries';
import { TAURUS } from './taurus';
import { GEMINI } from './gemini';
import { CANCER } from './cancer';
import { LEO } from './leo';
import { VIRGO } from './virgo';
import { LIBRA } from './libra';
import { SCORPIO } from './scorpio';
import { SAGITTARIUS } from './sagittarius';
import { CAPRICORN } from './capricorn';
import { AQUARIUS } from './aquarius';
import { PISCES } from './pisces';
import type { SignCopy } from './types';

/** Signs whose page is written. Made by scripts/sign-pages.mjs; pages are built only for these. */
export const SIGN_COPY: Partial<Record<SignKey, SignCopy>> = { aries: ARIES, taurus: TAURUS, gemini: GEMINI, cancer: CANCER, leo: LEO, virgo: VIRGO, libra: LIBRA, scorpio: SCORPIO, sagittarius: SAGITTARIUS, capricorn: CAPRICORN, aquarius: AQUARIUS, pisces: PISCES };
export type { SignCopy };
