import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const pedidoId = searchParams.get("pedido_id")

    if (!pedidoId) {
      return NextResponse.json(
        { error: "pedido_id e obrigatorio" },
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

    // Consultar status da transacao na PagouAI v1 (Basic Auth)
    const response = await fetch(`https://api.conta.pagou.ai/v1/transactions/${pedidoId}`, {
      method: "GET",
      headers: {
        "Authorization": `Basic ${Buffer.from(`${apiKey}:x`).toString("base64")}`,
      },
    })

    const data = await response.json()

    if (!response.ok) {
      return NextResponse.json(
        { error: data.message || data.error || "Erro ao consultar status" },
        { status: response.status }
      )
    }

    // Mapear status da PagouAI para o formato esperado pelo frontend
    const rawStatus = (data.status || data.payment_status || "pending").toLowerCase()
    const isPaid = rawStatus === "paid" || rawStatus === "approved" || rawStatus === "completed" || rawStatus === "pago"

    return NextResponse.json({
      status: isPaid ? "Pago" : "Pendente",
      rawStatus: rawStatus,
      transactionId: pedidoId,
    })
  } catch (err) {
    console.log("[v0] Status check error:", err instanceof Error ? err.message : err)
    return NextResponse.json(
      { error: "Erro interno ao verificar status" },
      { status: 500 }
    )
  }
}
