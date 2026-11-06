import { defineConfig } from 'vitest/config';
import path from 'node:path';

export default defineConfig({
  resolve: { alias: { '@': path.resolve(import.meta.dirname, 'src') } },
  // Files run one after another: the account tests share one test database.
  test: { environment: 'node', fileParallelism: false },
});
