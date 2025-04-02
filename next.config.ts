import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const nextConfig: NextConfig = {
	images: {
		domains: ['i.postimg.cc', 'alamocitygolftrail.com'], // Добавляем разрешенный домен
	},
}

const withNextIntl = createNextIntlPlugin()
export default withNextIntl(nextConfig)
