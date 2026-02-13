import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/home/Hero";
import { LabsGrid } from "@/components/home/LabsGrid";

export default function Home() {
    return (
        <main className="min-h-screen bg-background font-sans antialiased">
            <Navbar />
            <Hero />
            <LabsGrid />
            <Footer />
        </main>
    );
}
