export const FullScreenLoader = () => {
	return (
		<div className='fixed inset-0 bg-opacity-50 backdrop-blur-md flex justify-center items-center z-50'>
			<div className='w-12 h-12 border-4 border-t-transparent border-blue-500 rounded-full animate-spin'></div>
		</div>
	)
}
