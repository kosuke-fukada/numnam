import { sveltekit } from '@sveltejs/kit/vite';
import { checker } from 'vite-plugin-checker';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [
		sveltekit(),
		checker({
			typescript: {
				tsconfigPath: './tsconfig.json'
			},
			eslint: {
				lintCommand: 'eslint .'
			}
		})
	]
};

export default config;
