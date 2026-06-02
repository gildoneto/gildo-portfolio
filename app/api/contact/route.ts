import { NextResponse } from "next/server";

interface ContactPayload {
  name: string;
  email: string;
  whatsapp?: string;
  project: string;
  message?: string;
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { name, email, whatsapp, project, message } = body as ContactPayload;

  if (!name?.trim() || !email?.trim() || !project?.trim()) {
    return NextResponse.json(
      { error: "name, email, and project are required" },
      { status: 422 }
    );
  }

  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 422 });
  }

  // TODO: wire up an email provider (Resend, SendGrid, etc.)
  // Example with Resend:
  //   import { Resend } from "resend";
  //   const resend = new Resend(process.env.RESEND_API_KEY);
  //   await resend.emails.send({ from, to, subject, text });

  console.log("[contact] new message", { name, email, whatsapp, project, message });

  // Send Telegram notification
  const telegramToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (telegramToken && chatId) {
    try {
      const text = `🔔 *Novo Contato no Portfólio!*\n\n` +
                   `👤 *Nome:* ${name}\n` +
                   `📧 *Email:* ${email}\n` +
                   `📱 *WhatsApp:* ${whatsapp || "Não informado"}\n` +
                   `💼 *Projeto:* ${project}\n\n` +
                   `💬 *Mensagem:* ${message || "Sem mensagem"}`;

      const response = await fetch(`https://api.telegram.org/bot${telegramToken}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: text,
          parse_mode: "Markdown",
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("[contact] Telegram API responded with error:", errorText);
      }
    } catch (err) {
      console.error("[contact] Failed to send Telegram notification:", err);
    }
  } else {
    console.warn("[contact] Telegram credentials not configured in environment variables");
  }

  return NextResponse.json({ success: true });
}
