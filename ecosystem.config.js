module.exports = {
	apps: [
		{
			watch: false,
			name: 'IA Service',
			script: 'node main.js',
			watch: [
				'src',
				'ecosystem.config.js',
				'nest-cli.json',
				'package.json',
				'pnpm-lock.yaml',
				'tsconfig.build.json',
				'tsconfig.json',
			],
		},
	],
};
