import { defineConfig } from 'tsup';

export default defineConfig({
	entry: ['src/**/*.ts'],
	outDir: 'dist',
	format: 'esm',
	target: 'es2022',
	clean: true,
	minify: true,
	skipNodeModulesBundle: true,
	ignoreWatch: ['**/node_modules/**', '**/.git/**'],
});
