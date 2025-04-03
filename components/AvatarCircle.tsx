import Image from 'next/image'

interface AvatarCircleProps {
	avatarUrl?: string
	onClick?: () => void
	onDelete?: (e: React.MouseEvent) => void
}

export const AvatarCircle = ({
	avatarUrl,
	onClick,
	onDelete,
}: AvatarCircleProps) => (
	<div className='relative w-24 h-24 mx-auto mt-5 cursor-pointer'>
		<svg className='absolute' width='96' height='96' viewBox='0 0 96 96'>
			<defs>
				<linearGradient id='gradient' x1='0%' y1='0%' x2='100%' y2='100%'>
					<stop offset='0%' style={{ stopColor: '#1C34FF' }} />
					<stop offset='33%' style={{ stopColor: '#111F99' }} />
					<stop offset='66%' style={{ stopColor: '#802E4D' }} />
					<stop offset='100%' style={{ stopColor: '#F03D00' }} />
				</linearGradient>
			</defs>
			<circle
				cx='48'
				cy='48'
				r='46'
				fill='none'
				stroke='url(#gradient)'
				strokeWidth='6'
			/>
		</svg>
		<div
			className='relative w-24 h-24 rounded-full flex items-center justify-center bg-gray-200'
			onClick={onClick}
		>
			{avatarUrl ? (
				<>
					<Image
						src={avatarUrl}
						alt='User Avatar'
						width={96}
						height={96}
						className='w-full h-full rounded-full object-cover'
					/>
					{onDelete && (
						<button
							onClick={onDelete}
							className='absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center'
						>
							×
						</button>
					)}
				</>
			) : (
				<Image src='/icon-plus.svg' alt='Add Avatar' width={32} height={32} />
			)}
		</div>
	</div>
)
