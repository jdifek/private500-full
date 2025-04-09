import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

export async function POST(req: Request) {
	try {
		console.log('=== Начало обработки заказа ===')
		const requestBody = await req.json()
		console.log('Получены данные заказа:', requestBody)

		const { userId, crystals, totalCost } = requestBody

		if (!userId || !crystals || !totalCost) {
			console.error('Отсутствуют обязательные поля:', {
				userId,
				crystals,
				totalCost,
			})
			return NextResponse.json(
				{ error: 'Missing required fields' },
				{ status: 400 }
			)
		}

		// Тестовая платёжка — всегда успех
		console.log('Имитация платежа...')
		const paymentResult = { success: true, message: 'Test payment successful' }
		console.log('Результат платежа:', paymentResult)

		if (!paymentResult.success) {
			console.error('Ошибка платежа:', paymentResult.message)
			return NextResponse.json(
				{ error: paymentResult.message },
				{ status: 400 }
			)
		}

		// Подготовка данных для SmileCode API
		const apiKey = 'yourApiKey' // нужен реальный Sc-Api-Key
		const secretKey = 'yoursecretkey' // нужен реальный secretkey
		const baseUrl = 'https://www.smile.one/smilecode/api/'
		const requestId = `${Date.now()}-${Math.random()
			.toString(36)
			.substring(2, 15)}` // Уникальный ID запроса
		const iat = Math.floor(Date.now() / 1000) // Текущий timestamp в секундах
		const exp = iat + 2 * 60 * 60 // Время истечения 2 часа

		// Вызов skuList для получения списка SKU
		console.log('Получение списка SKU через метод skuList...')
		const skuListHeader = {
			alg: 'HS256',
			typ: 'JWT',
			'sc-api-key': apiKey,
			'sc-api-version': '2.0',
		}
		const skuListPayload = {
			jsonrpc: '2.0',
			id: `${requestId}-sku`,
			method: 'skuList',
			params: {},
			iat,
			exp,
		}
		const skuListToken = jwt.sign(skuListPayload, secretKey, {
			header: skuListHeader,
		})
		console.log('Сгенерирован JWT-токен для skuList:', skuListToken)

		const skuListHeaders = {
			'Content-Type': 'application/json',
			'Sc-Api-Key': apiKey,
			'Sc-Api-Version': '2.0',
			Authorization: `Bearer ${skuListToken}`,
		}

		let skuListResponse
		try {
			const skuResponse = await fetch(baseUrl, {
				method: 'POST',
				headers: skuListHeaders,
				body: JSON.stringify(skuListPayload),
			})
			skuListResponse = await skuResponse.json()
			console.log('Ответ от SmileCode API (skuList):', skuListResponse)
		} catch (error) {
			console.error('Ошибка при запросе к SmileCode API (skuList):', error)
			skuListResponse = {
				error: {
					code: -32603,
					message: 'Failed to connect to SmileCode API (skuList)',
				},
			}
		}

		// Проверка ответа skuList и выбор SKU
		let sku = `crystal_${crystals}` // Заглушка по умолчанию
		if (!skuListResponse.error && skuListResponse.result?.skuList) {
			const skuItem = skuListResponse.result.skuList.find(
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				(item: any) =>
					item.description.toLowerCase().includes(`${crystals} crystals`) ||
					item.sku.toLowerCase().includes(`${crystals}`)
			)
			if (skuItem) {
				sku = skuItem.sku
				console.log(`Найден SKU для ${crystals} кристаллов:`, sku)
			} else {
				console.warn(
					`SKU для ${crystals} кристаллов не найден, используется заглушка:`,
					sku
				)
			}
		} else {
			console.warn(
				'Не удалось получить список SKU, используется заглушка:',
				sku
			)
		}

		// Формирование JWT-токена
		const header = {
			alg: 'HS256',
			typ: 'JWT',
			'sc-api-key': apiKey,
			'sc-api-version': '2.0',
		}
		const payload = {
			jsonrpc: '2.0',
			id: requestId,
			method: 'sendOrder',
			params: {
				items: [{ sku, qty: 1 }], // Количество 1, так как isMultiPurchase не указано как true
				userId, // Добавляем userId как параметр (предполагается, что это нужно для top-up)
			},
			iat,
			exp,
		}

		const token = jwt.sign(payload, secretKey, { header })
		console.log('Сгенерирован JWT-токен:', token)

		// Формирование запроса к SmileCode API
		const headers = {
			'Content-Type': 'application/json',
			'Sc-Api-Key': apiKey,
			'Sc-Api-Version': '2.0',
			Authorization: `Bearer ${token}`,
		}
		const body = {
			jsonrpc: '2.0',
			id: requestId,
			method: 'sendOrder',
			params: {
				items: [{ sku, qty: 1 }],
				userId,
			},
		}

		console.log('Отправка запроса к SmileCode API...')
		console.log('URL:', baseUrl)
		console.log('Headers:', headers)
		console.log('Body:', body)

		let smileCodeResponse
		try {
			const res = await fetch(baseUrl, {
				method: 'POST',
				headers,
				body: JSON.stringify(body),
			})
			smileCodeResponse = await res.json()
			console.log('Ответ SmileCode API:', smileCodeResponse)
		} catch (error) {
			console.error('Ошибка при запросе к SmileCode API:', error)
			smileCodeResponse = {
				error: {
					code: -32603,
					message: 'Failed to connect to SmileCode API (test mode)',
				},
			}
		}

		// Обработка ответа
		const hasError = smileCodeResponse.error
		const status = hasError
			? 'failed'
			: smileCodeResponse.result?.message === 'Success'
			? 'completed'
			: 'failed'
		const smileCodeMessage = hasError
			? smileCodeResponse.error.message
			: smileCodeResponse.result?.message || 'Unknown response'

		console.log('Финальный статус заказа:', status)
		console.log('Сообщение от SmileCode:', smileCodeMessage)
		console.log('=== Завершение обработки заказа SmileCode ===')

		return NextResponse.json(
			{
				status,
				message: `Request sent to SmileCode: ${smileCodeMessage}`,
				paymentMessage: paymentResult.message,
				data: body.params,
				smileCodeResponse,
			},
			{ status: 200 }
		)
	} catch (error) {
		console.error('Критическая ошибка при обработке заказа:', error)
		return NextResponse.json(
			{ error: 'Failed to process order' },
			{ status: 500 }
		)
	}
}
