import { getCollection } from 'astro:content';

export type ProjectType = 'creative' | 'technical';

export async function getAllProjects() {
  const projects = await getCollection('projects');
  return projects.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export async function getFeatured() {
  const all = await getAllProjects();
  return all.find((p) => p.data.featured) ?? all[0] ?? null;
}

export async function getNonFeatured() {
  const all = await getAllProjects();
  return all.filter((p) => !p.data.featured)
    .sort((a, b) => {
      const typeA = a.data.type === 'technical' ? 0 : 1;
      const typeB = b.data.type === 'technical' ? 0 : 1;
      if (typeA !== typeB) return typeA - typeB;
      return b.data.date.valueOf() - a.data.date.valueOf();
    });
}

export async function getProjectBySlug(slug: string) {
  const all = await getAllProjects();
  const index = all.findIndex((p) => p.id === slug);
  if (index === -1) return null;
  return {
    project: all[index],
    next: all[(index + 1) % all.length],
    prev: all[(index - 1 + all.length) % all.length],
  };
}

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    year: 'numeric',
  }).format(date);
}
