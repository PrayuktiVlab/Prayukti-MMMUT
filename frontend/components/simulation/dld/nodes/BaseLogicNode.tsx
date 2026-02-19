import { Handle, Position, NodeProps, useReactFlow } from '@xyflow/react';
import React from 'react';

/**
 * Base wrapper for IC-style chips (Mux, Decoder, etc)
 * ensures consistent look without being a "box".
 */
export const LogicSymbolWrapper = ({
    id,
    children,
    label,
    selected,
    width = "w-32",
    height = "h-40"
}: {
    id: string,
    children: React.ReactNode,
    label: string,
    selected?: boolean,
    width?: string,
    height?: string
}) => {
    const { setNodes } = useReactFlow();

    return (
        <div className={`relative ${width} ${height} bg-white border-2 flex flex-col items-center justify-center shadow-sm transition-all ${selected ? 'border-orange-500 shadow-orange-200' : 'border-black'}`}>
            <div className="absolute top-0 w-full bg-gray-50 border-b border-black/10 py-1">
                <input
                    className="w-full text-center text-[10px] uppercase font-bold tracking-widest text-gray-500 bg-transparent outline-none cursor-text hover:text-black hover:bg-white/50 transition-colors"
                    value={label}
                    onChange={(evt) => {
                        setNodes((nds) => nds.map((n) => {
                            if (n.id === id) {
                                return { ...n, data: { ...n.data, label: evt.target.value } };
                            }
                            return n;
                        }));
                    }}
                    onKeyDown={(e) => e.stopPropagation()} // Prevent triggering shortcuts
                    onClick={(e) => e.stopPropagation()}
                />
            </div>
            {children}
        </div>
    );
};
