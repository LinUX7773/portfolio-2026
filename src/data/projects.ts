import { getCollection } from 'astro:content';
import type { Lang } from '../i18n';

// Case studies live in src/content/projects/<lang>/<slug>.md. The same
// slug is used in both languages so the language switch can map between
// them.
export async function getProjects(lang: Lang, { includeDrafts = false } = {}) {
  const entries = await getCollection(
    'projects',
    ({ id, data }) => id.startsWith(`${lang}/`) && (includeDrafts || !data.draft),
  );

  return entries
    .map((entry) => ({ entry, slug: entry.id.slice(lang.length + 1) }))
    .sort((a, b) => a.entry.data.order - b.entry.data.order);
}
