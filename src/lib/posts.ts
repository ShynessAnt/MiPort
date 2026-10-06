import { withBase } from '@/lib/paths';
import { readingTimeMinutes } from '@/lib/readingTime';
import type { Post } from '@/types';

interface PostFrontMatter {
  title: string;
  date: string;
  category: string;
  tags: string[];
  excerpt: string;
  cover?: string;
}

const rawModules = import.meta.glob('../content/posts/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
});

function isStringArray(value: unknown): value is string[] {
  return (
    Array.isArray(value) && value.every((item) => typeof item === 'string')
  );
}

function parseDate(value: unknown): string {
  if (typeof value === 'string' && value.trim() !== '') {
    return value.trim();
  }
  if (value instanceof Date && !isNaN(value.getTime())) {
    return value.toISOString().slice(0, 10);
  }
  throw new Error('Falta la fecha en el frontmatter.');
}

function parseMarkdownRaw(raw: string): {
  attributes: Record<string, unknown>;
  content: string;
} {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) {
    return { attributes: {}, content: raw.trim() };
  }

  const [, fmText, body] = match;
  const lines = (fmText ?? '').split(/\r?\n/);
  const data: Record<string, unknown> = {};
  let currentKey: string | null = null;

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) {
      continue;
    }

    const listMatch = line.match(/^\s*-\s+(.*)$/);
    if (listMatch && currentKey) {
      const currentList = data[currentKey];
      if (!Array.isArray(currentList)) {
        data[currentKey] = [];
      }
      (data[currentKey] as string[]).push(listMatch[1]?.trim() ?? '');
      continue;
    }

    const keyValMatch = line.match(/^([a-zA-Z0-9_-]+):\s*(.*)$/);
    if (keyValMatch) {
      const key = keyValMatch[1]?.trim() ?? '';
      let val = keyValMatch[2]?.trim() ?? '';
      currentKey = key;

      if (val === '') {
        data[key] = [];
      } else {
        if (
          (val.startsWith('"') && val.endsWith('"')) ||
          (val.startsWith("'") && val.endsWith("'"))
        ) {
          val = val.slice(1, -1);
        }
        data[key] = val;
      }
    }
  }

  return { attributes: data, content: (body ?? '').trim() };
}

function parseFrontMatter(raw: unknown): PostFrontMatter {
  if (typeof raw !== 'object' || raw === null) {
    throw new Error('El frontmatter debe ser un objeto.');
  }

  const data = raw as Record<string, unknown>;
  const title = data.title;
  const date = parseDate(data.date);
  const category = data.category;
  const tags = data.tags;
  const excerpt = data.excerpt;
  const cover = data.cover;

  if (typeof title !== 'string' || title.trim() === '') {
    throw new Error('Falta el título en el frontmatter.');
  }
  if (typeof category !== 'string' || category.trim() === '') {
    throw new Error('Falta la categoría en el frontmatter.');
  }
  if (!isStringArray(tags)) {
    throw new Error('Las etiquetas deben ser una lista de textos.');
  }
  if (typeof excerpt !== 'string' || excerpt.trim() === '') {
    throw new Error('Falta el extracto en el frontmatter.');
  }
  if (cover !== undefined && typeof cover !== 'string') {
    throw new Error('La portada debe ser una ruta de texto.');
  }

  return { title, date, category, tags, excerpt, cover };
}

function slugFromPath(path: string): string {
  const fileName = path.split('/').pop() ?? 'entrada';
  return fileName.replace(/\.md$/u, '');
}

function parsePost(path: string, raw: string): Post {
  const { attributes: rawAttributes, content } = parseMarkdownRaw(raw);
  const attributes = parseFrontMatter(rawAttributes);

  return {
    slug: slugFromPath(path),
    title: attributes.title,
    date: attributes.date,
    category: attributes.category,
    tags: attributes.tags,
    excerpt: attributes.excerpt,
    cover: attributes.cover
      ? withBase(attributes.cover.replace(/^\//u, ''))
      : undefined,
    readingTimeMin: readingTimeMinutes(content),
    content,
  };
}

function loadPosts(): Post[] {
  return Object.entries(rawModules)
    .map(([path, raw]) => {
      if (typeof raw !== 'string') {
        throw new Error(`No se pudo leer ${path} como texto.`);
      }
      return parsePost(path, raw);
    })
    .sort((a, b) => b.date.localeCompare(a.date));
}

const posts = loadPosts();

export function getPosts(): Post[] {
  return posts;
}

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug);
}

export function getLatestPosts(count: number): Post[] {
  return posts.slice(0, count);
}

export function getPostCategories(): string[] {
  return [...new Set(posts.map((post) => post.category))].sort((a, b) =>
    a.localeCompare(b, 'es'),
  );
}
