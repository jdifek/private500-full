import { NextResponse } from 'next/server'
import { createSign } from 'crypto' // Используем createSign вместо sign
import prisma from '@/lib/prisma'

export async function POST(
	request: Request,
	{ params }: { params: { id: string } }
) {
	try {
		console.log('=== Начало обработки заказа ===')
		console.log('Получен ID продукта:', params.id)
		
		const productId = await params.id
		const requestBody = await request.json()
		console.log('Получены данные заказа:', requestBody)
		
		const { bigoId, diamonds, totalCost } = requestBody

		if (!bigoId || !diamonds || !totalCost) {
			console.error('Отсутствуют обязательные поля:', { bigoId, diamonds, totalCost })
			return NextResponse.json(
				{ error: 'Missing required fields' },
				{ status: 400 }
			)
		}

		// Проверяет, что продукт существует и это SERVICE (Bigo Live)
		console.log('Поиск продукта в базе данных...')
		const product = await prisma.products.findUnique({
			where: { id: productId },
		})
		console.log('Найден продукт:', product)

		if (!product || product.type !== 'SERVICE') {
			console.error('Неверный продукт или не сервис:', product)
			return NextResponse.json(
				{ error: 'Invalid product or not a mobile game' },
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

		// Данные для Bigo Live API
		console.log('Подготовка данных для Bigo Live API...')
		const seqId = `${Date.now()}-order-${bigoId}`
		const timestamp = Math.floor(Date.now() / 1000);
		console.log('Сгенерированные параметры:', { seqId, timestamp })

		const rsaPrivateKey = `-----BEGIN RSA PRIVATE KEY-----
MIIEpAIBAAKCAQEAwaC/CEO4mQel1vuz4g2uzzE0qSZswGGF7gH5poFhuFrGt651
MN5pfReYKgmoZR09y49NjO47cSuFHymp1/ENZ+na7HfJext6+1p/vPltD1xAWQtp
hvxj2+78K/n8YJ98cTT16cJxjshO3bdkYeHkvkSTQzc5IkO9mfFOI0zjxYRxIorc
KuyN9s5Httgnip18Exp8IAkS10W20+xYACljatFzu2TMT7UmFQ1hWxQRjiwEsoWL
46pX29dAyPiIZsjIalP9FeigvtfEW8p7vD5kEjcUOu806mPZG2d3APJ1sAN+Yd9h
c4BaUZNFTCGcq3jdQTgz12a/VNnpsKGVAOTEIQIDAQABAoIBAE0sjZd0rnnH85CJ
R/wcagVI3m1g1E2lUSU5AlEcFl/NRpDlZu4wZ6klI0/2A3kxu3SLzGQUe/qyVt/B
0mEwQaCeM9S2NcbsgAr42hru60oJAdi71Lapl/+L9FRu0emNB6NzcWRXTL2VFuIF
+2uMBojTekJ7GzmN+F8IL5WgStRpL3ADancfXsGi3VeE5LiY4ddDOFKXlgp4Mp5w
f/328LVGbWZa9z9Ej4C6XrmqvnYVwqJLH0DW9UIwxoksE1pM2YI4agvnpQuQPPaS
PFnkYywHrk0NNfX/IW8ONxL4YiRumlMmITNadQgXj4crEZaE+uDYUqheFfEfHpGs
w/5BcsECgYEA/H936nXUs6tTxj8svDlhsGDxdLfCKkHXna4fN9tIPk75dhTw7IIt
xFOLE2A6C+CYq5i+KQ2baSpECG38bdOUgPfDTnN6O/rOWL6Nf+z5jXdfMiTIWibh
kahLBah7hwRo/5j1zGpuJyhZoB/vTTARPW42+uwy66wtnbv4Sif+63kCgYEAxFBA
RFmgVhXfjzG7Cfa1uE8diXZe/ffLuNJZNdaBVAgapcLU2D6M82ijkC6klp60u0Cr
eAF2fmhJSZrZU4q5ifkRjoPWQqDhJQ/dCX1tV+O4uVanaHzCBIKW8EBAtG1w7vve
7PELI8JNyf72DyK+VeuIl6JeCOIznaexwOUES+kCgYEA0ZYA9KXv818P/6uqt2Yt
91jQs6BgU/EpR2Ij2Zp0AfxNxz0kqjx4PtFVzLSAGiHIuA7mMW9xA78oj5K0CHmq
d86w2Cq0WJsbssAg9gG/NzTR2O59O4+whtYZx82NE4qOmTLfPFlPq8MreeVoHjr6
5HHawzdSIRtfFeHT+8HtMIkCgYBXzMihiTBTsB63jXdowmWN1BySwVVE4xHDTJjH
onNfIOzCHDxTps4lgzQ8JRBJqRuN8COAXa8gZAX7HH18hrvqwHGgusgWLpvjlo+2
UdmYiGmywtXGvp2LpNhbBXGrAJOU3yNZ94iS6rEd2aE1LcXQ6bHCl8TU1k5dgYXX
jtX4GQKBgQCYsd9YNNsYtjcbMwmDS/tRKS4KiVdG3ksYX27izDIBubXIkPi+Ky9d
RfFkXlmQnQJsAZ48wuQGo1/YgnXS32RrLiPYH6eXuiS6+PvjgsL9BvQ43WZk2+mL
7Jo4/IVZt44NWI6JTbQ9eMGOFwgZMbm4ZPngog3U6AVGLPfrCWkNQg==
-----END RSA PRIVATE KEY-----`

		const hostDomain = 'oauth.bigolive.tv'
		const apiEndpoint = '/sign/agent/rs_recharge'
		const clientId = 'f2eSGEIAjDoPrjf'

		const strData = `{
      "recharge_bigoid": "${bigoId}",
      "reseller_bigoid": "dior",
      "seqid": "${seqId}",
      "bu_orderid": "${seqId}",
      "value": ${diamonds},
      "total_cost": ${totalCost},
      "currency": "RUB"
    }${apiEndpoint}${timestamp}`

		console.log('Данные для подписи:', strData)

		// createSign для генерации подписи
		console.log('Генерация подписи...')
		const signer = createSign('SHA256')
		signer.update(strData)
		const signature = signer.sign(rsaPrivateKey, 'base64')
		console.log('Подпись сгенерирована')

		const postData = {
			recharge_bigoid: bigoId,
			reseller_bigoid: 'dior',
			seqid: seqId,
			bu_orderid: seqId,
			value: diamonds,
			total_cost: totalCost,
			currency: 'RUB',
		}

		const url = `https://${hostDomain}${apiEndpoint}`
		const headers = {
			'Content-Type': 'application/json',
			'bigo-client-id': clientId,
			'bigo-timestamp': timestamp.toString(),
			'bigo-oauth-signature': signature,
		}

		console.log('Отправка запроса к Bigo Live API...')
		console.log('URL:', url)
		console.log('Headers:', headers)
		console.log('Body:', postData)

		let bigoResponse
		try {
			const response = await fetch(url, {
				method: 'POST',
				headers,
				body: JSON.stringify(postData),
			})
			console.log('Получен ответ от Bigo Live API')
			bigoResponse = await response.json()
			console.log('Ответ Bigo Live API:', bigoResponse)
		} catch (error) {
			console.error('Ошибка при запросе к Bigo Live API:', error)
			bigoResponse = {
				rescode: '999',
				message: 'Failed to connect to Bigo Live API (test mode)',
				seqid: seqId,
			}
		}

		const status = bigoResponse.rescode === '0' ? 'completed' : 'failed'
		const bigoMessage = bigoResponse.msg || bigoResponse.message || 'Unknown response'
		console.log('Финальный статус заказа:', status)
		console.log('Сообщение от Bigo Live:', bigoMessage)
		console.log('=== Завершение обработки заказа ===')

		return NextResponse.json(
			{
				status,
				message: `Request sent to Bigo Live: ${bigoMessage}`,
				paymentMessage: paymentResult.message,
				data: postData,
				bigoResponse,
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
