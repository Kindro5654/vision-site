import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ARTICLES, getArticleBySlug, getAllSlugs } from '@/lib/articles';
import { SITE, asset } from '@/lib/site';
import ArticleContent from '@/components/ArticleContent';
import Footer from '@/components/Footer';
import StickyCTA from '@/components/StickyCTA';

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const a = getArticleBySlug(params.slug);
  if (!a) return {};
  const url = `${SITE.url}/blog/${a.slug}/`;
  return {
    title: a.title,
    description: a.description,
    keywords: a.keywords,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      locale: SITE.locale,
      url,
      title: a.title,
      description: a.description,
      publishedTime: a.publishedAt,
      modifiedTime: a.updatedAt ?? a.publishedAt,
      images: [{ url: a.cover, width: 1200, height: 630, alt: a.coverAlt }],
      siteName: SITE.name,
    },
    twitter: {
      card: 'summary_large_image',
      title: a.title,
      description: a.description,
      images: [a.cover],
    },
  };
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const a = getArticleBySlug(params.slug);
  if (!a) notFound();

  const url = `${SITE.url}/blog/${a.slug}/`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: a.title,
    description: a.description,
    image: `${SITE.url}${a.cover}`,
    datePublished: a.publishedAt,
    dateModified: a.updatedAt ?? a.publishedAt,
    author: { '@type': 'Organization', name: SITE.name, url: SITE.url },
    publisher: {
      '@type': 'Organization',
      name: SITE.name,
      logo: { '@type': 'ImageObject', url: `${SITE.url}/assets/logo-vision.png` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    keywords: a.keywords.join(', '),
    articleSection: a.category,
    inLanguage: 'ru-RU',
  };

  const faqBlock = a.body.find((b): b is Extract<typeof a.body[number], { type: 'faq' }> => b.type === 'faq');
  const faqLd = faqBlock
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqBlock.items.map((it) => ({
          '@type': 'Question',
          name: it.q,
          acceptedAnswer: { '@type': 'Answer', text: it.a },
        })),
      }
    : null;

  const breadcrumbsLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Главная', item: SITE.url },
      { '@type': 'ListItem', position: 2, name: 'Блог', item: `${SITE.url}/blog/` },
      { '@type': 'ListItem', position: 3, name: a.title, item: url },
    ],
  };

  const related = (a.relatedSlugs ?? [])
    .map((slug) => ARTICLES.find((x) => x.slug === slug))
    .filter(Boolean) as typeof ARTICLES;

  const pubDate = new Date(a.publishedAt).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <main style={{ background: 'var(--bg)', color: 'var(--text)', width: '100%' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {faqLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsLd) }}
      />

      <ArticleHeader />

      <article className="article-root">
        <div className="article-inner">
          <nav aria-label="Хлебные крошки" className="crumbs">
            <Link href="/">Главная</Link>
            <span aria-hidden>·</span>
            <Link href="/#blog">Блог</Link>
            <span aria-hidden>·</span>
            <span aria-current="page">{a.category}</span>
          </nav>

          <div className="article-meta">
            <span className="article-read">{a.readingTime}</span>
            <span aria-hidden>·</span>
            <time dateTime={a.publishedAt}>{pubDate}</time>
            <span aria-hidden>·</span>
            <span>{a.category}</span>
          </div>

          <h1 className="osw article-title">{a.title}</h1>

          <p className="article-lead">{a.intro}</p>

          <div className="article-cover">
            <Image
              src={asset(a.cover)}
              alt={a.coverAlt}
              width={1600}
              height={900}
              priority
              sizes="(max-width: 820px) 100vw, 900px"
              style={{ width: '100%', height: 'auto', display: 'block', borderRadius: 18 }}
            />
          </div>

          <aside className="article-toc" aria-label="Содержание">
            <div className="article-toc-title osw">Содержание</div>
            <ol>
              {a.toc.map((it) => (
                <li key={it.id}>
                  <a href={`#${it.id}`}>{it.label}</a>
                </li>
              ))}
            </ol>
          </aside>

          <ArticleContent blocks={a.body} />

          <aside className="article-cta">
            <div>
              <div className="osw article-cta-title">
                Хотите обсудить это внутри Vision Club?
              </div>
              <p>
                Резиденты клуба — 220+ ТОП-предпринимателей в Дубае и 1200 партнёров через
                международный Alliance. Оставьте заявку — менеджер клуба свяжется с вами.
              </p>
            </div>
            <Link href="/#apply" className="vc-cta osw article-cta-btn">
              Оставить заявку →
            </Link>
          </aside>

          {related.length > 0 && (
            <section className="article-related">
              <h2 className="osw">Читайте также</h2>
              <ul>
                {related.map((r) => (
                  <li key={r.slug}>
                    <Link href={`/blog/${r.slug}/`}>
                      <div className="article-related-cover">
                        <Image
                          src={asset(r.cover)}
                          alt={r.coverAlt}
                          fill
                          sizes="(max-width: 820px) 100vw, 400px"
                          style={{ objectFit: 'cover' }}
                        />
                      </div>
                      <div className="article-related-meta">
                        <span>{r.readingTime}</span>
                        <span aria-hidden>·</span>
                        <span>{r.category}</span>
                      </div>
                      <div className="osw article-related-title">{r.title}</div>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section className="article-site-links">
            <h2 className="osw">Больше о Vision Club</h2>
            <ul>
              <li>
                <Link href="/klubnyi-dom/">
                  <strong>Клубный дом в Дубае</strong>
                  <span>Адрес, как добраться и что внутри — приватное пространство клуба в Dubai Internet City.</span>
                </Link>
              </li>
              <li>
                <Link href="/#residents">
                  <strong>Резиденты Vision</strong>
                  <span>220+ ТОП-предпринимателей в Дубае — кто уже в клубе.</span>
                </Link>
              </li>
              <li>
                <Link href="/#alliance">
                  <strong>Международный Альянс клубов</strong>
                  <span>Vision — часть сети из 10 клубов в 10 странах: США, Европа, Ближний Восток, Азия.</span>
                </Link>
              </li>
              <li>
                <Link href="/#apply">
                  <strong>Подать заявку в клуб</strong>
                  <span>Оставьте контакты — менеджер клуба свяжется, расскажет об условиях и пригласит на встречу.</span>
                </Link>
              </li>
            </ul>
          </section>

          <div className="article-bottom-link">
            <Link href="/#blog">← Все статьи блога</Link>
          </div>
        </div>
      </article>

      <Footer />
      <StickyCTA />
    </main>
  );
}

function ArticleHeader() {
  return (
    <header className="article-page-head">
      <div className="article-page-head-inner">
        <Link href="/" className="article-page-brand">
          <Image
            src={asset('/assets/logo-vision.png')}
            alt="Vision Club"
            width={110}
            height={24}
            priority
            style={{ height: 24, width: 'auto' }}
          />
        </Link>
        <Link href="/#apply" className="vc-cta osw article-page-cta">
          Оставить заявку
        </Link>
      </div>
    </header>
  );
}
