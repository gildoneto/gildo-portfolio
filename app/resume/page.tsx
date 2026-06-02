import type { Metadata } from "next";
import { ResumeContent } from "./ResumeContent";

export const metadata: Metadata = {
  title: "Resume — Gildo Neto",
  description:
    "Full Stack Developer with 8 years of experience. Currently at Thoughtworks, working with React, Next.js, Java, Spring Boot, Firebase, and TypeScript.",
  openGraph: {
    title: "Resume — Gildo Neto | Full Stack Developer",
    description:
      "8 years building web platforms. Thoughtworks · Next.js · Java · Firebase · TypeScript.",
    type: "profile",
  },
};

export default function ResumePage() {
  return <ResumeContent />;
}
