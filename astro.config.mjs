// @ts-check
import { defineConfig } from 'astro/config';

// Static HTML that Cloudflare Pages can host for free.
export default defineConfig({
  trailingSlash: 'never',
  devToolbar: { enabled: false },
});
