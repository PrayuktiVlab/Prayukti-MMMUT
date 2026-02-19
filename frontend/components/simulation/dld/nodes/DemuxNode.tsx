import { Handle, Position, NodeProps } from '@xyflow/react';

import { LogicSymbolWrapper } from './BaseLogicNode';

export default function DemuxNode({ id, data, selected }: NodeProps) {
    const type = (data.demuxType as string) || '1:4';

    return (
        <LogicSymbolWrapper id={id} label={`DEMUX ${type}`} selected={selected} width="w-24" height="h-32">

            {/* Input (Left) */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2">
                <Handle type="target" position={Position.Left} id="in" className="w-2 h-2 bg-black" />
                <span className="text-[8px] absolute left-3 top-[-8px]">D</span>
            </div>

            {/* Select Lines (Bottom) */}
            <div className="absolute bottom-0 w-full flex justify-center gap-4">
                <div className="relative"><Handle type="target" position={Position.Bottom} id="s0" className="w-2 h-2 bg-blue-500" /><span className="text-[8px] absolute top-[-15px] left-0">S0</span></div>
                {type === '1:4' && <div className="relative"><Handle type="target" position={Position.Bottom} id="s1" className="w-2 h-2 bg-blue-500" /><span className="text-[8px] absolute top-[-15px] left-0">S1</span></div>}
            </div>

            {/* Outputs (Right) */}
            <div className="absolute right-0 top-0 h-full flex flex-col justify-evenly w-full">
                {type === '1:4' ? (
                    <>
                        <div className="relative"><Handle type="source" position={Position.Right} id="y0" className="w-2 h-2 bg-black" /><span className="text-[8px] absolute right-2 top-[-8px]">Y0</span></div>
                        <div className="relative"><Handle type="source" position={Position.Right} id="y1" className="w-2 h-2 bg-black" /><span className="text-[8px] absolute right-2 top-[-8px]">Y1</span></div>
                        <div className="relative"><Handle type="source" position={Position.Right} id="y2" className="w-2 h-2 bg-black" /><span className="text-[8px] absolute right-2 top-[-8px]">Y2</span></div>
                        <div className="relative"><Handle type="source" position={Position.Right} id="y3" className="w-2 h-2 bg-black" /><span className="text-[8px] absolute right-2 top-[-8px]">Y3</span></div>
                    </>
                ) : (
                    <>
                        <Handle type="source" position={Position.Right} id="y0" className="w-2 h-2 bg-black" />
                        <Handle type="source" position={Position.Right} id="y1" className="w-2 h-2 bg-black" />
                    </>
                )}
            </div>
        </LogicSymbolWrapper>
    );
}
