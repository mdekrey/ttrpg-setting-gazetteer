import { defineConfig } from 'astro/config';

// https://astro.build/config
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
import react from '@astrojs/react';

// https://astro.build/config
import mdx from '@astrojs/mdx';

// https://astro.build/config
import image from '@astrojs/image';

// https://astro.build/config
export default defineConfig({
	markdown: {
		syntaxHighlight: false,
	},
	integrations: [tailwind(), react(), mdx(), image()],
});
