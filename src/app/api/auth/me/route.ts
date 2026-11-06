import type { NextRequest } from 'next/server';
import { dbConfigured } from '@/lib/server/db';
import { currentUser, json, serverError } from '@/lib/server/http';
import { MAX_PROFILES, countProfiles } from '@/lib/server/profiles';

/** Who is signed in. `enabled` is false until the server has a database. */
export async function GET(req: NextRequest) {
  if (!dbConfigured()) return json({ enabled: false, user: null });
  try {
    const user = await currentUser(req);
    if (!user) return json({ enabled: true, user: null });
    return json({ enabled: true, user: { email: user.email }, profiles: await countProfiles(user.id), max: MAX_PROFILES });
  } catch (e) {
    return serverError(e);
  }
}
