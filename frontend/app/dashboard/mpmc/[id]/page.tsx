"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FlaskConical, ChevronRight } from "lucide-react";

// Mock Data for MPMC Experiments
const practicalData = {
  1: {
    title: "Decimal Addition & Subtraction (8085)",
    aim: "Design a virtual lab experiment using the 8085 microprocessor to perform decimal addition and subtraction of two 8-bit numbers.",
    theory: `
      <div class="space-y-4">
        <p><strong>Decimal Arithmetic in 8085:</strong> The 8085 microprocessor performs all arithmetic operations in binary. However, it provides a special instruction <strong>DAA (Decimal Adjust Accumulator)</strong> to perform BCD (Binary Coded Decimal) addition.</p>
        
        <div class="bg-green-50 p-4 rounded-lg border border-green-100">
            <h4 class="font-bold text-green-800 mb-2">Instructions for Decimal Arithmetic:</h4>
            <ul class="list-disc ml-6 space-y-1">
                <li><strong>ADD/ADC:</strong> Used for addition. Result is binary.</li>
                <li><strong>SUB/SBB:</strong> Used for subtraction. Result is binary.</li>
                <li><strong>DAA:</strong> This instruction is used AFTER an addition operation to convert the binary result in the accumulator back to BCD format. Note: There is no 'DAS' instruction for subtraction; special logic must be used.</li>
            </ul>
        </div>

        <p><strong>Flag Registers:</strong> Flag register changes are crucial in decimal arithmetic:</p>
        <ul class="list-disc ml-6 space-y-1">
            <li><strong>CY (Carry):</strong> Set if an addition results in a carry-out of the MSB.</li>
            <li><strong>AC (Auxiliary Carry):</strong> Set if there is a carry from bit 3 to bit 4. Used by DAA.</li>
            <li><strong>Z (Zero):</strong> Set if the result is zero.</li>
            <li><strong>S (Sign):</strong> Set if the MSB of the result is 1.</li>
            <li><strong>P (Parity):</strong> Set if the result has an even number of 1s.</li>
        </ul>
      </div>
    `,
    procedure: `
      <ol class="list-decimal ml-6 space-y-2">
        <li>Initialize memory locations (e.g., 2000H and 2001H) with the two BCD numbers for addition.</li>
        <li>Load the first number into the Accumulator (LDA 2000H).</li>
        <li>Load the second number into a register or add it directly (ADD M).</li>
        <li>Apply the <strong>DAA</strong> instruction to adjust the result to BCD.</li>
        <li>Store the result in a memory location (STA 2002H).</li>
        <li>For subtraction, load the numbers and use the <strong>SUB</strong> instruction, then implement custom BCD adjustment logic (since DAA doesn't work for SUB).</li>
        <li>Observe the flag register changes at each step in the simulation.</li>
      </ol>
    `,
    algorithm: `
      <div class="bg-gray-50 p-4 rounded-lg font-mono text-sm">
        <p><strong>Algorithm for Decimal Addition:</strong></p>
        <ol class="list-decimal ml-6 mt-2">
            <li>Start the program.</li>
            <li>Load the first 8-bit BCD number into Register A.</li>
            <li>Add the second 8-bit BCD number from memory/register to Register A.</li>
            <li>Execute the DAA instruction to convert binary sum to BCD.</li>
            <li>Store the final BCD result into memory.</li>
            <li>Stop the execution.</li>
        </ol>
      </div>
    `,
    assemblyCode: `
      <pre class="bg-gray-800 text-green-400 p-4 rounded-lg text-sm overflow-x-auto">
LXI H, 2000H  ; Point HL to the first number
MOV A, M      ; Get first number in A
INX H         ; Point HL to second number
ADD M         ; Add second number to A
DAA           ; Decimal Adjust Accumulator
INX H         ; Point to result address
MOV M, A      ; Store result
HLT           ; Halt program</pre>
    `
  },
  2: {
    title: "Hexadecimal Addition & Subtraction (8085)",
    aim: "Design a virtual lab experiment using the 8085 microprocessor to perform hexadecimal addition and subtraction of two 8-bit numbers.",
    theory: `
      <div class="space-y-4">
        <p><strong>Hexadecimal Number System:</strong> Hexadecimal is a base-16 system using digits 0-9 and letters A-F. It is widely used in computing because it provides a more human-friendly representation of binary values (each hex digit represents 4 bits).</p>
        
        <div class="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <h4 class="font-bold text-blue-800 mb-2">Binary Arithmetic Behind Hex:</h4>
            <p>The 8085 microprocessor inherently performs arithmetic in binary/hexadecimal. Unlike BCD arithmetic, no adjustment instruction like DAA is needed for standard hex addition or subtraction.</p>
        </div>

        <p><strong>Carry and Borrow:</strong></p>
        <ul class="list-disc ml-6 space-y-1">
            <li><strong>Carry:</strong> For addition, a carry is generated if the result exceeds FFH (255 in decimal).</li>
            <li><strong>Borrow:</strong> For subtraction, a borrow (indicated by the Carry flag) is generated if the subtrahend is greater than the minuend.</li>
        </ul>
      </div>
    `,
    procedure: `
      <ol class="list-decimal ml-6 space-y-2">
        <li>Enter two 8-bit hex numbers at memory locations 2000H and 2001H.</li>
        <li>Load the first number into the Accumulator.</li>
        <li>Add or subtract the second number from the Accumulator.</li>
        <li>Observe the updated HEX result in the Accumulator.</li>
        <li>Check the Flag Register for S, Z, AC, P, and CY status.</li>
        <li>Store the final result at 2002H.</li>
      </ol>
    `,
    algorithm: `
      <div class="bg-gray-50 p-4 rounded-lg font-mono text-sm">
        <p><strong>Algorithm for Hex Addition:</strong></p>
        <ol class="list-decimal ml-6 mt-2">
            <li>Start.</li>
            <li>Get the first number in A.</li>
            <li>Add the second number to A.</li>
            <li>Store the sum in memory.</li>
            <li>Stop.</li>
        </ol>
      </div>
    `,
    assemblyCode: `
      <pre class="bg-gray-800 text-green-400 p-4 rounded-lg text-sm overflow-x-auto">
LDA 2000H     ; Load first number in A
LXI H, 2001H  ; Load address of second number
ADD M         ; Add second number
STA 2002H     ; Store result
HLT           ; Halt</pre>
    `
  },
  3: {
    title: "Addition & Subtraction of Two BCD Numbers (8085)",
    aim: "To write an assembly language program for the 8085 microprocessor to perform the addition and subtraction of two 8-bit BCD (Binary Coded Decimal) numbers.",
    theory: `
      <div class="space-y-4">
        <p><strong>BCD Arithmetic:</strong> In BCD, each decimal digit (0-9) is represented by a 4-bit binary code. When two BCD numbers are added, the result might not be a valid BCD number if the sum of any two digits exceeds 9 or if there is a carry.</p>
        
        <div class="bg-orange-50 p-4 rounded-lg border border-orange-100">
            <h4 class="font-bold text-orange-800 mb-2">The Decimal Adjust Logic:</h4>
            <p>The <strong>DAA</strong> instruction is used to correct the result of BCD addition. It checks the lower nibble and the AC flag, then the upper nibble and the CY flag, adding 6 where necessary to skip illegal codes (A-F).</p>
        </div>

        <p><strong>Subtraction via Complement:</strong> For BCD subtraction, we often use 10's complement. This involves subtracting each digit from 9 (9's complement) and then adding 1 to the result.</p>
      </div>
    `,
    procedure: `
      <ol class="list-decimal ml-6 space-y-2">
        <li>Load the two BCD numbers into memory locations 2000H and 2001H.</li>
        <li>For Addition: Load numbers, ADD them, and apply DAA.</li>
        <li>For Subtraction: Find the 10's complement of the subtrahend and add it to the minuend, then adjust.</li>
        <li>Observe the Accumulator and Flag Register in the simulator.</li>
        <li>Verify results at memory location 2002H.</li>
      </ol>
    `,
    algorithm: `
      <div class="bg-gray-50 p-4 rounded-lg font-mono text-sm">
        <p><strong>Algorithm for BCD Addition:</strong></p>
        <ol class="list-decimal ml-6 mt-2">
            <li>Initialize HL pair for result.</li>
            <li>Get first BCD number in A.</li>
            <li>Add second BCD number.</li>
            <li>Apply DAA for adjustment.</li>
            <li>Store result and Stop.</li>
        </ol>
      </div>
    `,
    assemblyCode: `
      <pre class="bg-gray-800 text-green-400 p-4 rounded-lg text-sm overflow-x-auto">
LXI H, 2000H  ; First BCD Number Address
MOV A, M      ; Load first BCD
INX H         ; Second BCD Number Address
ADD M         ; BCD Addition
DAA           ; BCD Adjustment
STA 2002H     ; Store Result
HLT           ; Halt</pre>
    `
  }
};

export default function PracticalDetail({ params }: { params: any }) {
  // Handling params as a promise or direct object depending on Next.js version/setup
  // For this environment, we'll treat it as a direct param from the URL path
  const id = params?.id || "1";
  const practical = (practicalData as any)[id] || practicalData[1];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white border-b shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Link href="/dashboard/mpmc" className="text-gray-500 hover:text-black hover:bg-gray-100 p-1 rounded-full transition-colors">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <span className="text-gray-300">|</span>
          <h1 className="text-lg font-bold text-gray-800 truncate">{practical.title}</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 flex-1 grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Left Content (Theory) */}
        <div className="lg:col-span-2 space-y-8">
          <section className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-xl font-bold text-[#2e7d32] mb-4 border-b pb-2">Aim</h2>
            <p className="text-gray-700">{practical.aim}</p>
          </section>

          <section className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex border-b mb-4">
              <h2 className="text-xl font-bold text-[#2e7d32] pb-2 border-b-2 border-[#2e7d32]">Theory</h2>
            </div>
            <div className="text-gray-700 prose max-w-none" dangerouslySetInnerHTML={{ __html: practical.theory }} />
          </section>

          <section className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-xl font-bold text-[#2e7d32] mb-4 border-b pb-2">Procedure</h2>
            <ul className="text-gray-700" dangerouslySetInnerHTML={{ __html: practical.procedure }} />
          </section>

          <section className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-xl font-bold text-[#2e7d32] mb-4 border-b pb-2">Algorithm & Assembly Code</h2>
            <div className="space-y-4">
              <div dangerouslySetInnerHTML={{ __html: practical.algorithm }} />
              <div dangerouslySetInnerHTML={{ __html: practical.assemblyCode }} />
            </div>
          </section>
        </div>

        {/* Right Sidebar (Actions) */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-md border border-green-200">
            <h3 className="font-bold text-lg mb-2 text-green-900">Start Experiment</h3>
            <p className="text-sm text-gray-500 mb-6">
              Enter the virtual 8085 simulator to perform decimal addition and subtraction.
            </p>
            <Link href={`/dashboard/mpmc/${id}/simulation`}>
              <Button className="w-full bg-[#2e7d32] hover:bg-[#1b5e20] text-lg font-bold py-6 shadow-lg hover:shadow-xl transition-all">
                <FlaskConical className="mr-2 h-6 w-6" />
                Enter Simulation
              </Button>
            </Link>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border text-[#2e7d32]">
            <h3 className="font-bold text-md mb-4 text-gray-800">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li className="cursor-pointer hover:underline">8085 Instruction Set</li>
              <li className="cursor-pointer hover:underline">Decimal Adjustment Logic</li>
              <li className="cursor-pointer hover:underline">Viva Question Bank</li>
            </ul>
          </div>
        </div>

      </main>
    </div>
  );
}
