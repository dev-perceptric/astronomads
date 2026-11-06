import type { NextRequest } from 'next/server';
import { currentUser, fail, json, readBody, serverError } from '@/lib/server/http';
import { deleteProfile, parseProfile, updateProfile } from '@/lib/server/profiles';

type Ctx = { params: Promise<{ id: string }> };

const idOf = async (ctx: Ctx) => {
  const n = Number((await ctx.params).id);
  return Number.isInteger(n) && n > 0 ? n : null;
};

export async function PATCH(req: NextRequest, ctx: Ctx) {
  const r = await readBody(req);
  if (!r.ok) return r.res;
  try {
    const user = await currentUser(req);
    if (!user) return fail('Sign in first.', 401);
    const id = await idOf(ctx);
    const p = parseProfile(r.body);
    if (!p.ok) return fail(p.error, 400);
    if (!id || !(await updateProfile(user.id, id, p.value))) return fail('This profile no longer exists.', 404);
    return json({ ok: true });
  } catch (e) {
    return serverError(e);
  }
}

export async function DELETE(req: NextRequest, ctx: Ctx) {
  const r = await readBody(req);
  if (!r.ok) return r.res;
  try {
    const user = await currentUser(req);
    if (!user) return fail('Sign in first.', 401);
    const id = await idOf(ctx);
    if (!id || !(await deleteProfile(user.id, id))) return fail('This profile no longer exists.', 404);
    return json({ ok: true });
  } catch (e) {
    return serverError(e);
  }
}
