'use client'

import { useEffect, useState } from 'react'

interface NotificationProps {
	message: string
	onClose: () => void
}

export const CustomNotification = ({ message, onClose }: NotificationProps) => {
	const [isVisible, setIsVisible] = useState(true)

	useEffect(() => {
		const timer = setTimeout(() => {
			setIsVisible(false)
			setTimeout(onClose, 300)
		}, 3000)
		return () => clearTimeout(timer)
	}, [onClose])

	return (
		<div
			className={`fixed top-5 right-5 z-50 p-4 rounded-lg bg-green-500 text-white shadow-lg transition-all duration-300 ${
				isVisible
					? 'opacity-100 translate-y-0'
					: 'opacity-0 translate-y-[-20px]'
			}`}
		>
			{message}
		</div>
	)
}
