import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Forward to webhook if configured
    const webhookUrl = process.env.LEAD_WEBHOOK_URL;
    if (webhookUrl) {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source: 'crash-cost-calculator',
          timestamp: new Date().toISOString(),
          ...data,
        }),
      }).catch(() => {
        // Don't fail the main request if webhook fails
      });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
