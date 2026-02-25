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

    const secretKey = process.env.MEDUSAPAY_SECRET_KEY

    if (!secretKey) {
      return NextResponse.json(
        { error: "Chave da API nao configurada" },
        { status: 500 }
      )
    }

    // Gerar ID unico para a transacao
    const transactionId = `FOLIA-${Date.now()}-${Math.random().toString(36).substring(7)}`

    // Descricao do pedido - aparece no gateway como "Combo Escolhido"
    const totalQuantity = items?.reduce((acc: number, item: { quantity: number }) => acc + item.quantity, 0) || 1
    const description = `${totalQuantity}x Combo Escolhido`

    // Formatar items para a API - todos aparecem como "Combo Escolhido"
    const formattedItems = [{
      id: "item-1",
      title: "Combo Escolhido",
      unitPrice: Math.round(amount * 100),
      quantity: 1,
      tangible: true,
    }]

    // Criar transacao PIX na MedusaPay
    const response = await fetch("https://api.v2.medusapay.com.br/v1/transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Basic ${Buffer.from(`${secretKey}:x`).toString("base64")}`,
      },
      body: JSON.stringify({
        amount: Math.round(amount * 100), // Valor em centavos
        paymentMethod: "pix",
        items: formattedItems,
        customer: {
          name: customerName,
          email: customerEmail,
          phone: customerPhone ? customerPhone.replace(/\D/g, "") : undefined,
          document: {
            number: customerDocument.replace(/\D/g, ""),
            type: customerDocument.replace(/\D/g, "").length > 11 ? "cnpj" : "cpf",
          },
        },
        pix: {
          expiresInDays: 1,
        },
        metadata: {
          order_id: transactionId,
          description: description,
        },
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      return NextResponse.json(
        { error: data.message || "Erro ao criar cobranca PIX" },
        { status: response.status }
      )
    }

    // Extrair codigo PIX (campo e "qrcode" minusculo na API MedusaPay)
    const pixCode = data.pix?.qrcode || ""
    
    // MedusaPay nao retorna imagem do QR code, vamos gerar via API publica
    // Usando a API do QR Server para gerar a imagem do QR Code
    const pixQrCodeImage = pixCode 
      ? `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(pixCode)}`
      : ""

    // Retornar dados do QR Code
    return NextResponse.json({
      success: true,
      transactionId: data.id || data.transactionId || transactionId,
      pixCode: pixCode,
      pixQrCodeImage: pixQrCodeImage,
      expiresAt: data.pix?.expiresAt || data.pix?.expires_at || data.expiresAt,
      amount: amount,
      rawResponse: data, // Enviar resposta completa para debug
    })
  } catch {
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    )
  }
}
