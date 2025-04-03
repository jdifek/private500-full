'use client'

import Image from 'next/image'
import DatePicker from 'react-datepicker'
import { useProfile } from '@/hooks/useProfile'
import { AvatarCircle } from '@/components/AvatarCircle'
import toast from 'react-hot-toast'

const Profile = () => {
	const {
		userData,
		loading,
		error,
		name,
		setName,
		secondName,
		setSecondName,
		gender,
		setGender,
		birthDate,
		setBirthDate,
		phone,
		handlePhoneChange,
		email,
		handleEmailChange,
		editStates,
		setEditStates,
		isGenderOpen,
		setIsGenderOpen,
		validationErrors,
		fileInputRef,
		handleAvatarUpload,
		handleAvatarDelete,
		handleAvatarClick,
		handleSave,
	} = useProfile()

	const copyToClipboard = () => {
		if (userData?.id) {
			navigator.clipboard.writeText(userData.id)
			toast.success('ID скопирован!')
		}
	}

	if (loading) return <p className='text-center text-gray-500'>Загрузка...</p>
	if (error) return <p className='text-center text-red-500'>{error}</p>

	return (
		<div className='max-w-md mx-auto py-4'>
			<AvatarCircle
				avatarUrl={userData?.avatar}
				onClick={handleAvatarClick}
				onDelete={e => {
					e.stopPropagation()
					handleAvatarDelete()
				}}
			/>
			<input
				type='file'
				ref={fileInputRef}
				onChange={handleAvatarUpload}
				className='hidden'
				accept='image/*'
			/>

			<div className='flex items-center justify-center gap-2 mt-2'>
				<p className='text-center text-[#383838] text-[12px] leading-3 font-light'>
					Don-Vip ID: {userData?.id || 'N/A'}
				</p>
				<Image
					src='/copy.svg'
					alt='Copy ID'
					width={16}
					height={16}
					className='cursor-pointer'
					onClick={copyToClipboard}
				/>
			</div>
			<p className='text-center text-[18px] leading-3 font-normal mt-2 mb-9'>
				{name && secondName
					? `${name} ${secondName}`
					: name || secondName || 'No Name Provided'}
			</p>

			<div className='space-y-4'>
				<div>
					<label className='block text-[12px] leading-3 text-black pb-1'>
						Имя
					</label>
					<div className='relative'>
						<input
							type='text'
							className={`w-full rounded-lg p-3 bg-[#f3f4f7] transition-all text-[13px] leading-3 ${
								editStates.name ? 'border border-blue-500' : 'border-0'
							}`}
							value={name}
							onChange={e => setName(e.target.value)}
							disabled={!editStates.name}
							onKeyPress={e =>
								e.key === 'Enter' &&
								setEditStates(prev => ({ ...prev, name: false }))
							}
						/>
						<button
							onClick={() =>
								setEditStates(prev => ({ ...prev, name: !prev.name }))
							}
							className='absolute right-2 top-1/2 transform -translate-y-1/2 text-[13px] leading-3 text-black cursor-pointer'
						>
							{editStates.name ? 'Сохранить' : 'Изменить'}
						</button>
					</div>
				</div>

				<div>
					<label className='block text-[12px] leading-3 text-black pb-1'>
						Фамилия
					</label>
					<div className='relative'>
						<input
							type='text'
							className={`w-full rounded-lg p-3 bg-[#f3f4f7] transition-all text-[13px] leading-3 ${
								editStates.secondName ? 'border border-blue-500' : 'border-0'
							}`}
							value={secondName}
							onChange={e => setSecondName(e.target.value)}
							disabled={!editStates.secondName}
							onKeyPress={e =>
								e.key === 'Enter' &&
								setEditStates(prev => ({ ...prev, secondName: false }))
							}
						/>
						<button
							onClick={() =>
								setEditStates(prev => ({
									...prev,
									secondName: !prev.secondName,
								}))
							}
							className='absolute right-2 top-1/2 transform -translate-y-1/2 text-[13px] leading-3 text-black cursor-pointer'
						>
							{editStates.secondName ? 'Сохранить' : 'Изменить'}
						</button>
					</div>
				</div>

				<div>
					<label className='block text-[12px] leading-3 text-black pb-1'>
						Пол
					</label>
					<div className='relative'>
						<div
							className='w-full rounded-lg p-3 bg-[#f3f4f7] cursor-pointer flex justify-between items-center text-[13px] leading-3'
							onClick={() => setIsGenderOpen(!isGenderOpen)}
						>
							<span>{gender === 'MALE' ? 'Мужской' : 'Женский'}</span>
							<Image
								src='/arrow-down-black.svg'
								alt='arrow'
								width={18}
								height={14}
								className={`transition-transform ${
									isGenderOpen ? 'rotate-180' : ''
								}`}
							/>
						</div>
						{isGenderOpen && (
							<div className='absolute w-full bg-[#f3f4f7] shadow-lg rounded-lg mt-1 z-10 text-[13px] leading-3'>
								<div
									className='p-3 hover:bg-gray-100 cursor-pointer'
									onClick={() => {
										setGender('MALE')
										setIsGenderOpen(false)
									}}
								>
									Мужской
								</div>
								<div
									className='p-3 hover:bg-gray-100 cursor-pointer'
									onClick={() => {
										setGender('FEMALE')
										setIsGenderOpen(false)
									}}
								>
									Женский
								</div>
							</div>
						)}
					</div>
				</div>

				<div>
					<label className='block text-[12px] leading-3 text-black pb-1'>
						Дата рождения
					</label>
					<DatePicker
						selected={birthDate}
						onChange={(date: Date) => setBirthDate(date)}
						dateFormat='dd.MM.yyyy'
						className='w-full rounded-lg p-3 bg-[#f3f4f7] transition-all text-[13px] leading-3 border-0'
						placeholderText=''
						onKeyDown={e => e.key === 'Enter' && handleSave()}
						onDoubleClick={() =>
							setEditStates(prev => ({ ...prev, birthDate: true }))
						}
					/>
				</div>

				<div>
					<div className='flex items-center gap-2 pb-1'>
						<Image
							src='/icon-phone.svg'
							alt='icon phone'
							width={10}
							height={13}
						/>
						<label className='block text-[12px] leading-3 text-black'>
							Телефон
						</label>
					</div>
					<div className='relative'>
						<input
							type='tel'
							className={`w-full rounded-lg p-3 bg-[#f3f4f7] transition-all text-[13px] leading-3 ${
								editStates.phone ? 'border border-blue-500' : 'border-0'
							}`}
							value={phone}
							onChange={e => handlePhoneChange(e.target.value)}
							disabled={!editStates.phone}
							onKeyPress={e =>
								e.key === 'Enter' &&
								setEditStates(prev => ({ ...prev, phone: false }))
							}
						/>
						<button
							onClick={() =>
								setEditStates(prev => ({ ...prev, phone: !prev.phone }))
							}
							className='absolute right-2 top-1/2 transform -translate-y-1/2 text-[13px] leading-3 text-black cursor-pointer'
						>
							{editStates.phone ? 'Сохранить' : 'Изменить'}
						</button>
						{validationErrors.phone && (
							<p className='text-red-500 text-xs mt-1'>
								{validationErrors.phone}
							</p>
						)}
					</div>
				</div>

				<div>
					<div className='flex items-center gap-2 pb-1'>
						<Image
							src='/icon-email.svg'
							alt='icon email'
							width={14}
							height={13}
						/>
						<label className='block text-[12px] leading-3 text-black'>
							Электронная почта
						</label>
					</div>
					<div className='relative'>
						<input
							type='email'
							className={`w-full rounded-lg p-3 bg-[#f3f4f7] transition-all text-[13px] leading-3 ${
								editStates.email ? 'border border-blue-500' : 'border-0'
							}`}
							value={email}
							onChange={e => handleEmailChange(e.target.value)}
							disabled={!editStates.email}
							onKeyPress={e =>
								e.key === 'Enter' &&
								setEditStates(prev => ({ ...prev, email: false }))
							}
						/>
						<button
							onClick={() =>
								setEditStates(prev => ({ ...prev, email: !prev.email }))
							}
							className='absolute right-2 top-1/2 transform -translate-y-1/2 text-[13px] leading-3 text-black cursor-pointer'
						>
							{editStates.email ? 'Сохранить' : 'Изменить'}
						</button>
						{validationErrors.email && (
							<p className='text-red-500 text-xs mt-1'>
								{validationErrors.email}
							</p>
						)}
					</div>
				</div>
			</div>

			<div className='mt-6 flex justify-center'>
				<button
					className='bg-blue-500 hover:bg-blue-600 text-white p-2 px-4 w-fit min-w-10 rounded-lg cursor-pointer'
					onClick={handleSave}
				>
					Сохранить
				</button>
			</div>
		</div>
	)
}

export default Profile
