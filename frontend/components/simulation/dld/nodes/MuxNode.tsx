import { Handle, Position, NodeProps } from '@xyflow/react';
import { LogicSymbolWrapper } from './BaseLogicNode';

export default function MuxNode({ id, data, selected }: NodeProps) {
    // Determine type from data or default to 4:1
    const type = (data.muxType as string) || '4:1';

    return (
        <LogicSymbolWrapper id={id} label={`MUX ${type}`} selected={selected} width="w-24" height="h-32">

            {/* Inputs (Left) */}
            <div className="absolute left-0 top-0 h-full flex flex-col justify-evenly w-full">
                {type === '4:1' ? (
                    <>
                        <div className="relative"><Handle type="target" position={Position.Left} id="i0" className="w-2 h-2 bg-black" /><span className="text-[8px] absolute left-2 top-[-8px]">I0</span></div>
                        <div className="relative"><Handle type="target" position={Position.Left} id="i1" className="w-2 h-2 bg-black" /><span className="text-[8px] absolute left-2 top-[-8px]">I1</span></div>
                        <div className="relative"><Handle type="target" position={Position.Left} id="i2" className="w-2 h-2 bg-black" /><span className="text-[8px] absolute left-2 top-[-8px]">I2</span></div>
                        <div className="relative"><Handle type="target" position={Position.Left} id="i3" className="w-2 h-2 bg-black" /><span className="text-[8px] absolute left-2 top-[-8px]">I3</span></div>
                    </>
                ) : (
                    <>
                        <Handle type="target" position={Position.Left} id="i0" className="w-2 h-2 bg-black" />
                        <Handle type="target" position={Position.Left} id="i1" className="w-2 h-2 bg-black" />
                    </>
                )}
            </div>

            {/* Select Lines (Bottom) */}
            <div className="absolute bottom-0 w-full flex justify-center gap-4">
                <div className="relative"><Handle type="target" position={Position.Bottom} id="s0" className="w-2 h-2 bg-blue-500" /><span className="text-[8px] absolute top-[-15px] left-0">S0</span></div>
                {type === '4:1' && <div className="relative"><Handle type="target" position={Position.Bottom} id="s1" className="w-2 h-2 bg-blue-500" /><span className="text-[8px] absolute top-[-15px] left-0">S1</span></div>}
            </div>

            {/* Output (Right) */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2">
                <Handle type="source" position={Position.Right} id="out" className="w-2 h-2 bg-black" />
                <span className="text-[8px] absolute right-3 top-[-8px]">Y</span>
            </div>
        </LogicSymbolWrapper>
    );
}
