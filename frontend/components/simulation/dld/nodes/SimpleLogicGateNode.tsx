import { Handle, Position, NodeProps, useReactFlow } from '@xyflow/react';
import React, { memo } from 'react';

// Common visual styling for gate nodes
interface SimpleLogicGateProps extends NodeProps {
    symbol?: string;     // Text symbol (optional fallback)
    svgPath?: string;    // SVG Path data
    inputs?: number;     // Number of input handles
    showBubble?: boolean; // Show output bubble?
    label: string;       // Default label
}

export const SimpleLogicGateNode = memo(({ id, data, selected, symbol, svgPath, inputs = 2, showBubble = false, label }: SimpleLogicGateProps) => {
    const { setNodes } = useReactFlow();

    // Standard dimensions for the gate body
    const width = 50;
    const height = 40;

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
                    left: -3, // Flush with border
                    zIndex: 50,
                }}
            />
        );
    }

    return (
        <div className="relative group/node w-[50px] h-[40px]">
            {/* SVG Visual Representation */}
            {svgPath ? (
                <svg
                    width={width}
                    height={height}
                    viewBox={`0 0 ${width} ${height}`}
                    className={`overflow-visible pointer-events-none drop-shadow-sm transition-all ${selected ? 'drop-shadow-[0_0_5px_orange]' : ''}`}
                >
                    <path
                        d={svgPath}
                        fill="white"
                        stroke={selected ? "orange" : "black"}
                        strokeWidth="2"
                    />
                    {showBubble && (
                        <circle cx={showBubble ? width + 2 : width} cy={height / 2} r="4" fill="white" stroke={selected ? "orange" : "black"} strokeWidth="2" />
                    )}
                </svg>
            ) : (
                // Fallback for missing path (should not happen if updated correctly)
                <div className={`w-full h-full border-2 bg-white flex items-center justify-center font-bold ${selected ? 'border-orange-500' : 'border-black'}`}>
                    {symbol}
                </div>
            )}

            {/* Hidden interaction layer? No, Handles are interactive. */}

            {/* Input Handles */}
            <div className="absolute inset-0 pointer-events-none">
                {/* We map handles into a container that matches the SVG size */}
                {/* Re-render handles here? No, React Flow handles must be direct children or well-positioned */}
            </div>
            {/* Use absolute positioning directly on Handles relative to the main div */}
            {inputHandles}

            {/* Output Handle */}
            <Handle
                type="source"
                position={Position.Right}
                id="source"
                className="!bg-gray-400 !w-3 !h-3 hover:!bg-blue-500 !border-none transition-colors"
                style={{
                    top: '50%',
                    right: -3, // Flush with border
                    zIndex: 50,
                }}
            />

            {/* Editable Label */}
            <input
                className={`absolute -top-5 left-1/2 -translate-x-1/2 bg-transparent text-center text-[10px] font-bold text-gray-500 uppercase tracking-wider outline-none w-20 hover:text-black focus:text-black transition-colors ${selected ? 'opacity-100' : 'opacity-0 group-hover/node:opacity-100'}`}
                value={(data.label as string) || label}
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

SimpleLogicGateNode.displayName = 'SimpleLogicGateNode';
