import { readdirSync, mkdirSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createInterface } from 'node:readline';
import { promisify } from 'node:util';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const projectsDir = join(root, 'src', 'content', 'projects');
const uploadsDir = join(root, 'public', 'uploads');

const rl = createInterface({ input: process.stdin, output: process.stdout });
const ask = promisify((q, cb) => rl.question(q, (a) => cb(null, a)));

function slugify(str) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function today() {
  return new Date().toISOString().slice(0, 10);
}

function frontmatterValue(v) {
  if (Array.isArray(v)) return `  ${v.map((i) => `- ${i}`).join('\n  ')}`;
  if (typeof v === 'string' && /^[\w./:-]+$/.test(v)) return v;
  return `"${v}"`;
}

async function main() {
  const title = (await ask('project title: ')).trim();
  if (!title) {
    console.error('no title given — aborting.');
    process.exit(1);
  }
  const slug = slugify(title);
  const date = (await ask(`date (${today()}): `)).trim() || today();
  const type = (await ask('type (creative/technical): ')).trim().toLowerCase() || 'creative';
  const featured = (await ask('featured? (y/N): ')).trim().toLowerCase() === 'y';
  const tagsRaw = (await ask('tags (comma separated): ')).trim();
  const tags = tagsRaw ? tagsRaw.split(',').map((t) => t.trim()).filter(Boolean) : [];
  const summary = (await ask('one-line summary: ')).trim() || 'A short summary of the project.';

  const file = join(projectsDir, `${date}-${slug}.md`);
  if (exists(file)) {
    console.error(`already exists: ${file}`);
    process.exit(1);
  }

  const imgDir = join(uploadsDir, slug);
  mkdirSync(imgDir, { recursive: true });

  const images = [
    `  - /uploads/${slug}/cover.jpg`,
    ...(type === 'creative' ? ['  - /uploads/photos/portrait.jpg'] : []),
  ];

  const body = [
    '---',
    `title: "${title}"`,
    `date: ${date}`,
    `type: ${type}`,
    `featured: ${featured}`,
    `tags:${tags.length ? frontmatterValue(tags) : ' []'}`,
    `summary: "${summary.replace(/"/g, '\\"')}"`,
    `images:${images.join('\n')}`,
    'pdfs:',
    `  - /uploads/pdfs/${slug}.pdf`,
    `liveUrl: "https://example.com"`,
    `githubUrl: "https://github.com/yourusername/${slug}"`,
    '---',
    '',
    `# ${title}`,
    '',
    'Your write-up goes here. Drop photos into',
    `\`public/uploads/${slug}/\` and your PDF into`,
    '`public/uploads/pdfs/`. Remove the `liveUrl`/`githubUrl`',
    'lines if you don’t have them yet.',
    '',
  ].join('\n');

  writeFileSync(file, body);
  console.log(`\ncreated:\n  ${file}\n  ${imgDir}`);
  console.log('\ndrop your files in, edit the write-up, then `npm run build` + git push.');
  rl.close();
}

function exists(p) {
  return readdirSync(dirname(p)).includes(join(p).split('/').pop());
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
