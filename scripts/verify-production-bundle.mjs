// Fails if a production build in dist/ still contains the development test login.
// Run after `pnpm build` (CI does). Staging-mode builds include it on purpose, so don't run this on them.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const dir = process.argv[2] ?? 'dist';
const forbidden = ['/api/auth/login/dev'];
const hits = [];
const walk = (d) => {
  for (const name of readdirSync(d)) {
    const p = join(d, name);
    if (statSync(p).isDirectory()) walk(p);
    else if (/\.(js|html)$/.test(name)) {
      const text = readFileSync(p, 'utf8');
      for (const f of forbidden) if (text.includes(f)) hits.push(`${p}: ${f}`);
    }
  }
};
walk(dir);
if (hits.length) {
  console.error(`Production bundle contains the test login:\n${hits.join('\n')}`);
  process.exit(1);
}
console.log(`ok: no test login in ${dir}`);
