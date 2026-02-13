import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FlaskConical, BookOpen, FileText, CheckCircle, PlayCircle, CircuitBoard } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

// Mock Data for Digital Logic Design
const practicalData = {
    1: {
        title: "Study and Verification of Logic Gates",
        aim: "To study and verify the truth tables of basic logic gates (AND, OR, NOT, NAND, NOR, XOR, XNOR).",
        theory: `
      <div class="space-y-6 text-slate-600 leading-relaxed">
        <p><strong>Logic Gates</strong> are the basic building blocks of any digital system. It is an electronic circuit having one or more than one input and only one output. The relationship between the input and the output is based on a certain logic.</p>
        <div class="grid md:grid-cols-3 gap-6">
            <div class="bg-blue-50/50 p-4 rounded-xl border border-blue-100">
                <h4 class="font-bold text-blue-900 mb-2">AND Gate</h4>
                <p class="text-sm text-blue-800">Output is high only if all inputs are high.</p>
            </div>
            <div class="bg-blue-50/50 p-4 rounded-xl border border-blue-100">
                <h4 class="font-bold text-blue-900 mb-2">OR Gate</h4>
                <p class="text-sm text-blue-800">Output is high if at least one input is high.</p>
            </div>
            <div class="bg-blue-50/50 p-4 rounded-xl border border-blue-100">
                <h4 class="font-bold text-blue-900 mb-2">NOT Gate</h4>
                <p class="text-sm text-blue-800">Output is the complement of the input.</p>
            </div>
        </div>
      </div>
    `,
        procedure: `
      <ol class="list-decimal ml-6 space-y-3 text-slate-600 leading-relaxed">
        <li>Connect the inputs to the logic gate terminals in the simulator.</li>
        <li>Apply different combinations of logic 0 and 1 using the toggle switches.</li>
        <li>Observe the output LED status (ON for 1, OFF for 0).</li>
        <li>Verify with the truth table provided in the manual.</li>
        <li>Repeat the process for all gate types available in the kit.</li>
      </ol>
    `,
    }
};

export default async function PracticalDetail({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const practical = practicalData[Number(id) as keyof typeof practicalData] || practicalData[1];

    return (
        <div className="flex flex-col min-h-screen bg-slate-50 font-sans">
            <Navbar />

            <main className="flex-1 container mx-auto px-4 py-12">
                {/* Breadcrumbs & Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-2 text-sm text-slate-500 mb-6 font-medium">
                        <Link href="/dashboard" className="hover:text-primary transition-colors">Dashboard</Link>
                        <span>/</span>
                        <Link href="/dashboard/dld" className="hover:text-primary transition-colors">Digital Logic & Design</Link>
                        <span>/</span>
                        <span className="text-primary truncate max-w-[200px]">{practical.title}</span>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                        <div>
                            <h1 className="text-3xl font-bold text-slate-900 mb-4">{practical.title}</h1>
                            <div className="flex items-center gap-4 text-sm text-slate-500">
                                <span className="flex items-center gap-1"><BookOpen className="w-4 h-4" /> Theory</span>
                                <span>•</span>
                                <span className="flex items-center gap-1"><CheckCircle className="w-4 h-4" /> Quiz Available</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Content (Theory) */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Aim */}
                        <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                                <div className="w-1 h-6 bg-primary rounded-full"></div>
                                Aim
                            </h2>
                            <p className="text-slate-600 leading-relaxed text-lg">{practical.aim}</p>
                        </section>

                        {/* Theory */}
                        <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                                <div className="w-1 h-6 bg-primary rounded-full"></div>
                                Theory
                            </h2>
                            <div className="prose prose-slate max-w-none prose-headings:font-bold prose-a:text-primary" dangerouslySetInnerHTML={{ __html: practical.theory }} />
                        </section>

                        {/* Procedure */}
                        <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                                <div className="w-1 h-6 bg-primary rounded-full"></div>
                                Procedure
                            </h2>
                            <div className="prose prose-slate max-w-none" dangerouslySetInnerHTML={{ __html: practical.procedure }} />
                        </section>
                    </div>

                    {/* Right Sidebar (Actions) */}
                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-2xl shadow-lg border border-primary/10 sticky top-24">
                            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-4">
                                <CircuitBoard className="w-6 h-6" />
                            </div>
                            <h3 className="font-bold text-xl text-slate-900 mb-2">Ready to Experiment?</h3>
                            <p className="text-slate-500 mb-6 leading-relaxed">
                                Launch the virtual simulator to build this circuit and verify the outputs in real-time.
                            </p>

                            <Link href={`/dashboard/dld/${id}/simulation`}>
                                <Button className="w-full gap-2 text-base font-semibold py-6 shadow-xl shadow-primary/20 hover:shadow-2xl hover:shadow-primary/30 transition-all duration-300">
                                    Launch Simulator <ArrowLeft className="w-4 h-4 rotate-180" />
                                </Button>
                            </Link>

                            <div className="mt-6 pt-6 border-t border-slate-100">
                                <h4 className="font-bold text-sm text-slate-900 mb-4 uppercase tracking-wider">Resources</h4>
                                <ul className="space-y-3">
                                    <li>
                                        <button className="flex items-center gap-3 text-slate-600 hover:text-primary transition-colors text-sm font-medium w-full text-left group">
                                            <span className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                                                <FileText className="w-4 h-4" />
                                            </span>
                                            Datasheet (7400 Series)
                                        </button>
                                    </li>
                                    <li>
                                        <button className="flex items-center gap-3 text-slate-600 hover:text-primary transition-colors text-sm font-medium w-full text-left group">
                                            <span className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                                                <PlayCircle className="w-4 h-4" />
                                            </span>
                                            Video Tutorial
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
