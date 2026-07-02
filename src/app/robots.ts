import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/site';

// AI crawlers explicitly welcomed — some default to Disallow otherwise.
const AI_BOTS = [
  'GPTBot',           // OpenAI
  'ChatGPT-User',     // OpenAI (on-demand)
  'OAI-SearchBot',    // OpenAI SearchGPT
  'ClaudeBot',        // Anthropic training
  'Claude-Web',       // Anthropic web fetching
  'anthropic-ai',     // Anthropic legacy
  'PerplexityBot',    // Perplexity crawler
  'Perplexity-User',  // Perplexity on-demand
  'Google-Extended',  // Google Gemini training
  'Applebot-Extended',// Apple Intelligence
  'CCBot',            // Common Crawl (feeds many LLMs)
  'YouBot',           // You.com
  'MistralAI-User',   // Mistral on-demand
  'DuckAssistBot',    // DuckDuckGo AI
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/' },
      ...AI_BOTS.map((userAgent) => ({ userAgent, allow: '/' })),
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
