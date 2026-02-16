"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Intel8085 } from "@/lib/mpmc/8085-cpu";
import {
    Activity,
    Database,
    Hash,
    Cpu,
    ChevronRight,
    Terminal,
    HelpCircle,
    Monitor
} from "lucide-react";
import { OpcodeGuide } from "./OpcodeGuide";
import { SevenSegmentDigit } from "./SevenSegment";

interface TrainerKitProps {
    cpu: Intel8085;
    onSync: () => void;
}

type KitMode = "IDLE" | "ADDRESS_SET" | "WRITE" | "EXEC_ADDR" | "EXAMINE_REG";

export const TrainerKit: React.FC<TrainerKitProps> = ({ cpu, onSync }) => {
    const [mode, setMode] = useState<KitMode>("IDLE");
    const [currentAddress, setCurrentAddress] = useState(0x0000);
    const [selectedRegister, setSelectedRegister] = useState<string | null>(null);
    const [buffer, setBuffer] = useState("");
    const [feedback, setFeedback] = useState("8085 READY. PRESS 'M' (Examine Memory), 'R' (Examine Register), or 'G' (Go).");
    const [isRunning, setIsRunning] = useState(false);
    const [showGuide, setShowGuide] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isFocused, setIsFocused] = useState(false);
    const stopRef = useRef(false);

    const sync = useCallback(() => {
        onSync();
    }, [onSync]);

    const handleStep = useCallback(() => {
        if (cpu.isHalted) {
            setFeedback("HALTED. RESET TO CONTINUE.");
            return;
        }
        const result = cpu.step();
        sync();
        setFeedback(`STEP: ${result.mnemonic} @ ${result.pc.toString(16).toUpperCase().padStart(4, "0")}H`);
    }, [cpu, sync]);

    const handleRun = useCallback(async (startAddr: number) => {
        if (isRunning) return;
        cpu.registers.PC = startAddr;
        cpu.isHalted = false;
        setIsRunning(true);
        stopRef.current = false;
        setMode("IDLE");
        setFeedback(`RUNNING...`);

        try {
            let opsSinceYield = 0;
            while (!cpu.isHalted && !stopRef.current) {
                cpu.step();
                opsSinceYield++;

                if (opsSinceYield >= 100) {
                    sync();
                    await new Promise(r => setTimeout(r, 0));
                    opsSinceYield = 0;
                }
            }
        } catch (e: any) {
            setFeedback(`ERROR: ${e.message}`);
        }

        setIsRunning(false);
        sync();
        setFeedback(cpu.isHalted ? `HALTED @ ${cpu.registers.PC.toString(16).toUpperCase().padStart(4, "0")}H` : "STOPPED.");
    }, [cpu, isRunning, sync]);

    const handleReset = useCallback(() => {
        stopRef.current = true;
        cpu.reset();
        setMode("IDLE");
        setCurrentAddress(0x0000);
        setBuffer("");
        setSelectedRegister(null);
        setFeedback("8085 RESET.");
        sync();
    }, [cpu, sync]);

    const handleKeyDown = useCallback((e: KeyboardEvent | React.KeyboardEvent) => {
        // FOCUS SAFETY: Don't trigger shortcuts if user is typing in an input or textarea
        const activeElement = document.activeElement;
        if (activeElement && (activeElement.tagName === "INPUT" || activeElement.tagName === "TEXTAREA")) {
            return;
        }

        // Prevent default browser shortcuts that we use
        if (["F5", "F7", "F8", "ArrowUp", "ArrowDown", "Enter"].includes(e.key)) {
            e.preventDefault();
        }

        const key = e.key.toUpperCase();

        // Global Reset
        if (key === "F1" || (e.ctrlKey && key === "R")) {
            handleReset();
            return;
        }

        if (key === "ESCAPE") {
            setMode("IDLE");
            setBuffer("");
            setFeedback("IDLE. READY.");
            return;
        }

        // State Machine
        switch (mode) {
            case "IDLE":
                if (key === "M" || key === "A" || key === ".") {
                    setMode("ADDRESS_SET");
                    setBuffer("");
                    setFeedback("SET ADDRESS: TYPE 4 HEX DIGITS");
                } else if (key === "R") {
                    setMode("EXAMINE_REG");
                    setBuffer("");
                    setSelectedRegister("A");
                    setFeedback("EXAMINE REGISTER: A");
                } else if (key === "G") {
                    setMode("EXEC_ADDR");
                    setBuffer("");
                    setFeedback("GO TO: TYPE START ADDRESS");
                } else if (key === "S" || key === "F7") {
                    handleStep();
                } else if (key === "F5") {
                    handleRun(currentAddress);
                }
                break;

            case "ADDRESS_SET":
                if (/^[0-9A-F]$/.test(key)) {
                    if (buffer.length < 4) setBuffer(prev => prev + key);
                } else if (key === "BACKSPACE") {
                    setBuffer(prev => prev.slice(0, -1));
                } else if (key === "ENTER" || key === ",") {
                    const addr = parseInt(buffer.padStart(4, "0"), 16);
                    setCurrentAddress(addr);
                    setMode("WRITE");
                    setBuffer("");
                    setFeedback(`MEMORY @ ${addr.toString(16).toUpperCase().padStart(4, "0")}H`);
                    sync();
                }
                break;

            case "WRITE":
                if (/^[0-9A-F]$/.test(key)) {
                    if (buffer.length < 2) setBuffer(prev => prev + key);
                } else if (key === "BACKSPACE") {
                    setBuffer(prev => prev.slice(0, -1));
                } else if (key === "ENTER" || key === "ARROWDOWN") {
                    // NEXT (Increment address)
                    const val = parseInt(buffer || cpu.readByte(currentAddress).toString(16), 16);
                    cpu.writeByte(currentAddress, val);
                    const nextAddr = (currentAddress + 1) & 0xFFFF;
                    setCurrentAddress(nextAddr);
                    setBuffer("");
                    setFeedback(`MEMORY @ ${nextAddr.toString(16).toUpperCase().padStart(4, "0")}H`);
                    sync();
                } else if (key === "," || key === "ARROWUP") {
                    // PREVIOUS (Decrement address)
                    const val = parseInt(buffer || cpu.readByte(currentAddress).toString(16), 16);
                    cpu.writeByte(currentAddress, val);
                    const prevAddr = (currentAddress - 1) & 0xFFFF;
                    setCurrentAddress(prevAddr);
                    setBuffer("");
                    setFeedback(`MEMORY @ ${prevAddr.toString(16).toUpperCase().padStart(4, "0")}H`);
                    sync();
                } else if (key === "M") {
                    setMode("ADDRESS_SET");
                    setBuffer("");
                }
                break;

            case "EXAMINE_REG":
                const regKeys: Record<string, string> = {
                    'A': 'A', 'B': 'B', 'C': 'C', 'D': 'D', 'E': 'E', 'H': 'H', 'L': 'L'
                };

                // If we have a buffer, numeric/hex keys are always digits
                if (buffer.length > 0 && /^[0-9A-F]$/.test(key)) {
                    const maxLen = (selectedRegister === "PC" || selectedRegister === "SP") ? 4 : 2;
                    if (buffer.length < maxLen) setBuffer(prev => prev + key);
                    return;
                }

                // Otherwise, check for register selection or digits
                if (regKeys[key]) {
                    setSelectedRegister(regKeys[key]);
                    setBuffer("");
                    setFeedback(`REGISTER ${key}`);
                } else if (key === "S") {
                    setSelectedRegister("SP");
                    setBuffer("");
                    setFeedback(`SP`);
                } else if (key === "P") {
                    setSelectedRegister("PC");
                    setBuffer("");
                    setFeedback(`PC`);
                } else if (/^[0-9A-F]$/.test(key)) {
                    // First digit starts the buffer
                    setBuffer(key);
                } else if (key === "ENTER" || key === "ARROWDOWN") {
                    // NEXT REG (Cycle A -> B -> C -> D -> E -> H -> L -> PC -> SP)
                    if (buffer) {
                        const val = parseInt(buffer, 16);
                        if (selectedRegister === "PC") cpu.registers.PC = val;
                        else if (selectedRegister === "SP") cpu.registers.SP = val;
                        else (cpu.registers as any)[selectedRegister!] = val & 0xFF;
                        setBuffer("");
                        sync();
                    }

                    const nextRegMap: Record<string, string> = {
                        'A': 'B', 'B': 'C', 'C': 'D', 'D': 'E', 'E': 'H', 'H': 'L', 'L': 'PC', 'PC': 'SP', 'SP': 'A'
                    };
                    const next = nextRegMap[selectedRegister || 'A'] || 'A';
                    setSelectedRegister(next);
                    setFeedback(`REGISTER ${next}`);
                } else if (key === "ARROWUP") {
                    // PREV REG
                    const prevRegMap: Record<string, string> = {
                        'B': 'A', 'C': 'B', 'D': 'C', 'E': 'D', 'H': 'E', 'L': 'H', 'PC': 'L', 'SP': 'PC', 'A': 'SP'
                    };
                    const prev = prevRegMap[selectedRegister || 'A'] || 'A';
                    setSelectedRegister(prev);
                    setFeedback(`REGISTER ${prev}`);
                }
                break;

            case "EXEC_ADDR":
                if (/^[0-9A-F]$/.test(key)) {
                    if (buffer.length < 4) setBuffer(prev => prev + key);
                } else if (key === "ENTER") {
                    const addr = parseInt(buffer.padStart(4, "0"), 16);
                    handleRun(addr);
                }
                break;
        }
    }, [mode, buffer, cpu, currentAddress, isRunning, sync, handleStep, handleRun, handleReset, selectedRegister]);

    const handleIOExamine = () => {
        setFeedback("I/O PORTS: Port 00H-FFH support (Read only in simulator)");
    };

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [handleKeyDown]);

    // Display Helper Logic
    const displayAddressHex = (() => {
        if (mode === "ADDRESS_SET" || mode === "EXEC_ADDR") return buffer.padStart(4, " ");
        if (mode === "EXAMINE_REG") {
            if (selectedRegister === "PC") return "P C ";
            if (selectedRegister === "SP") return "S P ";
            return "   " + (selectedRegister || " ");
        }
        return currentAddress.toString(16).toUpperCase().padStart(4, "0");
    })();

    const displayDataHex = (() => {
        if (mode === "WRITE") return buffer.padStart(2, " ");
        if (mode === "EXAMINE_REG" && selectedRegister) {
            if (buffer) {
                if (selectedRegister === "PC" || selectedRegister === "SP") return buffer.slice(-4).padStart(4, " "); // Show typed bits
                return buffer.padStart(2, " ");
            }
            const val = selectedRegister === "PC" ? cpu.registers.PC :
                selectedRegister === "SP" ? cpu.registers.SP :
                    (cpu.registers as any)[selectedRegister];
            return val.toString(16).toUpperCase().padStart(selectedRegister === "PC" || selectedRegister === "SP" ? 4 : 2, "0");
        }
        return cpu.readByte(currentAddress).toString(16).toUpperCase().padStart(2, "0");
    })();

    return (
        <div
            ref={containerRef}
            tabIndex={0}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="trainer-panel p-6 rounded-3xl border-4 border-slate-900 shadow-2xl relative overflow-hidden ring-1 ring-white/10 outline-none focus:ring-2 focus:ring-[#2e7d32]/50 transition-all"
        >
            {/* Glossy Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />

            <div className="relative z-10 flex flex-col gap-6">
                {/* Header Area */}
                <div className="flex justify-between items-start border-b border-[#222] pb-4">
                    <div className="flex flex-col">
                        <div className="flex items-center gap-3">
                            <h2 className="text-xl font-bold text-slate-400 tracking-tighter">MP-8085 / VLAB-T01</h2>
                            {isFocused && (
                                <div className="flex items-center gap-1 bg-[#2e7d32]/20 px-2 py-0.5 rounded border border-[#2e7d32]/30">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#39ff14] animate-pulse" />
                                    <span className="text-[8px] font-bold text-[#39ff14] uppercase">Keyboard Active</span>
                                </div>
                            )}
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                            <div className={`w-2 h-2 rounded-full ${isRunning ? "bg-red-500 animate-pulse shadow-[0_0_8px_#f00]" : "bg-red-900"}`} />
                            <span className="text-[9px] font-black text-slate-700 uppercase tracking-widest">{isRunning ? "RUNNING" : "READY"}</span>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <button
                            onClick={() => setShowGuide(true)}
                            className="flex items-center gap-2 px-3 py-1.5 bg-[#222] hover:bg-[#333] border border-[#444] rounded text-slate-400 text-[10px] font-bold transition-all active:scale-95"
                        >
                            <HelpCircle className="h-3.5 w-3.5" /> OPCODE GUIDE
                        </button>
                        <div className="hidden sm:flex flex-col items-end">
                            <span className="text-[8px] font-black text-slate-700 uppercase tracking-widest">Advanced Microprocessor</span>
                            <span className="text-[8px] font-black text-slate-800 uppercase tracking-widest">Training Environment</span>
                        </div>
                    </div>
                </div>

                {showGuide && <OpcodeGuide onClose={() => setShowGuide(false)} />}

                {/* Display Console */}
                <div className="bg-black p-8 rounded border-b-4 border-r-4 border-[#222] mb-8 shadow-inner flex justify-center gap-12 overflow-hidden">
                    {/* Address LED */}
                    <div className="space-y-2">
                        <div className="text-[10px] text-slate-800 font-black uppercase tracking-widest text-center">Address / Reg</div>
                        {/* Address Side */}
                        <div className="flex gap-1 bg-black/40 p-2 rounded-lg border border-white/5 shadow-inner">
                            {displayAddressHex.padStart(4, " ").split('').map((char: string, i: number) => (
                                <SevenSegmentDigit key={`addr-${i}`} value={char} size="lg" activeColor="#ff3131" />
                            ))}
                        </div>

                        {/* Divider */}
                        <div className="h-12 w-[2px] bg-gradient-to-b from-transparent via-white/10 to-transparent mx-2 invisible md:visible" />

                        {/* Data Side */}
                        <div className="flex gap-1 bg-black/40 p-2 rounded-lg border border-white/5 shadow-inner">
                            {displayDataHex.padStart(2, " ").split('').map((char: string, i: number) => (
                                <SevenSegmentDigit key={`data-${i}`} value={char} size="lg" activeColor="#ff3131" />
                            ))}
                        </div>
                    </div>
                    {/* Data LED */}
                    <div className="space-y-2">
                        <div className="text-[10px] text-slate-800 font-black uppercase tracking-widest text-center">Data / Value</div>
                        <div className="flex gap-1 bg-black/40 p-2 rounded-lg border border-white/5 shadow-inner">
                            {displayDataHex.padStart(2, " ").split('').map((char: string, i: number) => (
                                <SevenSegmentDigit key={`data-${i}`} value={char} size="lg" activeColor="#ff3131" />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-12 gap-6">
                    {/* Left: Registers and Flags */}
                    <div className="col-span-8 space-y-6">
                        <div className="bg-[#121212] p-4 rounded border border-[#222]">
                            <div className="text-[10px] text-slate-600 font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
                                <Cpu className="h-3 w-3" /> Register Matrix
                            </div>
                            <div className="grid grid-cols-4 gap-3">
                                {['A', 'B', 'C', 'D', 'E', 'H', 'L'].map(reg => (
                                    <StatBox
                                        key={reg}
                                        label={reg}
                                        val={cpu.registers[reg as keyof typeof cpu.registers]}
                                        active={selectedRegister === reg}
                                    />
                                ))}
                                <StatBox
                                    label="M"
                                    val={cpu.readByte(cpu.getHL())}
                                    active={false}
                                />
                            </div>
                            <div className="mt-4 pt-4 border-t border-[#222] flex justify-between gap-4 items-center">
                                <div className="flex gap-4">
                                    <RegisterPair label="PC" val={cpu.registers.PC} active={selectedRegister === "PC"} />
                                    <RegisterPair label="SP" val={cpu.registers.SP} active={selectedRegister === "SP"} />
                                </div>

                                {/* Discrete Flag LED Strip */}
                                <div className="flex items-center gap-6 px-4 py-2 bg-black/30 rounded-xl border border-white/5">
                                    {["S", "Z", "AC", "P", "CY"].map((f) => {
                                        const active = (cpu.flags as any)[f];
                                        return (
                                            <div key={f} className="flex flex-col items-center gap-1">
                                                <div className="text-[9px] text-slate-500 font-bold">{f}</div>
                                                <div className={`w-3 h-3 rounded-full transition-all duration-300 ${active ? "bg-red-500 shadow-[0_0_8px_#ef4444]" : "bg-red-950/30"}`} />
                                            </div>
                                        );
                                    })}
                                </div>

                                <div className="bg-black/20 p-2 rounded flex items-center gap-3 border border-[#222]">
                                    <Monitor className="h-3 w-3 text-slate-700" />
                                    <div className="flex flex-col">
                                        <span className="text-[7px] text-slate-800 font-bold uppercase">I/O Port 01H</span>
                                        <span className="text-xs font-mono text-slate-600">00H</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Status & Feedback */}
                        <div className="bg-[#0a0a0a] border border-[#222] p-3 rounded flex items-center gap-3">
                            <Terminal className="h-4 w-4 text-green-700" />
                            <span className="text-xs text-green-800 font-bold uppercase tracking-tighter truncate">{feedback}</span>
                        </div>

                        {/* Keyboard Help */}
                        <div className="grid grid-cols-4 gap-2">
                            <KeyHelp k="M" t="Exm Mem" />
                            <KeyHelp k="R" t="Exm Reg" />
                            <KeyHelp k="G" t="Go" />
                            <KeyHelp k="S" k2="F7" t="Step" />
                            <KeyHelp k="F5" t="Run" />
                            <KeyHelp k="ENT / ↓" t="Next" />
                            <KeyHelp k=", / ↑" t="Prev" />
                            <KeyHelp k="ESC" t="Reset" />
                        </div>

                        {/* Memory Trace Panel */}
                        <div className="bg-[#050505] p-3 rounded border border-[#222]">
                            <div className="text-[10px] text-slate-700 font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
                                <Hash className="h-3 w-3" /> Memory Peek (PC Range)
                            </div>
                            <div className="grid grid-cols-8 gap-1">
                                {Array.from({ length: 16 }).map((_, i) => {
                                    const addr = (cpu.registers.PC - 4 + i) & 0xFFFF;
                                    const val = cpu.readByte(addr);
                                    const isPC = addr === cpu.registers.PC;
                                    return (
                                        <div key={addr} className={`flex flex-col items-center p-1 rounded border ${isPC ? "bg-red-900/40 border-red-500/50" : "bg-black border-[#111]"}`}>
                                            <span className="text-[7px] text-slate-800 font-bold">{addr.toString(16).toUpperCase().padStart(4, "0")}</span>
                                            <span className={`text-[11px] font-bold ${isPC ? "text-red-500" : "text-slate-600"}`}>{val.toString(16).toUpperCase().padStart(2, "0")}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Right: Keypad */}
                    <div className="col-span-4 bg-[#1a1a1a] p-4 rounded border border-[#333] shadow-lg">
                        <div className="grid grid-cols-4 gap-2">
                            {['C', 'D', 'E', 'F', '8', '9', 'A', 'B', '4', '5', '6', '7', '0', '1', '2', '3'].map(k => (
                                <button
                                    key={k}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleKeyDown({ key: k, preventDefault: () => { } } as any);
                                    }}
                                    className="h-10 bg-[#333] hover:bg-[#444] text-slate-200 rounded font-black border-b-2 border-black active:translate-y-0.5 transition-all text-sm"
                                >
                                    {k}
                                </button>
                            ))}
                        </div>
                        <div className="grid grid-cols-2 gap-2 mt-4">
                            <button onClick={(e) => { e.stopPropagation(); handleKeyDown({ key: 'ENTER', preventDefault: () => { } } as any); }} className="h-10 bg-[#444] hover:bg-[#555] text-white rounded font-bold text-xs">NEXT</button>
                            <button onClick={(e) => { e.stopPropagation(); handleKeyDown({ key: 'M', preventDefault: () => { } } as any); }} className="h-10 bg-[#444] hover:bg-[#555] text-white rounded font-bold text-xs">EXM MEM</button>
                            <button onClick={(e) => { e.stopPropagation(); handleKeyDown({ key: 'G', preventDefault: () => { } } as any); }} className="h-10 bg-[#cc3333] hover:bg-[#dd4444] text-white rounded font-bold text-xs">EXEC</button>
                            <button onClick={(e) => { e.stopPropagation(); handleKeyDown({ key: 'ESCAPE', preventDefault: () => { } } as any); }} className="h-10 bg-[#222] hover:bg-[#333] text-gray-400 rounded font-bold text-xs">RESET</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const StatBox = ({ label, val, active }: { label: string, val: number, active: boolean }) => (
    <div className={`p-2 rounded border transition-all ${active ? "bg-red-900/20 border-red-500/50 shadow-[0_0_10px_rgba(239,68,68,0.2)]" : "bg-black/40 border-[#222]"}`}>
        <div className="text-[8px] text-slate-700 font-bold mb-1">{label}</div>
        <div className={`text-xl font-bold ${active ? "text-red-500" : "text-slate-500"}`}>
            {val.toString(16).toUpperCase().padStart(2, "0")}
        </div>
    </div>
);

const RegisterPair = ({ label, val, active }: { label: string, val: number, active: boolean }) => (
    <div className={`p-2 px-4 rounded border transition-all flex items-center gap-4 ${active ? "bg-red-900/20 border-red-500/50" : "bg-black/40 border-[#222]"}`}>
        <div className="text-[9px] text-slate-700 font-bold">{label}</div>
        <div className={`text-lg font-bold ${active ? "text-red-500" : "text-slate-500"}`}>
            {val.toString(16).toUpperCase().padStart(4, "0")}
        </div>
    </div>
);

const KeyHelp = ({ k, k2, t }: { k: string, k2?: string, t: string }) => (
    <div className="flex flex-col items-center bg-black/40 p-1 rounded border border-[#222]">
        <span className="text-[8px] text-slate-400 font-black">{k}{k2 ? ` / ${k2}` : ''}</span>
        <span className="text-[7px] text-slate-700 font-bold uppercase">{t}</span>
    </div>
);
