# Vision Club — продакшн-сайт

Сайт международного бизнес-клуба **Vision Club** (Дубай). Премиальный тёмный лендинг.

Стек: **Next.js 14 (App Router) + React 18 + TypeScript** со статическим экспортом (`output: 'export'`). Готов к деплою на **GitHub Pages** одним пушем в `main` через GitHub Actions.

## Что внутри

- Один полный landing-page с 17 секциями (Hero → Footer)
- Интерактивный 3D-глобус Альянса клубов (canvas, без библиотек)
- Drag-слайдеры (Мероприятия, Резиденты), интерактивная кольцевая диаграмма отраслей, count-up анимации, FAQ-аккордеон, формы заявки
- Адаптивная мобильная вёрстка с брейкпоинтом 820 px и sticky CTA
- Полная SEO-разметка: meta, Open Graph, Twitter, JSON-LD (Organization), robots.txt, sitemap.xml
- Оптимизация шрифтов через `next/font` (Oswald + Golos Text, subsets ru/en, `display: swap`)
- Оптимизация картинок через `next/image` (lazy, `priority` только для hero)
- Никаких runtime-зависимостей кроме React/Next

## Запуск локально

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # статический экспорт в out/
```

## Деплой на GitHub Pages

1. Создай репозиторий на GitHub и запушь код:
   ```bash
   git init
   git add -A
   git commit -m "Vision Club site"
   git branch -M main
   git remote add origin <your-repo-url>
   git push -u origin main
   ```
2. В настройках репозитория: **Settings → Pages → Source = GitHub Actions**.
3. Workflow `.github/workflows/deploy.yml` соберёт сайт и опубликует на каждом пуше в `main`.

Workflow сам подставляет `basePath`:
- репозиторий `<user>.github.io` → корень домена
- любой другой репозиторий → `/<repo-name>`

Для собственного домена настрой **Settings → Pages → Custom domain** и положи файл `CNAME` в `public/`.

## Структура

```
src/
  app/
    layout.tsx       # Шрифты, SEO, JSON-LD
    page.tsx         # Композиция секций
    globals.css      # Дизайн-токены + все @media-правила
    sitemap.ts robots.ts
  components/
    Hero.tsx Founders.tsx Numbers.tsx ...
    Alliance.tsx     # canvas-глобус
  lib/
    site.ts          # SITE-константы и asset()
    useMounted.ts useDragSlider.ts
public/
  assets/            # Все реальные фото
  favicon.svg
```

## Контент

Тексты и фото — из исходных HTML-референсов (`reference/` исключена из репо). Если будут правки — меняй прямо в файлах секций, это просто React-массивы.

## Производительность

- Статический HTML на каждой странице (zero JS на первом байте)
- Изображения с явными `width`/`height` или `fill` + `sizes` — нет CLS
- `priority` только на hero-картинке, остальные — `loading="lazy"`
- Шрифты предзагружаются и подкачиваются с `display: swap`

## Что предстоит донастроить

- Заменить плейсхолдер видео в Clubhouse на реальный `<video>`
- Поставить OG-изображение 1200×630 (`public/og.jpg`) и обновить `SITE.ogImage`
- Прикрутить бек к формам (Hero, Join) — сейчас `preventDefault()` без отправки

---

Сделано для будущего трафика: SSG + чистый HTML + точные размеры медиа = быстрая загрузка и хороший SEO.
