import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { amount, customerName, customerEmail, customerDocument, customerPhone, items } = body

    // Validacao basica
    if (!amount || !customerName || !customerEmail || !customerDocument) {
      return NextResponse.json(
        { error: "Dados incompletos" },
        { status: 400 }
      )
    }

    const apiKey = process.env.PAGOUAI_API_KEY

    if (!apiKey) {
      return NextResponse.json(
        { error: "Chave da API PagouAI nao configurada" },
        { status: 500 }
      )
    }

    // Descricao do pedido - aparece no gateway como "Combo Escolhido"
    const totalQuantity = items?.reduce((acc: number, item: { quantity: number }) => acc + item.quantity, 0) || 1
    const description = `${totalQuantity}x Combo Escolhido`

    // Valor em centavos
    const amountInCents = Math.round(amount * 100)

    // Formatar documento
    const docNumber = customerDocument.replace(/\D/g, "")
    const docType = docNumber.length > 11 ? "cnpj" : "cpf"

    // Criar transacao PIX na PagouAI v1 (Basic Auth)
    console.log("[v0] Enviando request para PagouAI v1...")
    console.log("[v0] Payload amount (centavos):", amountInCents, "description:", description)
    const response = await fetch("https://api.conta.pagou.ai/v1/transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Basic ${Buffer.from(`${apiKey}:x`).toString("base64")}`,
      },
      body: JSON.stringify({
        amount: amountInCents,
        paymentMethod: "pix",
        items: [
          {
            id: "combo-1",
            title: "Combo Escolhido",
            unitPrice: amountInCents,
            quantity: 1,
            tangible: true,
          },
        ],
        customer: {
          name: customerName,
          email: customerEmail,
          phone: customerPhone ? customerPhone.replace(/\D/g, "") : undefined,
          document: {
            number: docNumber,
            type: docType,
          },
        },
        pix: {
          expiresInDays: 1,
        },
        metadata: {
          description: description,
        },
      }),
    })

    const data = await response.json()
    console.log("[v0] PagouAI response status:", response.status)
    console.log("[v0] PagouAI response data:", JSON.stringify(data).substring(0, 500))

    if (!response.ok) {
      console.log("[v0] PagouAI error:", data.message || data.error || JSON.stringify(data))
      return NextResponse.json(
        { error: data.message || data.error || "Erro ao criar cobranca PIX" },
        { status: response.status }
      )
    }

    // Extrair dados PIX da resposta PagouAI v1
    const pixCode = data.pix?.qrcode || data.pix?.qr_code || data.pix?.brcode || ""
    const transactionId = data.id || data.transactionId || ""
    console.log("[v0] PIX code extraido:", pixCode ? pixCode.substring(0, 50) + "..." : "VAZIO")
    console.log("[v0] Transaction ID:", transactionId)

    // Gerar imagem do QR Code via API publica
    const pixQrCodeImage = pixCode
      ? `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(pixCode)}`
      : ""

    // Retornar dados do QR Code no formato esperado pelo frontend
    return NextResponse.json({
      success: true,
      transactionId: transactionId,
      pixCode: pixCode,
      pixQrCodeImage: pixQrCodeImage,
      expiresAt: data.pix?.expires_at || data.expires_at || null,
      amount: amount,
    })
  } catch (err) {
    console.log("[v0] PIX API catch error:", err instanceof Error ? err.message : err)
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    )
  }
}
