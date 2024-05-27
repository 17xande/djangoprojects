import { build, context } from 'esbuild'
import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const config = {
	entryPoints: [
		'dashboard/assets/scripts/app.ts',
		'dashboard/assets/styles/app.css',
	],
	entryNames: '[dir]/[name]',
	outdir: 'dashboard/static/dashboard',
	sourcemap: true,
	format: 'esm',
	bundle: true,
	minify: true,
	logLevel: 'info',
}

fs.cpSync(path.resolve(__dirname, 'node_modules/@shoelace-style/shoelace/dist/assets'), path.resolve(__dirname, 'dashboard/static/dashboard/assets'), {
	dereference: true,
	errorOnExist: false,
	preserveTimestamps: true,
	recursive: true,
})

console.log("copied shoelace assets")

const watch = process.argv.lenth > 2 && process.argv[2] === '--watch'

if (watch) {
	config.minify = false

	try {
		const ctx = await context(config)
		process.on('SIGINT', async () => {
			console.log('\nSIGINT received. Shutting down...')
			await ctx.dispose()
			process.exit(0)
		})

		ctx.watch()
	} catch (err) {
		console.log('error in watch mode:')
		console.error(err)
		process.exit(1)
	}
} else {
	await build(config).catch(err => {
		console.log('error in build mode:')
		console.error(err)
		process.exit(1)
	})
}

