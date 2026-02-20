import { Handle, Position, useReactFlow } from '@xyflow/react';

export default function InputNode({ data, id }: { data: { label?: string; value?: number }; id: string }) {
    const { setNodes } = useReactFlow();
    const isOn = !!data.value;

    const toggle = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent drag events from interfering (though ReactFlow handles usually capture drag)
        setNodes((nds) => nds.map((node) => {
            if (node.id === id) {
                return { ...node, data: { ...node.data, value: !isOn ? 1 : 0 } };
            }
            return node;
        }));
    };

    return (
        <div className="flex flex-col items-center group relative">
            {/* Label - Editable */}
            <input
                className="mb-1 text-[10px] font-bold text-gray-500 uppercase tracking-wider bg-transparent px-1 rounded border border-transparent hover:border-gray-300 focus:border-blue-500 focus:bg-white outline-none text-center w-16 transition-all z-50 pointer-events-auto"
                value={data.label || 'SW'}
                onChange={(evt) => {
                    setNodes((nds) => nds.map((n) => {
                        if (n.id === id) {
                            return { ...n, data: { ...n.data, label: evt.target.value } };
                        }
                        return n;
                    }));
                }}
                onClick={(e) => e.stopPropagation()} // Allow clicking input without selecting node
                onKeyDown={(e) => e.stopPropagation()} // Allow typing without triggering shortcuts
            />

            {/* Container for Switch + Handle */}
            <div className="relative">
                {/* Realistic Switch Body - Click Target */}
                <div
                    className={`relative w-12 h-20 rounded-lg shadow-lg transition-all duration-300 flex flex-col items-center justify-between py-2 cursor-pointer
                        ${isOn ? 'bg-gradient-to-br from-gray-700 to-gray-900 shadow-green-500/20' : 'bg-gradient-to-br from-gray-200 to-gray-300'}
                        border-2 ${isOn ? 'border-gray-600' : 'border-gray-400'}
                    `}
                    onClick={toggle}
                >
                    {/* Screws */}
                    <div className="w-1.5 h-1.5 rounded-full bg-gray-400/50 shadow-inner"></div>

                    {/* Switch Lever Box */}
                    <div className="w-6 h-12 bg-black/20 rounded-md p-0.5 relative pointer-events-none">
                        {/* The Lever */}
                        <div className={`w-full h-1/2 bg-gradient-to-b from-gray-100 to-gray-400 rounded transition-all duration-200 shadow-md transform
                             ${isOn ? 'translate-y-0 bg-green-50' : 'translate-y-full bg-gray-100'}
                         `}>
                            {/* Grip lines */}
                            <div className="w-full h-full flex flex-col justify-center items-center gap-0.5 opacity-30">
                                <div className="w-2/3 h-[1px] bg-black"></div>
                                <div className="w-2/3 h-[1px] bg-black"></div>
                                <div className="w-2/3 h-[1px] bg-black"></div>
                            </div>
                        </div>
                    </div>

                    {/* Screws */}
                    <div className="w-1.5 h-1.5 rounded-full bg-gray-400/50 shadow-inner"></div>

                    {/* LED Indicator (Small) */}
                    <div className={`absolute top-[-4px] right-[-4px] w-3 h-3 rounded-full border border-white/20 shadow-sm transition-all duration-300 ${isOn ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)]' : 'bg-red-900'}`}></div>
                </div>

                {/* Output Handle - OUTSIDE the click target */}
                <Handle
                    type="source"
                    position={Position.Right}
                    id="source"
                    className="!bg-gray-400 !w-3 !h-3 hover:!bg-blue-500 !border-none transition-colors"
                    style={{ right: -6, top: '50%', zIndex: 50 }}
                />
            </div>
        </div>
    );
}
