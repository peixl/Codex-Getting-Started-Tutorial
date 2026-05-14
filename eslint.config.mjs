import nextConfig from 'eslint-config-next';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: ['.next/**', '.open-next/**', 'node_modules/**', 'next-env.d.ts'],
  },
  ...nextConfig,
);
