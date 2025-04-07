import { NextResponse } from 'next/server'
import { createSign } from 'crypto' // Используем createSign вместо sign
import prisma from '@/lib/prisma'

export async function POST(
	request: Request,
	{ params }: { params: { id: string } }
) {
	try {
		const productId = await params.id
		const { bigoId, diamonds, totalCost } = await request.json()

		if (!bigoId || !diamonds || !totalCost) {
			return NextResponse.json(
				{ error: 'Missing required fields' },
				{ status: 400 }
			)
		}

		// Проверяет, что продукт существует и это SERVICE (Bigo Live)
		const product = await prisma.products.findUnique({
			where: { id: productId },
		})
		if (!product || product.type !== 'SERVICE') {
			return NextResponse.json(
				{ error: 'Invalid product or not a mobile game' },
				{ status: 400 }
			)
		}

		// Тестовая платёжка — всегда успех
		const paymentResult = { success: true, message: 'Test payment successful' }

		if (!paymentResult.success) {
			return NextResponse.json(
				{ error: paymentResult.message },
				{ status: 400 }
			)
		}

		// Данные для Bigo Live API
		const seqId = `${Date.now()}-order-${bigoId}`
		const timestamp = Date.now()
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

		// createSign для генерации подписи
		const signer = createSign('SHA256')
		signer.update(strData)
		const signature = signer.sign(rsaPrivateKey, 'base64')

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

		let bigoResponse
		try {
			const response = await fetch(url, {
				method: 'POST',
				headers,
				body: JSON.stringify(postData),
			})
			bigoResponse = await response.json()
		} catch (error) {
			console.error('Bigo Live API error:', error)
			bigoResponse = {
				rescode: '999',
				message: 'Failed to connect to Bigo Live API (test mode)',
				seqid: seqId,
			}
		}

		const status = bigoResponse.rescode === '0' ? 'completed' : 'failed'
		const bigoMessage =
			bigoResponse.msg || bigoResponse.message || 'Unknown response'
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
		console.error('Error processing order:', error)
		return NextResponse.json(
			{ error: 'Failed to process order' },
			{ status: 500 }
		)
	}
}
