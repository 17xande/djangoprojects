import { build, context } from 'esbuild'

const config = {
	entryPoints: [
		'dashboard/assets/scripts/app.ts',
		'dashboard/assets/styles/app.css',
	],
	entryNames: '[dir]/[name]',
	outdir: 'dashboard/static/dashboard',
	// outbase: 'dashboard/static/dashboard',
	sourcemap: true,
	format: 'esm',
	bundle: true,
	minify: true,
	logLevel: 'info',
	// loader: {
	// 	'.html': 'copy',
	// },
}

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

