import { Fragment, type ReactNode } from 'react';
import type { Block } from '@/lib/articles';

export default function ArticleContent({ blocks }: { blocks: Block[] }) {
  return (
    <div className="article-body">
      {blocks.map((b, i) => (
        <BlockRender key={i} block={b} />
      ))}
    </div>
  );
}

function BlockRender({ block }: { block: Block }) {
  switch (block.type) {
    case 'p':
      return <p>{inline(block.text)}</p>;
    case 'h2':
      return (
        <h2 id={block.id} className="osw">
          <a href={`#${block.id}`} aria-hidden className="anchor">#</a>
          {block.text}
        </h2>
      );
    case 'h3':
      return (
        <h3 id={block.id} className="osw">
          {block.text}
        </h3>
      );
    case 'ul':
      return (
        <ul>
          {block.items.map((it, i) => (
            <li key={i}>{inline(it)}</li>
          ))}
        </ul>
      );
    case 'ol':
      return (
        <ol>
          {block.items.map((it, i) => (
            <li key={i}>{inline(it)}</li>
          ))}
        </ol>
      );
    case 'quote':
      return (
        <figure className="pull-quote">
          <blockquote>{block.text}</blockquote>
          {block.author && <figcaption>— {block.author}</figcaption>}
        </figure>
      );
    case 'table':
      return (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                {block.headers.map((h, i) => (
                  <th key={i}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, i) => (
                <tr key={i}>
                  {row.map((c, j) => (
                    <td key={j}>{inline(c)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case 'callout':
      return (
        <aside className={`callout callout-${block.variant}`}>
          <p>{block.text}</p>
        </aside>
      );
    case 'faq':
      return (
        <div className="faq-block">
          {block.items.map((it, i) => (
            <details key={i} className="faq-item">
              <summary>{it.q}</summary>
              <p>{it.a}</p>
            </details>
          ))}
        </div>
      );
  }
}

// Split on **bold** into React text + <strong> nodes. No HTML injection possible.
function inline(s: string): ReactNode {
  const parts = s.split(/(\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((p, i) =>
        p.startsWith('**') && p.endsWith('**') ? (
          <strong key={i}>{p.slice(2, -2)}</strong>
        ) : (
          <Fragment key={i}>{p}</Fragment>
        )
      )}
    </>
  );
}
