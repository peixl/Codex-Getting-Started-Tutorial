import { cp, rm } from 'node:fs/promises';
import path from 'node:path';

const rootDir = process.cwd();
const standaloneDir = path.join(rootDir, '.next', 'standalone');

const copies = [
  {
    from: path.join(rootDir, '.next', 'static'),
    to: path.join(standaloneDir, '.next', 'static'),
  },
  {
    from: path.join(rootDir, 'public'),
    to: path.join(standaloneDir, 'public'),
  },
];

for (const { from, to } of copies) {
  await rm(to, { recursive: true, force: true });
  await cp(from, to, { recursive: true });
}

console.log('Prepared standalone static assets.');
