import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { SITE, asset } from '@/lib/site';
import Footer from '@/components/Footer';

const PAGE_URL = `${SITE.url}/privacy/`;
const PAGE_TITLE = 'Политика конфиденциальности — Vision Club';
const PAGE_DESCRIPTION =
  'Как Vision Club FZCO собирает, использует и защищает персональные данные пользователей сайта vision-club.ae и мобильного приложения Vision Club.';
const UPDATED_RU = '25 ноября 2026 г.';
const UPDATED_EN = 'November 25, 2026';

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
  },
};

const L = SITE.legal;

export default function PrivacyPage() {
  return (
    <main style={{ background: 'var(--bg)', color: 'var(--text)', width: '100%' }}>
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
          <a href="#en" className="vc-flink" style={{ color: 'var(--muted)', fontSize: 15 }}>
            English version
          </a>
        </div>
      </header>

      <article className="article-root">
        <div className="article-inner">
          <nav aria-label="Хлебные крошки" className="crumbs">
            <Link href="/">Главная</Link>
            <span aria-hidden>·</span>
            <span aria-current="page">Политика конфиденциальности</span>
          </nav>

          <h1 className="osw article-title">Политика конфиденциальности</h1>
          <p className="article-lead">Редакция от {UPDATED_RU}</p>

          <div className="article-body">
            <h2>1. Кто обрабатывает данные</h2>
            <p>
              Оператор персональных данных: <strong>{L.name}</strong>, {L.address}. Политика
              действует для сайта vision-club.ae, его поддоменов и мобильного приложения Vision
              Club для iOS и Android (вместе: «Сервисы»). По вопросам о данных пишите на{' '}
              <a href={`mailto:${L.email}`}>{L.email}</a> или звоните {L.phone}.
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
              данные и аккаунт в приложении. Для этого напишите на{' '}
              <a href={`mailto:${L.email}`}>{L.email}</a> с телефона или почты, привязанных к
              аккаунту. Мы ответим в течение 30 дней. После удаления аккаунта данные профиля
              удаляются, кроме тех, что мы обязаны хранить по закону.
            </p>

            <h2>8. Дети</h2>
            <p>Сервисы предназначены для взрослых. Мы не собираем данные лиц младше 18 лет.</p>

            <h2>9. Изменения политики</h2>
            <p>
              Мы можем обновлять эту политику. Новая редакция публикуется на этой странице с датой
              обновления.
            </p>
          </div>

          <div id="en" className="article-body" style={{ marginTop: 72, paddingTop: 40, borderTop: '1px solid var(--line)' }}>
            <h2 style={{ marginTop: 0 }}>Privacy Policy (English)</h2>
            <p>Last updated: {UPDATED_EN}</p>

            <h3>1. Who we are</h3>
            <p>
              The data controller is <strong>{L.name}</strong>, {L.address}. This policy covers the
              website vision-club.ae, its subdomains and the Vision Club mobile app for iOS and
              Android (the &ldquo;Services&rdquo;). Contact: <a href={`mailto:${L.email}`}>{L.email}</a>,{' '}
              {L.phone}.
            </p>

            <h3>2. Data we collect</h3>
            <ul>
              <li>
                <strong>Application forms:</strong> full name, phone number, email (optional),
                position and company revenue range.
              </li>
              <li>
                <strong>App account:</strong> name, phone, email, company, industry, profile photo
                and any other details you add to your profile.
              </li>
              <li>
                <strong>Technical data:</strong> device and browser type, IP address, pages viewed,
                campaign tags (UTM), a pseudonymous visitor ID, push notification token.
              </li>
              <li>
                <strong>Communications:</strong> messages you send us via Telegram, WhatsApp or email.
              </li>
            </ul>

            <h3>3. How we use it</h3>
            <ul>
              <li>to respond to your application and explain membership terms;</li>
              <li>to run your member account and show club events, members and services;</li>
              <li>to send notifications about club meetings and events;</li>
              <li>to understand where applications come from and improve the Services;</li>
              <li>to comply with UAE law.</li>
            </ul>
            <p>We do not sell personal data or share it for third-party advertising.</p>

            <h3>4. Cookies and analytics</h3>
            <p>
              The website uses Meta Pixel (Meta Platforms, Inc.) to measure visits and ad-driven
              applications, and browser local storage for campaign tags (up to 30 days) and a
              pseudonymous visitor ID. You can clear or block them in your browser settings.
            </p>

            <h3>5. Sharing</h3>
            <p>
              We share data only with service providers that help run the Services: hosting,
              the club CRM, notification delivery, Meta (ad measurement), Apple and Google (app
              distribution). They receive only the data they need. We may disclose data where
              required by law.
            </p>

            <h3>6. Retention and security</h3>
            <p>
              We keep data while you use the Services or as long as needed for the purposes above
              and legal obligations. Access is limited to club staff who need it. Data in transit
              is encrypted (HTTPS).
            </p>

            <h3>7. Your rights and account deletion</h3>
            <p>
              You may request a copy of your data, correct it, withdraw consent, or delete your
              data and app account by emailing <a href={`mailto:${L.email}`}>{L.email}</a> from
              the phone number or email linked to your account. We respond within 30 days. When
              an account is deleted, profile data is erased except where we must keep it by law.
            </p>

            <h3>8. Children</h3>
            <p>The Services are intended for adults. We do not knowingly collect data from anyone under 18.</p>

            <h3>9. Changes</h3>
            <p>We may update this policy. The current version is always published on this page with its date.</p>
          </div>

          <div className="article-bottom-link">
            <Link href="/">← Вернуться на главную</Link>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  );
}
