import { href, type Lang, type PageKey } from '@/lib/i18n';

// Переключатель RU / EN. Обычные <a>: у русской и английской версий разные
// корневые layout'ы (<html lang>), поэтому переход — полная загрузка страницы.
export default function LangSwitch({
  lang,
  page = 'home',
  className,
}: {
  lang: Lang;
  page?: PageKey;
  className?: string;
}) {
  const items: { code: Lang; label: string; title: string }[] = [
    { code: 'ru', label: 'RU', title: lang === 'en' ? 'Switch to Russian' : 'Русская версия' },
    { code: 'en', label: 'EN', title: lang === 'en' ? 'English version' : 'Английская версия' },
  ];
  return (
    // div, не nav: в шапке главной CSS прячет nav на мобиле, а переключатель должен остаться.
    <div
      role="group"
      aria-label={lang === 'en' ? 'Language' : 'Язык'}
      className={`vc-lang osw${className ? ` ${className}` : ''}`}
    >
      {items.map((it, i) => (
        <span key={it.code} style={{ display: 'contents' }}>
          {i > 0 && (
            <span aria-hidden className="vc-lang-sep">
              /
            </span>
          )}
          {it.code === lang ? (
            <span className="vc-lang-item active" aria-current="true">
              {it.label}
            </span>
          ) : (
            <a
              href={href(page, it.code)}
              hrefLang={it.code}
              lang={it.code}
              title={it.title}
              data-lang-choice={it.code}
              className="vc-lang-item"
            >
              {it.label}
            </a>
          )}
        </span>
      ))}
    </div>
  );
}
