import type { NextRequest } from 'next/server';
import { dbConfigured } from '@/lib/server/db';
import { currentUser, fail, json, readBody, serverError } from '@/lib/server/http';
import { MAX_PROFILES, addProfile, listProfiles, parseProfile } from '@/lib/server/profiles';

export async function GET(req: NextRequest) {
  if (!dbConfigured()) return fail('Accounts are not set up on this server yet.', 503);
  try {
    const user = await currentUser(req);
    if (!user) return fail('Sign in first.', 401);
    return json({ profiles: await listProfiles(user.id), max: MAX_PROFILES });
  } catch (e) {
    return serverError(e);
  }
}

export async function POST(req: NextRequest) {
  const r = await readBody(req);
  if (!r.ok) return r.res;
  try {
    const user = await currentUser(req);
    if (!user) return fail('Sign in first.', 401);
    const p = parseProfile(r.body);
    if (!p.ok) return fail(p.error, 400);
    const added = await addProfile(user.id, p.value);
    if (!added.ok) return fail(`Your account holds ${MAX_PROFILES} birth profiles, the most it can. Delete one to add another.`, 409);
    return json({ id: added.id }, 201);
  } catch (e) {
    return serverError(e);
  }
}
