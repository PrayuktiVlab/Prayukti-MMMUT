import { Handle, Position, NodeProps } from '@xyflow/react';
import { LogicSymbolWrapper } from './BaseLogicNode';

export default function DecoderNode({ id, data, selected }: NodeProps) {
    return (
        <LogicSymbolWrapper id={id} label={data.label as string || "2:4 DECODER"} selected={selected} width="w-32" height="h-40">
            {/* Inputs (Left) */}
            <div className="absolute left-0 top-0 h-full flex flex-col justify-center gap-6">
                <div className="relative"><Handle type="target" position={Position.Left} id="a" className="w-2 h-2 bg-black" /><span className="text-[8px] absolute left-3">A</span></div>
                <div className="relative"><Handle type="target" position={Position.Left} id="b" className="w-2 h-2 bg-black" /><span className="text-[8px] absolute left-3">B</span></div>
                <div className="relative mt-4"><Handle type="target" position={Position.Left} id="en" className="w-2 h-2 bg-red-500" /><span className="text-[8px] absolute left-3">E</span></div>
            </div>

            {/* Outputs (Right) */}
            <div className="absolute right-0 top-0 h-full flex flex-col justify-evenly">
                <div className="relative"><Handle type="source" position={Position.Right} id="y0" className="w-2 h-2 bg-black" /><span className="text-[8px] absolute right-3">Y0</span></div>
                <div className="relative"><Handle type="source" position={Position.Right} id="y1" className="w-2 h-2 bg-black" /><span className="text-[8px] absolute right-3">Y1</span></div>
                <div className="relative"><Handle type="source" position={Position.Right} id="y2" className="w-2 h-2 bg-black" /><span className="text-[8px] absolute right-3">Y2</span></div>
                <div className="relative"><Handle type="source" position={Position.Right} id="y3" className="w-2 h-2 bg-black" /><span className="text-[8px] absolute right-3">Y3</span></div>
            </div>
        </LogicSymbolWrapper>
    );
}
