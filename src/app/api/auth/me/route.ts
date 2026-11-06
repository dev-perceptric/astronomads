import type { NextRequest } from 'next/server';
import { dbConfigured } from '@/lib/server/db';
import { googleConfigured } from '@/lib/server/google';
import { currentUser, json, serverError } from '@/lib/server/http';
import { query } from '@/lib/server/db';
import { MAX_PROFILES, countProfiles } from '@/lib/server/profiles';

/** Who is signed in. `enabled` is false until the server has a database. */
export async function GET(req: NextRequest) {
  if (!dbConfigured()) return json({ enabled: false, google: false, user: null });
  const google = googleConfigured();
  try {
    const user = await currentUser(req);
    if (!user) return json({ enabled: true, google, user: null });
    const [row] = await query<{ has_password: number; has_google: number }[]>(
      'SELECT password_hash IS NOT NULL AS has_password, google_sub IS NOT NULL AS has_google FROM users WHERE id = ?',
      [user.id],
    );
    return json({
      enabled: true,
      google,
      user: { email: user.email, hasPassword: Boolean(row?.has_password), hasGoogle: Boolean(row?.has_google) },
      profiles: await countProfiles(user.id),
      max: MAX_PROFILES,
    });
  } catch (e) {
    return serverError(e);
  }
}
