import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE } from '@/lib/site';
import { PASSPORT } from '@/lib/passport';
import Footer from '@/components/Footer';
import StickyCTA from '@/components/StickyCTA';
import MainCTAModal from '@/components/MainCTAModal';
import ArticlePageHeader from '@/components/ArticlePageHeader';
import { alternatesFor, anchor, href, OG_LOCALE, SCHEMA_LANG, type Lang } from '@/lib/i18n';

// Страница «О клубе / Факты и цифры»: /o-klube/ (ru) и /en/about/ (en).
// Разметка общая, тексты — в COPY, цифры — из PASSPORT. Новый дизайн /o-klube/
// переносится сюда один раз и сразу работает на обоих языках.

const COPY = {
  ru: {
    title: 'Vision Club — факты и цифры о бизнес-клубе в Дубае',
    description:
      'Vision Club в цифрах: основан в 2021 году, 220+ предпринимателей в Дубае из 70+ отраслей, 1 200+ резидентов Альянса, вход от $1 млн оборота, 250+ мероприятий в год, 18 форум-групп.',
    updated: '28 ноября 2026',
    forWhom: [
      'Собственники действующего бизнеса с годовым оборотом от $1 млн',
      'Топ-менеджеры и C-level крупных компаний',
      'Инвесторы и семейные офисы',
      'Эксперты и консультанты с сильной деловой репутацией',
    ],
    notFor: [
      'Стартапы без выручки',
      'Инфобизнес без устойчивой бизнес-модели',
      'Посреднические схемы без сильного продукта',
      'Кандидаты, не готовые к отбору и репутационному чеку',
    ],
    steps: [
      'Заявка на сайте или в WhatsApp.',
      'Разговор с менеджером клуба: бизнес, запросы, ожидания.',
      'Репутационная проверка кандидата.',
      'Знакомство с клубом: встреча в клубном доме или ближайшее мероприятие.',
      'Решение о резидентстве и подключение бизнес-менеджера.',
    ],
    faq: [
      {
        q: 'Что такое Vision Club?',
        a: 'Vision Club — русскоязычный бизнес-клуб в Дубае для собственников бизнеса и топ-менеджеров. Основан в 2021 году, объединяет 220+ предпринимателей из 70+ отраслей и входит в международный Альянс клубов с 1 200+ резидентами.',
      },
      {
        q: 'Какой порог входа в Vision Club?',
        a: 'Годовой оборот бизнеса от $1 млн. Средний оборот бизнеса резидентов — около $10 млн. Для собственников с оборотом от $50 млн внутри клуба есть отдельный круг X Club.',
      },
      {
        q: 'Как вступить в Vision Club?',
        a: 'Оставить заявку на сайте, пройти разговор с менеджером и репутационную проверку, познакомиться с клубом на встрече. Вступление только по приглашению после отбора.',
      },
      {
        q: 'Vision Club — это ночной клуб?',
        a: 'Нет. Vision Club — бизнес-клуб для предпринимателей. Он не связан с ночным клубом VISION в H Hotel Dubai.',
      },
      {
        q: 'Сколько мероприятий проводит клуб?',
        a: '250+ мероприятий в год: большие встречи, 18 форум-групп, ужины, разборы бизнесов, подклубы по интересам, выезды и встречи клубов Альянса.',
      },
    ],
    home: 'Главная',
    crumb: 'О клубе',
    crumbsAria: 'Хлебные крошки',
    h1: 'факты и цифры',
    lead: 'Vision Club — русскоязычный бизнес-клуб в Дубае для собственников бизнеса и топ-менеджеров. Основан в 2021 году. В клубе 220+ предпринимателей из 70+ отраслей, вход от $1 млн годового оборота, средний оборот бизнеса резидентов около $10 млн. Через международный Альянс клубов резиденты связаны с 1 200+ предпринимателями.',
    updatedPrefix: 'Данные на',
    keyFacts: 'Ключевые факты',
    rows: {
      name: 'Название',
      type: 'Тип',
      typeValue: 'Закрытый бизнес-клуб для предпринимателей и топ-менеджеров, вступление по приглашению',
      city: 'Город',
      cityValue: 'Дубай, ОАЭ',
      language: 'Язык сообщества',
      languageValue: 'Русский',
      founders: 'Основатели',
      clubhouse: 'Клубный дом',
      clubhouseCity: 'Дубай',
      more: 'Подробнее',
      site: 'Сайт',
    },
    advantagesHead: 'Чем Vision Club отличается',
    forWhomHead: 'Кому подходит клуб',
    notForHead: 'Кому не подходит',
    foundersHead: 'Основатели',
    founders: [
      {
        name: 'Алексей Наказный',
        text: 'серийный предприниматель, сооснователь Vision Club и Alliance Clubs. За 13 лет выстроил международную сеть бизнес-лидеров и лично провёл тысячи встреч с предпринимателями по всему миру.',
      },
      {
        name: 'Дарья Наказная',
        text: 'сооснователь Vision Club и Alliance Clubs. За 8 лет запустила 5 бизнес-клубов в разных странах и провела 2000+ мероприятий.',
      },
    ],
    joinHead: 'Как вступить',
    faqHead: 'Частые вопросы',
    ctaTitle: 'Хотите стать резидентом?',
    ctaBody:
      'Оставьте заявку — менеджер клуба свяжется, расскажет об условиях резидентства и пригласит на встречу в клубный дом.',
    ctaBtn: 'Оставить заявку →',
    back: '← Вернуться на главную',
  },
  en: {
    title: 'Facts and figures about the business club in Dubai',
    description:
      'Vision Club in numbers: founded in 2021, 220+ entrepreneurs in Dubai from 70+ industries, 1,200+ members across Alliance Clubs, a $1M annual revenue threshold, 250+ events a year and 18 forum groups.',
    updated: '28 November 2026',
    forWhom: [
      'Owners of established businesses with annual revenue of $1M or more',
      'Senior executives and C-suite leaders of major companies',
      'Investors and family offices',
      'Experts and advisers with a strong business reputation',
    ],
    notFor: [
      'Pre-revenue start-ups',
      'Info-product businesses without a sustainable business model',
      'Middleman schemes without a strong product',
      'Candidates unwilling to go through selection and a reputation check',
    ],
    steps: [
      'Apply on this website or via WhatsApp.',
      'A conversation with a member of the club team about your business, needs and expectations.',
      'A reputation check.',
      'Getting to know the club: a meeting at the Clubhouse or an upcoming event.',
      'A membership decision and an introduction to your dedicated relationship manager.',
    ],
    faq: [
      {
        q: 'What is Vision Club?',
        a: 'Vision Club is a Russian-speaking business club in Dubai for business owners and senior executives. Founded in 2021, it brings together 220+ entrepreneurs from 70+ industries and is part of Alliance Clubs, an international network with 1,200+ members.',
      },
      {
        q: 'What does it take to join Vision Club?',
        a: 'Annual business revenue of $1M or more. The average member’s business turns over around $10M. For owners of businesses with revenue above $50M, the club has a separate inner circle, X Club.',
      },
      {
        q: 'How do I join Vision Club?',
        a: 'Apply on this website, have a conversation with a member of our team, pass a reputation check and get to know the club at one of our gatherings. Membership is by invitation only, following selection.',
      },
      {
        q: 'Is Vision Club a nightclub?',
        a: 'No. Vision Club is a business club for entrepreneurs. It has no connection to the VISION nightclub at H Hotel Dubai.',
      },
      {
        q: 'How many events does the club hold?',
        a: '250+ events a year: monthly gatherings, 18 forum groups, dinners, business deep dives, special-interest circles, trips and Alliance Clubs events.',
      },
    ],
    home: 'Home',
    crumb: 'About',
    crumbsAria: 'Breadcrumb',
    h1: 'facts and figures',
    lead: 'Vision Club is a Russian-speaking business club in Dubai for business owners and senior executives, founded in 2021. It has 220+ members from 70+ industries. Membership starts at $1M in annual revenue, and the average member’s business turns over around $10M. Through the international Alliance Clubs network, members are connected with 1,200+ entrepreneurs.',
    updatedPrefix: 'Data as of',
    keyFacts: 'Key facts',
    rows: {
      name: 'Name',
      type: 'Type',
      typeValue: 'Private business club for entrepreneurs and senior executives; membership by invitation',
      city: 'City',
      cityValue: 'Dubai, UAE',
      language: 'Community language',
      languageValue: 'Russian',
      founders: 'Founders',
      clubhouse: 'Clubhouse',
      clubhouseCity: 'Dubai',
      more: 'Details',
      site: 'Website',
    },
    advantagesHead: 'What sets Vision Club apart',
    forWhomHead: 'Who the club is for',
    notForHead: 'Who it is not for',
    foundersHead: 'Founders',
    founders: [
      {
        name: 'Aleksey Nakazny',
        text: 'serial entrepreneur and co-founder of Vision Club and Alliance Clubs. Over 13 years, he has built an international network of business leaders and personally met thousands of entrepreneurs around the world.',
      },
      {
        name: 'Daria Nakaznaya',
        text: 'co-founder of Vision Club and Alliance Clubs. Over 8 years, she has launched five business clubs in different countries and hosted 2,000+ events.',
      },
    ],
    joinHead: 'How to join',
    faqHead: 'Frequently asked questions',
    ctaTitle: 'Interested in membership?',
    ctaBody:
      'Submit an application and a member of our team will be in touch to explain how membership works and invite you to meet us at the Clubhouse.',
    ctaBtn: 'Apply for membership →',
    back: '← Back to the home page',
  },
};

export function aboutMetadata(lang: Lang): Metadata {
  const t = COPY[lang];
  const url = `${SITE.url}${href('about', lang)}`;
  return {
    title: t.title,
    description: t.description,
    alternates: alternatesFor('about', lang),
    openGraph: {
      type: 'website',
      locale: OG_LOCALE[lang],
      url,
      siteName: SITE.name,
      title: t.title,
      description: t.description,
      images: [{ url: SITE.ogImage, width: 1200, height: 630, alt: t.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: t.title,
      description: t.description,
      images: [SITE.ogImage],
    },
  };
}

export default function AboutPage({ lang = 'ru' }: { lang?: Lang }) {
  const t = COPY[lang];
  const en = lang === 'en';
  const PAGE_URL = `${SITE.url}${href('about', lang)}`;
  const homeUrl = en ? `${SITE.url}/en/` : SITE.url;
  const facts = PASSPORT.facts.map((f) =>
    en ? { label: f.labelEn, value: f.valueEn } : { label: f.label, value: f.value },
  );
  const advantages = PASSPORT.advantages.map((a) =>
    en ? { title: a.titleEn, body: a.bodyEn } : { title: a.title, body: a.body },
  );

  const orgRef = { '@id': `${SITE.url}/#organization` };

  const aboutLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    '@id': `${PAGE_URL}#page`,
    url: PAGE_URL,
    name: t.title,
    description: t.description,
    inLanguage: SCHEMA_LANG[lang],
    dateModified: PASSPORT.updatedAt,
    about: orgRef,
    mainEntity: orgRef,
    isPartOf: { '@id': `${SITE.url}/#website` },
  };

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    ...(en ? { inLanguage: SCHEMA_LANG.en } : {}),
    mainEntity: t.faq.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: t.home, item: homeUrl },
      { '@type': 'ListItem', position: 2, name: t.crumb, item: PAGE_URL },
    ],
  };

  return (
    <main style={{ background: 'var(--bg)', color: 'var(--text)', width: '100%' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      <ArticlePageHeader lang={lang} page="about" />

      <article className="article-root">
        <div className="article-inner">
          <nav aria-label={t.crumbsAria} className="crumbs">
            <Link href={href('home', lang)}>{t.home}</Link>
            <span aria-hidden>·</span>
            <span aria-current="page">{t.crumb}</span>
          </nav>

          <h1 className="osw article-title">
            <span style={{ color: 'var(--accent)' }}>Vision Club</span>: {t.h1}
          </h1>

          <p className="article-lead">{t.lead}</p>

          <div className="facts-grid">
            {facts.map((f) => (
              <div key={f.label} className="facts-card">
                <div className="osw facts-num">{f.value}</div>
                <div className="facts-label">{f.label}</div>
              </div>
            ))}
          </div>

          <p className="facts-updated">{t.updatedPrefix} {t.updated}.</p>

          <div className="article-body">
            <h2 className="osw" id="facts">
              <a href="#facts" aria-hidden className="anchor">#</a>
              {t.keyFacts}
            </h2>

            <div className="table-wrap">
              <table>
                <tbody>
                  <tr><th>{t.rows.name}</th><td>Vision Club</td></tr>
                  <tr><th>{t.rows.type}</th><td>{t.rows.typeValue}</td></tr>
                  <tr><th>{t.rows.city}</th><td>{t.rows.cityValue}</td></tr>
                  <tr><th>{t.rows.language}</th><td>{t.rows.languageValue}</td></tr>
                  {facts.map((f) => (
                    <tr key={f.label}><th>{f.label}</th><td>{f.value}</td></tr>
                  ))}
                  <tr>
                    <th>{t.rows.founders}</th>
                    <td>{SITE.founders.map((f) => (en ? f.nameEn : f.name)).join(', ')}</td>
                  </tr>
                  <tr>
                    <th>{t.rows.clubhouse}</th>
                    <td>
                      {SITE.address.street}, {SITE.address.locality}, {t.rows.clubhouseCity}.{' '}
                      <Link href={href('clubhouse', lang)} style={{ color: 'var(--accent)' }}>{t.rows.more}</Link>
                    </td>
                  </tr>
                  <tr><th>{t.rows.site}</th><td>vision-club.ae</td></tr>
                </tbody>
              </table>
            </div>

            <h2 className="osw" id="advantages">
              <a href="#advantages" aria-hidden className="anchor">#</a>
              {t.advantagesHead}
            </h2>

            <ul>
              {advantages.map((a) => (
                <li key={a.title}>
                  <strong>{a.title}.</strong> {a.body}
                </li>
              ))}
            </ul>

            <h2 className="osw" id="for-whom">
              <a href="#for-whom" aria-hidden className="anchor">#</a>
              {t.forWhomHead}
            </h2>

            <ul>
              {t.forWhom.map((s) => <li key={s}>{s}</li>)}
            </ul>

            <h3 className="osw">{t.notForHead}</h3>
            <ul>
              {t.notFor.map((s) => <li key={s}>{s}</li>)}
            </ul>

            <h2 className="osw" id="founders">
              <a href="#founders" aria-hidden className="anchor">#</a>
              {t.foundersHead}
            </h2>

            {t.founders.map((f) => (
              <p key={f.name}>
                <strong>{f.name}</strong> — {f.text}
              </p>
            ))}

            <h2 className="osw" id="how-to-join">
              <a href="#how-to-join" aria-hidden className="anchor">#</a>
              {t.joinHead}
            </h2>

            <ol>
              {t.steps.map((s) => <li key={s}>{s}</li>)}
            </ol>

            <h2 className="osw" id="faq">
              <a href="#faq" aria-hidden className="anchor">#</a>
              {t.faqHead}
            </h2>

            <div className="faq-block">
              {t.faq.map((f) => (
                <details key={f.q} className="faq-item">
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </div>

          <aside className="article-cta">
            <div>
              <div className="osw article-cta-title">{t.ctaTitle}</div>
              <p>{t.ctaBody}</p>
            </div>
            <Link href={anchor(lang, 'apply')} className="vc-cta osw article-cta-btn">{t.ctaBtn}</Link>
          </aside>

          <div className="article-bottom-link">
            <Link href={href('home', lang)}>{t.back}</Link>
          </div>
        </div>
      </article>

      <Footer lang={lang} page="about" />
      <StickyCTA lang={lang} />
      <MainCTAModal lang={lang} />
    </main>
  );
}
