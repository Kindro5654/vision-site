import Link from 'next/link';
import Image from 'next/image';
import { asset } from '@/lib/site';
import LangSwitch from '@/components/LangSwitch';
import { anchor, href, type Lang, type PageKey } from '@/lib/i18n';

// Компактная липкая шапка внутренних страниц (Клубный дом, О клубе): логотип, RU / EN, заявка.
export default function ArticlePageHeader({ lang, page }: { lang: Lang; page: PageKey }) {
  return (
    <header className="article-page-head">
      <div className="article-page-head-inner">
        <Link href={href('home', lang)} className="article-page-brand">
          <Image
            src={asset('/assets/logo-vision.png')}
            alt="Vision Club"
            width={110}
            height={24}
            priority
            style={{ height: 24, width: 'auto' }}
          />
        </Link>
        <div className="article-page-head-right">
          <LangSwitch lang={lang} page={page} />
          <Link href={anchor(lang, 'apply')} className="vc-cta osw article-page-cta">
            {lang === 'en' ? 'Apply' : 'Оставить заявку'}
          </Link>
        </div>
      </div>
    </header>
  );
}
