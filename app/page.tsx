import { Nav } from "@/app/components/Nav";
import { Hero } from "@/app/components/Hero";
import { Projects } from "@/app/components/Projects";
import { Stack } from "@/app/components/Stack";
import { Contact } from "@/app/components/Contact";
import { Footer } from "@/app/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Projects />
        <Stack />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
