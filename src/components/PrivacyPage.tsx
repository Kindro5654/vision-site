import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE } from '@/lib/site';
import Footer from '@/components/Footer';
import ArticlePageHeader from '@/components/ArticlePageHeader';
import { alternatesFor, href, OG_LOCALE, type Lang } from '@/lib/i18n';

// Политика конфиденциальности: /privacy/ (ru) и /en/privacy/ (en) — один компонент, два текста.

const L = SITE.legal;

const COPY = {
  ru: {
    title: 'Политика конфиденциальности — Vision Club',
    description:
      'Как Vision Club FZCO собирает, использует и защищает персональные данные пользователей сайта vision-club.ae и мобильного приложения Vision Club.',
    crumbsAria: 'Хлебные крошки',
    home: 'Главная',
    h1: 'Политика конфиденциальности',
    updated: 'Редакция от 25 ноября 2026 г.',
    back: '← Вернуться на главную',
  },
  en: {
    title: 'Privacy Policy — Vision Club',
    description:
      'How Vision Club FZCO collects, uses and protects the personal data of people who use the vision-club.ae website and the Vision Club mobile app.',
    crumbsAria: 'Breadcrumb',
    home: 'Home',
    h1: 'Privacy Policy',
    updated: 'Last updated: 25 November 2026',
    back: '← Back to the home page',
  },
} as const;

export function privacyMetadata(lang: Lang): Metadata {
  const t = COPY[lang];
  // <title> = h1: « · Vision Club» дописывает шаблон корневого layout. В og/twitter — полное название.
  return {
    title: t.h1,
    description: t.description,
    alternates: alternatesFor('privacy', lang),
    openGraph: {
      type: 'website',
      locale: OG_LOCALE[lang],
      url: `${SITE.url}${href('privacy', lang)}`,
      siteName: SITE.name,
      title: t.title,
      description: t.description,
    },
    twitter: { card: 'summary', title: t.title, description: t.description },
  };
}

const mail = <a href={`mailto:${L.email}`}>{L.email}</a>;

function BodyRu() {
  return (
    <div className="article-body">
      <h2>1. Кто обрабатывает данные</h2>
      <p>
        Оператор персональных данных: <strong>{L.name}</strong>, {L.address}. Политика
        действует для сайта vision-club.ae, его поддоменов и мобильного приложения Vision
        Club для iOS и Android (вместе: «Сервисы»). По вопросам о данных пишите на{' '}
        {mail} или звоните {L.phone}.
      </p>

      <h2>2. Какие данные мы собираем</h2>
      <ul>
        <li>
          <strong>Данные из форм заявки:</strong> имя и фамилия, телефон, e-mail (если
          указан), должность и оборот бизнеса.
        </li>
        <li>
          <strong>Данные аккаунта в приложении:</strong> имя, телефон, e-mail, компания,
          сфера деятельности, фото профиля и другие сведения, которые вы добавляете в
          профиль сами.
        </li>
        <li>
          <strong>Технические данные:</strong> тип устройства и браузера, IP-адрес, страницы
          и разделы, метки рекламных кампаний (UTM), обезличенный идентификатор посетителя,
          токен push-уведомлений в приложении.
        </li>
        <li>
          <strong>Переписка:</strong> сообщения, которые вы отправляете нам в Telegram,
          WhatsApp или по почте.
        </li>
      </ul>

      <h2>3. Зачем мы их используем</h2>
      <ul>
        <li>связаться с вами по заявке и рассказать об условиях резидентства;</li>
        <li>вести аккаунт резидента и показывать ему мероприятия, резидентов и сервисы клуба;</li>
        <li>отправлять уведомления о встречах и событиях клуба;</li>
        <li>понимать, откуда приходят заявки, и улучшать сайт и приложение;</li>
        <li>выполнять требования законодательства ОАЭ.</li>
      </ul>
      <p>Мы не продаём персональные данные и не передаём их для чужой рекламы.</p>

      <h2>4. Cookies и аналитика</h2>
      <p>
        Сайт использует Meta Pixel (Meta Platforms, Inc.), чтобы считать посещения и заявки с
        рекламы, и локальное хранилище браузера для меток кампаний (до 30 дней) и
        обезличенного идентификатора посетителя. Вы можете удалить cookies и данные сайта в
        настройках браузера или заблокировать их.
      </p>

      <h2>5. Кому мы передаём данные</h2>
      <p>
        Только подрядчикам, которые помогают работать Сервисам: хостинг и серверы,
        CRM-система клуба, сервисы рассылки уведомлений, Meta (для статистики рекламы),
        Apple и Google (для работы приложения в их магазинах). Подрядчики получают только
        нужные им данные. Мы также раскрываем данные, если этого требует закон.
      </p>

      <h2>6. Хранение и защита</h2>
      <p>
        Данные хранятся, пока вы пользуетесь Сервисами или пока это нужно для целей выше
        и требований закона. Доступ к ним есть только у сотрудников клуба, которым он нужен
        по работе. Передача данных защищена шифрованием (HTTPS).
      </p>

      <h2>7. Ваши права и удаление аккаунта</h2>
      <p>
        Вы можете запросить копию своих данных, исправить их, отозвать согласие или удалить
        данные и аккаунт в приложении. Для этого напишите на {mail} с телефона или почты,
        привязанных к аккаунту. Мы ответим в течение 30 дней. После удаления аккаунта данные
        профиля удаляются, кроме тех, что мы обязаны хранить по закону.
      </p>

      <h2>8. Дети</h2>
      <p>Сервисы предназначены для взрослых. Мы не собираем данные лиц младше 18 лет.</p>

      <h2>9. Изменения политики</h2>
      <p>
        Мы можем обновлять эту политику. Новая редакция публикуется на этой странице с датой
        обновления.
      </p>
    </div>
  );
}

function BodyEn() {
  return (
    <div className="article-body">
      <h2>1. Who is responsible for your data</h2>
      <p>
        The controller of your personal data is <strong>{L.name}</strong>, {L.address}. This
        policy applies to the vision-club.ae website, its subdomains and the Vision Club
        mobile app for iOS and Android (together, the &ldquo;Services&rdquo;). If you have
        any questions about your data, please email {mail} or call {L.phone}.
      </p>

      <h2>2. The data we collect</h2>
      <ul>
        <li>
          <strong>Application form data:</strong> your first name and surname, phone number,
          email address (if provided), job title and business turnover.
        </li>
        <li>
          <strong>App account data:</strong> your name, phone number, email address, company,
          industry, profile photo and any other information you choose to add to your
          profile.
        </li>
        <li>
          <strong>Technical data:</strong> device and browser type, IP address, the pages and
          sections you visit, advertising campaign tags (UTM), a pseudonymised visitor
          identifier and, in the app, a push notification token.
        </li>
        <li>
          <strong>Correspondence:</strong> messages you send us via Telegram, WhatsApp or
          email.
        </li>
      </ul>

      <h2>3. How we use your data</h2>
      <ul>
        <li>to contact you about your application and explain the terms of membership;</li>
        <li>
          to manage your member account and show you the club&rsquo;s events, members and
          services;
        </li>
        <li>to send you notifications about club meetings and events;</li>
        <li>to understand where applications come from and to improve the website and the app;</li>
        <li>to comply with the laws of the UAE.</li>
      </ul>
      <p>
        We do not sell personal data, nor do we share it with third parties for their own
        advertising.
      </p>

      <h2>4. Cookies and analytics</h2>
      <p>
        The website uses Meta Pixel (Meta Platforms, Inc.) to measure visits and applications
        that come from our advertising. It also uses your browser&rsquo;s local storage to keep
        campaign tags (for up to 30 days) and a pseudonymised visitor identifier. You can
        delete or block cookies and site data in your browser settings.
      </p>

      <h2>5. Who we share your data with</h2>
      <p>
        We share data only with service providers who help us run the Services: hosting and
        server providers, the club&rsquo;s CRM system, notification delivery services, Meta
        (for advertising statistics), and Apple and Google (so that the app can be offered in
        their stores). Each provider receives only the data it needs. We will also disclose
        data where the law requires us to do so.
      </p>

      <h2>6. Retention and security</h2>
      <p>
        We keep your data for as long as you use the Services, or for as long as it is needed
        for the purposes set out above and to meet legal requirements. Access is restricted to
        club staff who need it for their work. Data is encrypted in transit (HTTPS).
      </p>

      <h2>7. Your rights and deleting your account</h2>
      <p>
        You may ask us for a copy of your data, ask us to correct it, withdraw your consent,
        or have your data and app account deleted. To do so, email {mail} from the phone
        number or email address linked to your account. We will reply within 30 days. Once
        your account is deleted, your profile data is erased, except for any data we are
        required by law to keep.
      </p>

      <h2>8. Children</h2>
      <p>
        The Services are intended for adults. We do not collect data from anyone under the age
        of 18.
      </p>

      <h2>9. Changes to this policy</h2>
      <p>
        We may update this policy. Each new version is published on this page with the date
        it was updated.
      </p>
    </div>
  );
}

export default function PrivacyPage({ lang = 'ru' }: { lang?: Lang }) {
  const t = COPY[lang];
  return (
    <main style={{ background: 'var(--bg)', color: 'var(--text)', width: '100%' }}>
      <ArticlePageHeader lang={lang} page="privacy" />

      <article className="article-root">
        <div className="article-inner">
          <nav aria-label={t.crumbsAria} className="crumbs">
            <Link href={href('home', lang)}>{t.home}</Link>
            <span aria-hidden>·</span>
            <span aria-current="page">{t.h1}</span>
          </nav>

          <h1 className="osw article-title">{t.h1}</h1>
          <p className="article-lead">{t.updated}</p>

          {lang === 'en' ? <BodyEn /> : <BodyRu />}

          <div className="article-bottom-link">
            <Link href={href('home', lang)}>{t.back}</Link>
          </div>
        </div>
      </article>

      <Footer lang={lang} page="privacy" />
    </main>
  );
}
