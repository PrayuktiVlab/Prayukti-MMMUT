import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FlaskConical, BookOpen, FileText, CheckCircle, PlayCircle } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

// Mock Data for Computer Networks
const practicalData = {
    1: {
        title: "OSI vs TCP/IP Reference Models",
        aim: "To study and compare the OSI (Open Systems Interconnection) reference model and the TCP/IP (Transmission Control Protocol/Internet Protocol) model.",
        theory: `
      <div class="space-y-6 text-slate-600 leading-relaxed">
        <p><strong>The OSI Model</strong> is a conceptual framework that standardizes the functions of a communication system into seven abstraction layers. Developed by ISO in 1984, it provides a universal set of rules for networking.</p>
        <p><strong>The TCP/IP Model</strong> is a more simplified and practical model used for the modern internet. It consists of four layers that map to the OSI model's seven layers.</p>
        <div class="bg-blue-50/50 p-6 rounded-xl border border-blue-100">
            <h4 class="font-bold text-blue-900 mb-3 text-lg">Key Differences:</h4>
            <ul class="list-disc ml-6 space-y-2 text-blue-800">
                <li>OSI is a generic, independent model; TCP/IP is based on standard protocols.</li>
                <li>OSI has 7 layers; TCP/IP has 4 layers.</li>
                <li>OSI provides a clear distinction between services, interfaces, and protocols.</li>
            </ul>
        </div>
      </div>
    `,
        procedure: `
      <ol class="list-decimal ml-6 space-y-3 text-slate-600 leading-relaxed">
        <li>Select the OSI vs TCP/IP simulation from the dashboard.</li>
        <li>Click on each layer of the OSI model to understand its functions and protocols.</li>
        <li>Observe the mapping between OSI layers and TCP/IP layers.</li>
        <li>Trigger the "Packet Flow" animation to see how data moves from the Application layer to the Physical layer.</li>
        <li>Review the comparison table and complete the quiz to verify your understanding.</li>
      </ol>
    `,
    },
    2: {
        title: "CSMA/CD Protocol Study",
        aim: "To create a scenario and study the performance of CSMA/CD (Carrier Sense Multiple Access with Collision Detection) protocol through simulation.",
        theory: `
      <div class="space-y-6 text-slate-600 leading-relaxed">
        <p><strong>CSMA/CD</strong> is a media access control method used most notably in early Ethernet technology for local area networking.</p>
        <ul class="list-disc ml-6 space-y-2">
            <li><strong>Carrier Sense:</strong> A node listens to the channel before transmitting.</li>
            <li><strong>Multiple Access:</strong> Multiple nodes share the same physical medium.</li>
            <li><strong>Collision Detection:</strong> If two nodes transmit simultaneously, a collision occurs. Nodes detect this by monitoring signal voltage levels.</li>
        </ul>
        <div class="bg-blue-50/50 p-6 rounded-xl border border-blue-100">
            <h4 class="font-bold text-blue-900 mb-2">Backoff Algorithm:</h4>
            <p class="text-blue-800">After a collision, nodes wait for a random amount of time before retransmitting. The <strong>Binary Exponential Backoff</strong> algorithm is used to determine this wait time, reducing the probability of another collision.</p>
        </div>
      </div>
    `,
        procedure: `
      <ol class="list-decimal ml-6 space-y-3 text-slate-600 leading-relaxed">
        <li>Enter the CSMA/CD simulation workbench.</li>
        <li>Configure the number of nodes, packet size, and transmission probability.</li>
        <li>Start the simulation and observe how nodes sense the carrier.</li>
        <li>Watch for collisions when multiple nodes attempt to transmit.</li>
        <li>Observe the jamming signal and the backoff timers.</li>
        <li>Analyze the throughput and collision statistics in the results section.</li>
      </ol>
    `,
    },
    3: {
        title: "Token Bus and Token Ring Protocols",
        aim: "To create a scenario and study the performance of Token Bus and Token Ring protocols through simulation.",
        theory: `
      <div class="space-y-6 text-slate-600 leading-relaxed">
        <p><strong>Token-based protocols</strong> are collision-free medium access control (MAC) methods that regulate access to a shared channel using a control frame called a <strong>Token</strong>.</p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="p-4 bg-indigo-50/50 border border-indigo-100 rounded-xl">
                <h4 class="font-bold text-indigo-900 mb-2">Token Ring (IEEE 802.5)</h4>
                <p class="text-sm text-indigo-800">Nodes are physically connected in a ring. The token circulates in one direction. A node captures the token to transmit and releases it after the frame returns (source stripping).</p>
            </div>
            <div class="p-4 bg-amber-50/50 border border-amber-100 rounded-xl">
                <h4 class="font-bold text-amber-900 mb-2">Token Bus (IEEE 802.4)</h4>
                <p class="text-sm text-amber-800">Nodes are on a physical bus but form a <strong>logical ring</strong>. The token is passed based on descending node addresses. It combines the physical robustness of a bus with the deterministic nature of a ring.</p>
            </div>
        </div>
        <p>These protocols provide <strong>deterministic access</strong>, meaning a node is guaranteed to get a turn to transmit within a predictable time frame, making them ideal for real-time applications.</p>
      </div>
    `,
        procedure: `
      <ol class="list-decimal ml-6 space-y-3 text-slate-600 leading-relaxed">
        <li>Select the protocol mode: <strong>Token Bus</strong> or <strong>Token Ring</strong> from the lab interface.</li>
        <li>Set the <strong>Number of Nodes</strong> and <strong>Packet Size</strong> for the transmission.</li>
        <li>Observe the <strong>Token Circulation</strong>:
            <ul class="list-disc ml-6 mt-2 opacity-80">
                <li>In Token Ring, see it move physically around the circle.</li>
                <li>In Token Bus, see it jump between nodes in logical order.</li>
            </ul>
        </li>
        <li>Trigger a transmission and follow the <strong>Data Frame</strong> as it travels across the network.</li>
        <li>Monitor the <strong>Throughput</strong> and <strong>Fairness</strong> metrics as multiple nodes compete for access.</li>
        <li>Complete the quiz to evaluate your understanding of predictable network delays.</li>
      </ol>
    `,
    },
    4: {
        title: "Sliding Window Protocols (Stop & Wait, GBN, SR)",
        aim: "To study and analyze the performance of various flow control protocols: Stop & Wait, Go-Back-N, and Selective Repeat.",
        theory: `
      <div class="space-y-6 text-slate-600 leading-relaxed">
        <p><strong>Sliding Window Protocols</strong> are data link layer protocols used for reliable and sequential delivery of data frames. They provide <strong>Flow Control</strong> to ensure a fast sender doesn't overwhelm a slow receiver.</p>
        <div class="grid gap-6">
            <div class="p-4 bg-blue-50/50 border border-blue-100 rounded-xl">
                <h4 class="font-bold text-blue-900 mb-1">Stop & Wait ARQ</h4>
                <p class="text-sm text-blue-800">The sender sends one frame and waits for an acknowledgment (ACK) before sending the next. It is simple but inefficient due to high waiting time.</p>
            </div>
            <div class="p-4 bg-indigo-50/50 border border-indigo-100 rounded-xl">
                <h4 class="font-bold text-indigo-900 mb-1">Go-Back-N (GBN)</h4>
                <p class="text-sm text-indigo-800">Sender can send multiple frames (up to window size 'N') without waiting for ACKs. If a frame is lost, the sender retransmits ALL frames from the lost one onwards. Uses <strong>Cumulative ACKs</strong>.</p>
            </div>
            <div class="p-4 bg-emerald-50/50 border border-emerald-100 rounded-xl">
                <h4 class="font-bold text-emerald-900 mb-1">Selective Repeat (SR)</h4>
                <p class="text-sm text-emerald-800">Similar to GBN, but ONLY the lost frame is retransmitted. The receiver buffers out-of-order frames. It is more efficient but requires more complex logic at both ends.</p>
            </div>
        </div>
      </div>
    `,
        procedure: `
      <ol class="list-decimal ml-6 space-y-3 text-slate-600 leading-relaxed">
        <li>Select the Protocol: <strong>Stop & Wait</strong>, <strong>GBN</strong>, or <strong>Selective Repeat</strong>.</li>
        <li>Set the <strong>Window Size</strong> and <strong>Timeout</strong> values.</li>
        <li>Start the simulation and observe the sequence numbers of transmitted packets.</li>
        <li>Use the <strong>Manual Error Injection</strong> buttons to simulate a "Lost Packet" or "Lost ACK".</li>
        <li>Observe the retransmission behavior (Does it resend one packet or the whole window?).</li>
        <li>Analyze the <strong>Efficiency</strong> and <strong>Throughput</strong> graphs to compare the three methods.</li>
      </ol>
    `,
    },
    5: {
        title: "Error Detection and Correction",
        aim: "To understand and implement error detection (CRC, Checksum) and correction (Hamming Code) mechanisms in data communication.",
        theory: `
          <div class="space-y-6 text-slate-600 leading-relaxed">
            <p><strong>Error Control</strong> is a critical function of the data link layer to ensure data integrity.</p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="p-4 bg-red-50/50 border border-red-100 rounded-xl">
                    <h4 class="font-bold text-red-900 mb-2">Error Detection</h4>
                    <p class="text-sm text-red-800">Techniques like <strong>Cyclic Redundancy Check (CRC)</strong> and <strong>Checksum</strong> add redundant bits to help the receiver detect if data has been corrupted.</p>
                </div>
                <div class="p-4 bg-green-50/50 border border-green-100 rounded-xl">
                    <h4 class="font-bold text-green-900 mb-2">Error Correction</h4>
                    <p class="text-sm text-green-800">Techniques like <strong>Hamming Code</strong> add enough redundancy to not only detect but also <em>correct</em> single-bit errors without retransmission.</p>
                </div>
            </div>
          </div>
        `,
        procedure: `
          <ol class="list-decimal ml-6 space-y-3 text-slate-600 leading-relaxed">
            <li>Choose an algorithm: CRC, Checksum, or Hamming Code.</li>
            <li>Input a data string (e.g., '1011001').</li>
            <li>Observe how the <strong>Redundant Bits</strong> are calculated and appended.</li>
            <li>Simulate the <strong>Channel</strong> by flipping a bit in the transmitted frame.</li>
            <li>Watch the <strong>Receiver's Verification</strong> process to see if the error is detected (and corrected).</li>
          </ol>
        `
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
                        <Link href="/dashboard/cn" className="hover:text-primary transition-colors">Computer Networks</Link>
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
                                <FlaskConical className="w-6 h-6" />
                            </div>
                            <h3 className="font-bold text-xl text-slate-900 mb-2">Ready to Start?</h3>
                            <p className="text-slate-500 mb-6 leading-relaxed">
                                Enter the interactive simulation environment to perform this experiment in real-time.
                            </p>

                            <Link href={`/dashboard/cn/${id}/simulation`}>
                                <Button className="w-full gap-2 text-base font-semibold py-6 shadow-xl shadow-primary/20 hover:shadow-2xl hover:shadow-primary/30 transition-all duration-300">
                                    Launch Simulation <ArrowLeft className="w-4 h-4 rotate-180" />
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
                                            Download Lab Manual
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
