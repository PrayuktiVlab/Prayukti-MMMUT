import { Handle, Position } from '@xyflow/react';

export default function OutputNode({ data }: { data: { label?: string; value?: number } }) {
    const isOn = !!data.value;

    return (
        <div className="flex flex-col items-center group relative">
            {/* Label */}
            <div className="mb-1 text-[10px] font-bold text-gray-500 uppercase tracking-wider bg-white/80 px-1 rounded backdrop-blur-sm border border-transparent group-hover:border-gray-200 transition-all">
                {data.label || 'LED'}
            </div>

            <div className="relative">
                {/* LED Body */}
                <div className={`
                    relative w-12 h-12 rounded-full border-4 transition-all duration-300 flex items-center justify-center shadow-lg
                    ${isOn ? 'bg-red-500 border-red-600 shadow-[0_0_30px_rgba(239,68,68,0.6)] animate-pulse-slow' : 'bg-red-900 border-gray-700 opacity-80'}
                `}>
                    {/* Reflection/Shine */}
                    <div className="absolute top-2 left-3 w-3 h-2 bg-white rounded-full opacity-40 blur-[1px]"></div>

                    {/* Inner Glow */}
                    {isOn && <div className="absolute inset-0 rounded-full bg-red-400 blur-md opacity-50"></div>}
                </div>

                {/* Inputs Handle - Outside Body */}
                <Handle
                    type="target"
                    position={Position.Left}
                    className="!bg-gray-400 !w-3 !h-3 hover:!bg-blue-500 !border-none transition-colors"
                    style={{ left: -6, top: '50%', zIndex: 50 }}
                />
            </div>

            {/* Base/Legs visualization (Optional decoration) */}
            <div className="flex gap-1 mt-[-2px] -z-10">
                <div className="w-1 h-3 bg-gray-400"></div>
                <div className="w-1 h-3 bg-gray-400"></div>
            </div>
        </div>
    );
}
