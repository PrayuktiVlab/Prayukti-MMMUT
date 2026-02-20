import React, { memo } from 'react';
import { Handle, Position, NodeProps, useReactFlow } from '@xyflow/react';

interface SvgGateProps extends NodeProps {
    path: string; // The SVG path data for the gate shape
    width?: number;
    height?: number;
    inputs?: number; // Number of input handles (default 2)
    showBubble?: boolean; // For NOT, NAND, NOR, XNOR output bubble
    fillColor?: string;
    strokeColor?: string;
}

export const SvgGateNode = memo(({ id, data, selected, path, width = 60, height = 40, inputs = 2, showBubble = false, fillColor = '#FFFFFF', strokeColor = '#000000' }: SvgGateProps & { path: string }) => {
    const { setNodes } = useReactFlow();

    // Dynamic Input Handles
    const inputHandles = [];
    const handleSpacing = height / (inputs + 1);

    for (let i = 0; i < inputs; i++) {
        inputHandles.push(
            <Handle
                key={`in-${i}`}
                type="target"
                position={Position.Left}
                id={inputs === 1 ? 'a' : String.fromCharCode(97 + i)} // 'a', 'b', etc.
                className="!bg-gray-400 !w-3 !h-3 hover:!bg-blue-500 !border-none transition-colors"
                style={{
                    top: inputs === 1 ? '50%' : (i + 1) * handleSpacing,
                    left: -5,
                    zIndex: 50,
                }}
            />
        );
    }

    return (
        <div className="relative group/node select-none">
            {/* Selection structure - Glow effect instead of box border */}
            <svg
                width={width}
                height={height}
                viewBox={`0 0 ${width} ${height}`}
                className={`overflow-visible transition-all duration-300 ${selected ? 'drop-shadow-[0_0_8px_rgba(255,165,0,0.8)]' : 'drop-shadow-sm'}`}
            >
                <path
                    d={path}
                    fill={fillColor}
                    stroke={selected ? '#f97316' : strokeColor}
                    strokeWidth="2"
                    className="transition-colors"
                />
                {showBubble && (
                    <circle cx={width - 4} cy={height / 2} r="3" fill="white" stroke={selected ? '#f97316' : strokeColor} strokeWidth="2" />
                )}
            </svg>

            {/* Input Handles */}
            {inputHandles}

            {/* Output Handle */}
            <Handle
                type="source"
                position={Position.Right}
                id="source"
                className="!bg-gray-400 !w-3 !h-3 hover:!bg-blue-500 !border-none transition-colors"
                style={{
                    top: '50%',
                    right: -5,
                    zIndex: 50,
                }}
            />

            {/* Label - Editable */}
            <input
                className={`absolute -top-7 left-1/2 -translate-x-1/2 bg-black/80 text-white text-[10px] px-2 py-0.5 rounded whitespace-nowrap z-50 text-center w-16 outline-none border border-transparent focus:border-orange-500 transition-opacity ${selected ? 'opacity-100' : 'opacity-0 group-hover/node:opacity-100'} pointer-events-auto`}
                value={(data.label as string) || ''}
                onChange={(evt) => {
                    setNodes((nds) => nds.map((n) => {
                        if (n.id === id) {
                            return { ...n, data: { ...n.data, label: evt.target.value } };
                        }
                        return n;
                    }));
                }}
                onClick={(e) => e.stopPropagation()}
                onKeyDown={(e) => e.stopPropagation()}
            />
        </div>
    );
});

SvgGateNode.displayName = 'SvgGateNode';
