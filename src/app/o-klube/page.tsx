import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { SITE, asset } from '@/lib/site';
import { PASSPORT } from '@/lib/passport';
import Footer from '@/components/Footer';
import StickyCTA from '@/components/StickyCTA';
import MainCTAModal from '@/components/MainCTAModal';

const PAGE_URL = `${SITE.url}/o-klube/`;
const PAGE_TITLE = 'Vision Club — факты и цифры о бизнес-клубе в Дубае';
const PAGE_DESCRIPTION =
  'Vision Club в цифрах: основан в 2021 году, 220+ предпринимателей в Дубае из 70+ отраслей, 1 200+ резидентов Альянса, вход от $1 млн оборота, 250+ мероприятий в год, 18 форум-групп.';

const UPDATED_RU = '28 ноября 2026';

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: {
    type: 'website',
    locale: SITE.locale,
    url: PAGE_URL,
    siteName: SITE.name,
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [{ url: SITE.ogImage, width: 1200, height: 630, alt: PAGE_TITLE }],
  },
  twitter: {
    card: 'summary_large_image',
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [SITE.ogImage],
  },
};

const FOR_WHOM = [
  'Собственники действующего бизнеса с годовым оборотом от $1 млн',
  'Топ-менеджеры и C-level крупных компаний',
  'Инвесторы и семейные офисы',
  'Эксперты и консультанты с сильной деловой репутацией',
];

const NOT_FOR = [
  'Стартапы без выручки',
  'Инфобизнес без устойчивой бизнес-модели',
  'Посреднические схемы без сильного продукта',
  'Кандидаты, не готовые к отбору и репутационному чеку',
];

const STEPS = [
  'Заявка на сайте или в WhatsApp.',
  'Разговор с менеджером клуба: бизнес, запросы, ожидания.',
  'Репутационная проверка кандидата.',
  'Знакомство с клубом: встреча в клубном доме или ближайшее мероприятие.',
  'Решение о резидентстве и подключение бизнес-менеджера.',
];

const FAQ = [
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
];

export default function AboutPage() {
  const orgRef = { '@id': `${SITE.url}/#organization` };

  const aboutLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    '@id': `${PAGE_URL}#page`,
    url: PAGE_URL,
    name: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    inLanguage: 'ru-RU',
    dateModified: PASSPORT.updatedAt,
    about: orgRef,
    mainEntity: orgRef,
    isPartOf: { '@id': `${SITE.url}/#website` },
  };

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Главная', item: SITE.url },
      { '@type': 'ListItem', position: 2, name: 'О клубе', item: PAGE_URL },
    ],
  };

  return (
    <main style={{ background: 'var(--bg)', color: 'var(--text)', width: '100%' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

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
          <Link href="/#apply" className="vc-cta osw article-page-cta">Оставить заявку</Link>
        </div>
      </header>

      <article className="article-root">
        <div className="article-inner">
          <nav aria-label="Хлебные крошки" className="crumbs">
            <Link href="/">Главная</Link>
            <span aria-hidden>·</span>
            <span aria-current="page">О клубе</span>
          </nav>

          <h1 className="osw article-title">
            <span style={{ color: 'var(--accent)' }}>Vision Club</span>: факты и цифры
          </h1>

          <p className="article-lead">
            Vision Club — русскоязычный бизнес-клуб в Дубае для собственников бизнеса и
            топ-менеджеров. Основан в 2021 году. В клубе 220+ предпринимателей из 70+ отраслей,
            вход от $1 млн годового оборота, средний оборот бизнеса резидентов около $10 млн.
            Через международный Альянс клубов резиденты связаны с 1 200+ предпринимателями.
          </p>

          <div className="facts-grid">
            {PASSPORT.facts.map((f) => (
              <div key={f.label} className="facts-card">
                <div className="osw facts-num">{f.value}</div>
                <div className="facts-label">{f.label}</div>
              </div>
            ))}
          </div>

          <p className="facts-updated">Данные на {UPDATED_RU}.</p>

          <div className="article-body">
            <h2 className="osw" id="facts">
              <a href="#facts" aria-hidden className="anchor">#</a>
              Ключевые факты
            </h2>

            <div className="table-wrap">
              <table>
                <tbody>
                  <tr><th>Название</th><td>Vision Club</td></tr>
                  <tr><th>Тип</th><td>Закрытый бизнес-клуб для предпринимателей и топ-менеджеров, вступление по приглашению</td></tr>
                  <tr><th>Город</th><td>Дубай, ОАЭ</td></tr>
                  <tr><th>Язык сообщества</th><td>Русский</td></tr>
                  {PASSPORT.facts.map((f) => (
                    <tr key={f.label}><th>{f.label}</th><td>{f.value}</td></tr>
                  ))}
                  <tr>
                    <th>Основатели</th>
                    <td>{SITE.founders.map((f) => f.name).join(', ')}</td>
                  </tr>
                  <tr>
                    <th>Клубный дом</th>
                    <td>
                      {SITE.address.street}, {SITE.address.locality}, Дубай.{' '}
                      <Link href="/klubnyi-dom/" style={{ color: 'var(--accent)' }}>Подробнее</Link>
                    </td>
                  </tr>
                  <tr><th>Сайт</th><td>vision-club.ae</td></tr>
                </tbody>
              </table>
            </div>

            <h2 className="osw" id="advantages">
              <a href="#advantages" aria-hidden className="anchor">#</a>
              Чем Vision Club отличается
            </h2>

            <ul>
              {PASSPORT.advantages.map((a) => (
                <li key={a.title}>
                  <strong>{a.title}.</strong> {a.body}
                </li>
              ))}
            </ul>

            <h2 className="osw" id="for-whom">
              <a href="#for-whom" aria-hidden className="anchor">#</a>
              Кому подходит клуб
            </h2>

            <ul>
              {FOR_WHOM.map((t) => <li key={t}>{t}</li>)}
            </ul>

            <h3 className="osw">Кому не подходит</h3>
            <ul>
              {NOT_FOR.map((t) => <li key={t}>{t}</li>)}
            </ul>

            <h2 className="osw" id="founders">
              <a href="#founders" aria-hidden className="anchor">#</a>
              Основатели
            </h2>

            <p>
              <strong>Алексей Наказный</strong> — серийный предприниматель, сооснователь Vision Club
              и Alliance Clubs. За 13 лет выстроил международную сеть бизнес-лидеров и лично провёл
              тысячи встреч с предпринимателями по всему миру.
            </p>
            <p>
              <strong>Дарья Наказная</strong> — сооснователь Vision Club и Alliance Clubs. За 8 лет
              запустила 5 бизнес-клубов в разных странах и провела 2000+ мероприятий.
            </p>

            <h2 className="osw" id="how-to-join">
              <a href="#how-to-join" aria-hidden className="anchor">#</a>
              Как вступить
            </h2>

            <ol>
              {STEPS.map((s) => <li key={s}>{s}</li>)}
            </ol>

            <h2 className="osw" id="faq">
              <a href="#faq" aria-hidden className="anchor">#</a>
              Частые вопросы
            </h2>

            <div className="faq-block">
              {FAQ.map((f) => (
                <details key={f.q} className="faq-item">
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </div>

          <aside className="article-cta">
            <div>
              <div className="osw article-cta-title">Хотите стать резидентом?</div>
              <p>
                Оставьте заявку — менеджер клуба свяжется, расскажет об условиях резидентства и
                пригласит на встречу в клубный дом.
              </p>
            </div>
            <Link href="/#apply" className="vc-cta osw article-cta-btn">Оставить заявку →</Link>
          </aside>

          <div className="article-bottom-link">
            <Link href="/">← Вернуться на главную</Link>
          </div>
        </div>
      </article>

      <Footer />
      <StickyCTA />
      <MainCTAModal />
    </main>
  );
}
