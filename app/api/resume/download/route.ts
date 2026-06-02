import { type NextRequest, NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import type { DocumentProps } from "@react-pdf/renderer";
import React, { type ReactElement } from "react";
import { ResumePDF } from "@/app/resume/ResumePDF";
import type { Lang } from "@/app/resume/resume-data";

export async function GET(request: NextRequest) {
  const rawLang = request.nextUrl.searchParams.get("lang");
  const lang: Lang = rawLang === "pt" ? "pt" : "en";

  try {
    const element = React.createElement(
      ResumePDF,
      { lang },
    ) as ReactElement<DocumentProps>;

    const buffer = await renderToBuffer(element);

    // Convert Node Buffer → Uint8Array for NextResponse BodyInit compatibility
    return new NextResponse(new Uint8Array(buffer), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="Gildo-Neto-Resume-${lang.toUpperCase()}.pdf"`,
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (err) {
    console.error("[resume/download] PDF generation error:", err);
    return NextResponse.json(
      { error: "Failed to generate PDF" },
      { status: 500 },
    );
  }
}
