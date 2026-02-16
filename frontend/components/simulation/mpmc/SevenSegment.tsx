"use client";

import React from "react";

interface SevenSegmentProps {
    value: string; // "0"-"F" or " "
    size?: "sm" | "md" | "lg";
    activeColor?: string;
    inactiveColor?: string;
}

const SEGMENT_MAP: Record<string, number[]> = {
    "0": [1, 1, 1, 1, 1, 1, 0],
    "1": [0, 1, 1, 0, 0, 0, 0],
    "2": [1, 1, 0, 1, 1, 0, 1],
    "3": [1, 1, 1, 1, 0, 0, 1],
    "4": [0, 1, 1, 0, 0, 1, 1],
    "5": [1, 0, 1, 1, 0, 1, 1],
    "6": [1, 0, 1, 1, 1, 1, 1],
    "7": [1, 1, 1, 0, 0, 0, 0],
    "8": [1, 1, 1, 1, 1, 1, 1],
    "9": [1, 1, 1, 1, 0, 1, 1],
    "A": [1, 1, 1, 0, 1, 1, 1],
    "B": [0, 0, 1, 1, 1, 1, 1],
    "C": [1, 0, 0, 1, 1, 1, 0],
    "D": [0, 1, 1, 1, 1, 0, 1],
    "E": [1, 0, 0, 1, 1, 1, 1],
    "F": [1, 0, 0, 0, 1, 1, 1],
    " ": [0, 0, 0, 0, 0, 0, 0],
    "H": [0, 1, 1, 0, 1, 1, 1],
    "L": [0, 0, 0, 1, 1, 1, 0],
    "P": [1, 1, 0, 0, 1, 1, 1],
};

/**
 * SevenSegmentDigit Component
 * Segments:
 *    [0] (a)
 * [5]   [1] (f, b)
 *    [6] (g)
 * [4]   [2] (e, c)
 *    [3] (d)
 */
export const SevenSegmentDigit: React.FC<SevenSegmentProps> = ({
    value,
    size = "md",
    activeColor = "#ef4444",
    inactiveColor = "#222"
}) => {
    const segments = SEGMENT_MAP[value.toUpperCase()] || [0, 0, 0, 0, 0, 0, 0];

    const scale = size === "sm" ? 0.5 : size === "lg" ? 1.5 : 1;
    const width = 40 * scale;
    const height = 60 * scale;
    const stroke = 6 * scale;

    return (
        <svg width={width} height={height} viewBox="0 0 40 60" className="drop-shadow-[0_0_2px_rgba(239,68,68,0.2)]">
            {/* a */}
            <rect x="8" y="4" width="24" height={stroke} rx="2" fill={segments[0] ? activeColor : inactiveColor} />
            {/* b */}
            <rect x="32" y="8" width={stroke} height="20" rx="2" fill={segments[1] ? activeColor : inactiveColor} />
            {/* c */}
            <rect x="32" y="32" width={stroke} height="20" rx="2" fill={segments[2] ? activeColor : inactiveColor} />
            {/* d */}
            <rect x="8" y="52" width="24" height={stroke} rx="2" fill={segments[3] ? activeColor : inactiveColor} />
            {/* e */}
            <rect x="4" y="32" width={stroke} height="20" rx="2" fill={segments[4] ? activeColor : inactiveColor} />
            {/* f */}
            <rect x="4" y="8" width={stroke} height="20" rx="2" fill={segments[5] ? activeColor : inactiveColor} />
            {/* g */}
            <rect x="8" y="28" width="24" height={stroke} rx="2" fill={segments[6] ? activeColor : inactiveColor} />
        </svg>
    );
};
