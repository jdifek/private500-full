import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const nextConfig: NextConfig = {
	images: {
		domains: [
			'i.postimg.cc',
			'postimgs.org',
			'alamocitygolftrail.com',
			'assets1.ignimgs.com',
			'seagm-media.seagmcdn.com',
			// это для аватарок, домен бд, не удалять
			'etgmohcvgdkvuqnthiuz.supabase.co',
		],
	},
}

const withNextIntl = createNextIntlPlugin()
export default withNextIntl(nextConfig)
