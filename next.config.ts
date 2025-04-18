import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
	images: {
		domains: [
			'i.postimg.cc',
			'postimgs.org',
			'alamocitygolftrail.com',
			'assets1.ignimgs.com',
			'seagm-media.seagmcdn.com',
			// это для аватарок, домен бд, не удалять
			'wimtycmspviijbwevgwd.supabase.co',
		],
	},
}

const withNextIntl = createNextIntlPlugin()
export default withNextIntl(nextConfig)
