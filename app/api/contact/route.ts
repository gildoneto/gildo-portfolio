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

  return NextResponse.json({ success: true });
}
