import { NextResponse } from 'next/server';
import { cityById, searchCities } from '@/lib/cities';

export function GET(request: Request) {
  const url = new URL(request.url);
  const id = url.searchParams.get('id');
  if (id) {
    const city = cityById(Number(id));
    if (!city) return NextResponse.json({ error: 'City not found' }, { status: 404 });
    return NextResponse.json(city, { headers: { 'Cache-Control': 'public, max-age=86400' } });
  }
  const q = url.searchParams.get('q') ?? '';
  return NextResponse.json(searchCities(q), { headers: { 'Cache-Control': 'public, max-age=3600' } });
}
