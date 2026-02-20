import { Handle, Position, NodeProps } from '@xyflow/react';
import { LogicSymbolWrapper } from './BaseLogicNode';

export default function EncoderNode({ id, data, selected }: NodeProps) {
    return (
        <LogicSymbolWrapper id={id} label={data.label as string || "4:2 ENCODER"} selected={selected} width="w-32" height="h-32">
            {/* Inputs (Left) */}
            <div className="absolute left-0 top-0 h-full flex flex-col justify-evenly">
                <div className="relative"><Handle type="target" position={Position.Left} id="i0" className="w-2 h-2 bg-black" /><span className="text-[8px] absolute left-3">I0</span></div>
                <div className="relative"><Handle type="target" position={Position.Left} id="i1" className="w-2 h-2 bg-black" /><span className="text-[8px] absolute left-3">I1</span></div>
                <div className="relative"><Handle type="target" position={Position.Left} id="i2" className="w-2 h-2 bg-black" /><span className="text-[8px] absolute left-3">I2</span></div>
                <div className="relative"><Handle type="target" position={Position.Left} id="i3" className="w-2 h-2 bg-black" /><span className="text-[8px] absolute left-3">I3</span></div>
            </div>

            {/* Outputs (Right) */}
            <div className="absolute right-0 top-0 h-full flex flex-col justify-center gap-6">
                <div className="relative"><Handle type="source" position={Position.Right} id="y0" className="w-2 h-2 bg-black" /><span className="text-[8px] absolute right-3">Y0</span></div>
                <div className="relative"><Handle type="source" position={Position.Right} id="y1" className="w-2 h-2 bg-black" /><span className="text-[8px] absolute right-3">Y1</span></div>
            </div>
        </LogicSymbolWrapper>
    );
}
