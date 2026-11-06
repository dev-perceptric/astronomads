import type { Metadata } from 'next';
import Link from 'next/link';
import type { ReactNode } from 'react';
import Stipple from '@/components/Stipple';
import Toc from '@/app/(site)/zodiac/_sign/Toc';
import t from '@/app/(site)/tools/_tool/tool.module.css';
import type { Article, FigureKey } from '@/lib/learn/types';
import { CirclesFigure, DiurnalFigure, HemispheresFigure, HouseSizesFigure, QuadrantsFigure } from './Figures';
import { DistributionWidget, HouseCompareWidget } from './Widgets';
import a from './article.module.css';

/*
 * A long Learn article: Void hero, the read with its contents, drawings and live tools placed
 * inside, questions, sources and more to read. Each article is its own plain folder under /learn.
 */

const FIGURES: Record<FigureKey, () => ReactNode> = {
  hemispheres: () => <HemispheresFigure />,
  quadrants: () => <QuadrantsFigure />,
  diurnal: () => <DiurnalFigure />,
  circles: () => <CirclesFigure />,
  'house-sizes': () => <HouseSizesFigure />,
  distribution: () => <DistributionWidget />,
  'house-compare': () => <HouseCompareWidget />,
};

export function articleMetadata(x: Article): Metadata {
  const url = `/learn/${x.slug}`;
  return {
    title: { absolute: `${x.title} · Astronomads` },
    description: x.description,
    alternates: { canonical: url },
    openGraph: { title: x.title, description: x.description, url, type: 'article', images: [{ url: '/og/zodiac-aquarius.png', width: 1200, height: 630 }] },
    twitter: { card: 'summary_large_image', title: x.title, description: x.description },
  };
}

export default function ArticlePage({ article, more }: { article: Article; more: { href: string; title: string; text: string }[] }) {
  const site = (process.env.SITE_URL || 'https://astronomads.com').replace(/\/$/, '');
  const url = `${site}/learn/${article.slug}`;
  const jsonLd = [
    { '@context': 'https://schema.org', '@type': 'Article', headline: article.h1, description: article.description, author: { '@type': 'Organization', name: 'Astronomads', url: site }, publisher: { '@type': 'Organization', name: 'Astronomads', url: site }, mainEntityOfPage: url, citation: article.sources },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: site },
        { '@type': 'ListItem', position: 2, name: 'Learn', item: `${site}/learn` },
        { '@type': 'ListItem', position: 3, name: article.h1, item: url },
      ],
    },
    { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: article.faq.map((q) => ({ '@type': 'Question', name: q.q, acceptedAnswer: { '@type': 'Answer', text: q.a } })) },
  ];
  const toc = [...article.sections.map((x) => ({ id: x.id, title: x.title })), { id: 'sources', title: 'Sources and further reading' }];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
      <section className={`nm-section nm-void ${t.hero}`}>
        <Stipple kind="field" tone="astral" className={t.field} />
        <div className={`nm-bracket ${t.heroFrame}`}>
          <nav className={t.crumbs} aria-label="Breadcrumb">
            <Link href="/">Home</Link> <span aria-hidden="true">/</span> <Link href="/learn">Learn</Link> <span aria-hidden="true">/</span> <span aria-current="page">{article.h1}</span>
          </nav>
          <p className="nm-label">{article.kicker}</p>
          <h1 className={`${t.title} fade-up`}>{article.h1}</h1>
          <p className={t.lead}>{article.lead}</p>
          <p className={a.meta}>
            {article.minutes} minute read · {article.sections.length} sections · {article.sources.length} sources
          </p>
        </div>
      </section>

      <section className={`nm-section nm-marble ${t.read}`}>
        <div className={t.readGrid}>
          <aside className={t.tocCol}>
            <Toc items={toc} />
          </aside>
          <article className={t.article}>
            {article.sections.map((sec, i) => (
              <div key={sec.id}>
                <h2 id={sec.id} className={t.sectionTitle}>
                  <span className={a.num}>{String(i + 1).padStart(2, '0')}</span> {sec.title}
                </h2>
                {sec.paras.map((p, j) => (
                  <p key={j} className={`${t.para} ${i === 0 && j === 0 ? a.dropcap : ''}`}>
                    {p}
                  </p>
                ))}
                {sec.aside && (
                  <aside className={a.aside}>
                    <p className={a.asideTitle}>{sec.aside.title}</p>
                    <p>{sec.aside.text}</p>
                  </aside>
                )}
                {sec.list && (
                  <div className={t.inlineList}>
                    <p className={t.smallLabel}>{sec.list.title}</p>
                    <ul>
                      {sec.list.items.map((x) => (
                        <li key={x}>{x}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {sec.figure && FIGURES[sec.figure]()}
              </div>
            ))}
            <h2 id="sources" className={t.sectionTitle}>
              Sources and further reading
            </h2>
            <ol className={a.sources}>
              {article.sources.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ol>
            <p className={a.credit}>Written by Astronomads. Every calculation in this article comes from our own chart engine and is checked against Swiss Ephemeris.</p>
          </article>
        </div>
      </section>

      <section className={`nm-section nm-marble ${t.faq}`}>
        <p className="nm-label">Questions</p>
        <h2 className="nm-title">{article.h1}: common questions</h2>
        <div className={t.faqList}>
          {article.faq.map((f) => (
            <details key={f.q} className={t.faqItem}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className={`nm-section nm-void ${t.more}`}>
        <p className="nm-label">Keep reading</p>
        <h2 className="nm-title">More to learn</h2>
        <div className={t.moreGrid}>
          {more.map((m) => (
            <Link key={m.href} href={m.href} className={t.moreCard}>
              <span className={t.moreTitle}>{m.title}</span>
              <span className={t.moreText}>{m.text}</span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
