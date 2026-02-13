"use client";

import React from "react";
import { X, Search } from "lucide-react";

interface OpcodeGuideProps {
    onClose: () => void;
}

export const OpcodeGuide: React.FC<OpcodeGuideProps> = ({ onClose }) => {
    const [search, setSearch] = React.useState("");

    const opcodes = [
        { hex: "00", mnem: "NOP", bytes: 1, desc: "No operation" },
        { hex: "01", mnem: "LXI B, d16", bytes: 3, desc: "Load immediate reg pair BC" },
        { hex: "3E", mnem: "MVI A, d8", bytes: 2, desc: "Move immediate to A" },
        { hex: "06", mnem: "MVI B, d8", bytes: 2, desc: "Move immediate to B" },
        { hex: "0E", mnem: "MVI C, d8", bytes: 2, desc: "Move immediate to C" },
        { hex: "16", mnem: "MVI D, d8", bytes: 2, desc: "Move immediate to D" },
        { hex: "1E", mnem: "MVI E, d8", bytes: 2, desc: "Move immediate to E" },
        { hex: "26", mnem: "MVI H, d8", bytes: 2, desc: "Move immediate to H" },
        { hex: "2E", mnem: "MVI L, d8", bytes: 2, desc: "Move immediate to L" },
        { hex: "36", mnem: "MVI M, d8", bytes: 2, desc: "Move immediate to Memory" },
        { hex: "21", mnem: "LXI H, d16", bytes: 3, desc: "Load immediate reg pair HL" },
        { hex: "31", mnem: "LXI SP, d16", bytes: 3, desc: "Load immediate Stack Pointer" },
        { hex: "76", mnem: "HLT", bytes: 1, desc: "Halt execution" },
        { hex: "80", mnem: "ADD B", bytes: 1, desc: "Add B to A" },
        { hex: "87", mnem: "ADD A", bytes: 1, desc: "Add A to A" },
        { hex: "90", mnem: "SUB B", bytes: 1, desc: "Subtract B from A" },
        { hex: "C3", mnem: "JMP adr", bytes: 3, desc: "Unconditional Jump" },
        { hex: "CA", mnem: "JZ adr", bytes: 3, desc: "Jump if Zero" },
        { hex: "C2", mnem: "JNZ adr", bytes: 3, desc: "Jump if Not Zero" },
        { hex: "DA", mnem: "JC adr", bytes: 3, desc: "Jump if Carry" },
        { hex: "D2", mnem: "JNC adr", bytes: 3, desc: "Jump if No Carry" },
        { hex: "CD", mnem: "CALL adr", bytes: 3, desc: "Call subroutine" },
        { hex: "C9", mnem: "RET", bytes: 1, desc: "Return from subroutine" },
        { hex: "32", mnem: "STA adr", bytes: 3, desc: "Store A at address" },
        { hex: "3A", mnem: "LDA adr", bytes: 3, desc: "Load A from address" },
        { hex: "27", mnem: "DAA", bytes: 1, desc: "Decimal Adjust Accumulator" },
        { hex: "C5", mnem: "PUSH B", bytes: 1, desc: "Push BC onto stack" },
        { hex: "D5", mnem: "PUSH D", bytes: 1, desc: "Push DE onto stack" },
        { hex: "E5", mnem: "PUSH H", bytes: 1, desc: "Push HL onto stack" },
        { hex: "F5", mnem: "PUSH PSW", bytes: 1, desc: "Push A and Flags onto stack" },
        { hex: "C1", mnem: "POP B", bytes: 1, desc: "Pop BC from stack" },
        { hex: "D1", mnem: "POP D", bytes: 1, desc: "Pop DE from stack" },
        { hex: "E1", mnem: "POP H", bytes: 1, desc: "Pop HL from stack" },
        { hex: "F1", mnem: "POP PSW", bytes: 1, desc: "Pop A and Flags from stack" },
    ];

    const filtered = opcodes.filter(o =>
        o.mnem.toLowerCase().includes(search.toLowerCase()) ||
        o.hex.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
            <div className="bg-[#1a1a1a] border-2 border-slate-800 w-full max-w-2xl rounded-lg shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
                <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-black/40">
                    <h2 className="text-slate-300 font-bold tracking-widest uppercase text-sm">8085 Opcode Reference</h2>
                    <button onClick={onClose} className="p-1 hover:bg-slate-800 rounded transition-colors text-slate-500">
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <div className="p-4 bg-black/20 flex items-center gap-3">
                    <Search className="h-4 w-4 text-slate-600" />
                    <input
                        type="text"
                        placeholder="Search mnemonic or hex (e.g. MVI, 3E)..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="bg-transparent border-none focus:ring-0 text-slate-300 placeholder:text-slate-700 w-full text-sm"
                    />
                </div>

                <div className="flex-1 overflow-auto p-4 custom-scrollbar">
                    <table className="w-full text-xs text-left">
                        <thead className="text-[10px] text-slate-600 font-black uppercase tracking-widest border-b border-slate-800">
                            <tr>
                                <th className="pb-2">Hex</th>
                                <th className="pb-2">Mnemonic</th>
                                <th className="pb-2 text-center">Bytes</th>
                                <th className="pb-2">Description</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/10 text-slate-400">
                            {filtered.map((o, i) => (
                                <tr key={i} className="hover:bg-slate-800/20 transition-colors group">
                                    <td className="py-2.5 font-mono text-red-500 font-bold group-hover:text-red-400">{o.hex}H</td>
                                    <td className="py-2.5 font-bold text-slate-300">{o.mnem}</td>
                                    <td className="py-2.5 text-center font-mono opacity-60">{o.bytes}</td>
                                    <td className="py-2.5 text-[11px] leading-tight opacity-80">{o.desc}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {filtered.length === 0 && (
                        <div className="text-center py-20 text-slate-700 italic text-sm">No matches found for "{search}"</div>
                    )}
                </div>

                <div className="p-3 bg-black/40 border-t border-slate-800 text-[9px] text-center text-slate-600 font-bold uppercase tracking-[0.3em]">
                    Intel 8085 Instruction Set Reference v1.0
                </div>
            </div>
        </div>
    );
};
