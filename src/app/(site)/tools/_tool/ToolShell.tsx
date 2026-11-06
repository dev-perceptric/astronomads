import type { Metadata } from 'next';
import Link from 'next/link';
import { Suspense, type ReactNode } from 'react';
import Stipple from '@/components/Stipple';
import Toc from '@/app/(site)/zodiac/_sign/Toc';
import { TOOLS } from '@/lib/tools/registry';
import type { ToolGuide } from '@/lib/tools/types';
import s from './tool.module.css';

/*
 * Every calculator page: a Void hero, the calculator on Marble, then the long guide with its
 * contents, the questions, and links to the other tools. Each page is its own plain folder.
 */

export function toolMetadata(g: ToolGuide): Metadata {
  const url = `/tools/${g.slug}`;
  return {
    title: { absolute: `${g.title} · Astronomads` },
    description: g.description,
    alternates: { canonical: url },
    openGraph: { title: g.title, description: g.description, url, type: 'website', images: [{ url: '/og/zodiac-aries.png', width: 1200, height: 630 }] },
    twitter: { card: 'summary_large_image', title: g.title, description: g.description },
  };
}

export default function ToolShell({ guide, name, children }: { guide: ToolGuide; name: string; children: ReactNode }) {
  const site = (process.env.SITE_URL || 'https://astronomads.com').replace(/\/$/, '');
  const url = `${site}/tools/${guide.slug}`;
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: `${name} calculator`,
      url,
      description: guide.description,
      applicationCategory: 'LifestyleApplication',
      operatingSystem: 'Any',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      publisher: { '@type': 'Organization', name: 'Astronomads', url: site },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: site },
        { '@type': 'ListItem', position: 2, name: 'Tools', item: `${site}/tools` },
        { '@type': 'ListItem', position: 3, name, item: url },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: guide.faq.map((q) => ({ '@type': 'Question', name: q.q, acceptedAnswer: { '@type': 'Answer', text: q.a } })),
    },
  ];
  const toc = guide.sections.map((x) => ({ id: x.id, title: x.title }));
  const related = TOOLS.filter((t) => t.slug !== guide.slug).slice(0, 15);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />

      <section className={`nm-section nm-void ${s.hero}`}>
        <Stipple kind="field" tone="astral" className={s.field} />
        <div className={`nm-bracket ${s.heroFrame}`}>
          <nav className={s.crumbs} aria-label="Breadcrumb">
            <Link href="/">Home</Link> <span aria-hidden="true">/</span> <Link href="/tools">Tools</Link> <span aria-hidden="true">/</span> <span aria-current="page">{name}</span>
          </nav>
          <p className="nm-label">Free calculator</p>
          <h1 className={`${s.title} fade-up`}>{guide.h1}</h1>
          <p className={s.lead}>{guide.lead}</p>
          <a href="#calculator" className={`nm-btn nm-btn-glass ${s.jump}`}>
            Calculate
          </a>
        </div>
      </section>

      <section id="calculator" className={`nm-section nm-marble ${s.calc}`}>
        <Suspense fallback={<div className={s.blank} />}>{children}</Suspense>
      </section>

      <section className={`nm-section nm-marble ${s.read}`}>
        <div className={s.readGrid}>
          <aside className={s.tocCol}>
            <Toc items={toc} />
          </aside>
          <article className={s.article}>
            <p className="nm-label">The guide</p>
            {guide.sections.map((sec) => (
              <div key={sec.id}>
                <h2 id={sec.id} className={s.sectionTitle}>
                  {sec.title}
                </h2>
                {sec.paras.map((p, j) => (
                  <p key={j} className={s.para}>
                    {p}
                  </p>
                ))}
                {sec.list && (
                  <div className={s.inlineList}>
                    <p className={s.smallLabel}>{sec.list.title}</p>
                    <ul>
                      {sec.list.items.map((x) => (
                        <li key={x}>{x}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </article>
        </div>
      </section>

      <section className={`nm-section nm-marble ${s.faq}`}>
        <p className="nm-label">Questions</p>
        <h2 className="nm-title">{name}: common questions</h2>
        <div className={s.faqList}>
          {guide.faq.map((f) => (
            <details key={f.q} className={s.faqItem}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className={`nm-section nm-void ${s.more}`}>
        <p className="nm-label">More tools</p>
        <h2 className="nm-title">Keep exploring your chart</h2>
        <div className={s.moreGrid}>
          {related.map((t) => (
            <Link key={t.slug} href={t.href} className={s.moreCard}>
              <span className={s.moreTitle}>{t.name}</span>
              <span className={s.moreText}>{t.short}</span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
