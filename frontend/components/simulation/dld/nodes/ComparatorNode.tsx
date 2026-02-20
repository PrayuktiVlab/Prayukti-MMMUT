import { Handle, Position, NodeProps } from '@xyflow/react';
import { LogicSymbolWrapper } from './BaseLogicNode';

export default function ComparatorNode({ id, data, selected }: NodeProps) {
    return (
        <LogicSymbolWrapper id={id} label={data.label as string || "4-BIT COMP (7485)"} selected={selected} width="w-32" height="h-48">
            {/* Inputs A (Left) */}
            <div className="absolute left-0 top-8 flex flex-col gap-1">
                <div className="relative"><Handle type="target" position={Position.Left} id="a0" className="w-2 h-2 bg-black" /><span className="text-[8px] absolute left-3">A0</span></div>
                <div className="relative"><Handle type="target" position={Position.Left} id="a1" className="w-2 h-2 bg-black" /><span className="text-[8px] absolute left-3">A1</span></div>
                <div className="relative"><Handle type="target" position={Position.Left} id="a2" className="w-2 h-2 bg-black" /><span className="text-[8px] absolute left-3">A2</span></div>
                <div className="relative"><Handle type="target" position={Position.Left} id="a3" className="w-2 h-2 bg-black" /><span className="text-[8px] absolute left-3">A3</span></div>
            </div>

            {/* Inputs B (Left) */}
            <div className="absolute left-0 bottom-8 flex flex-col gap-1">
                <div className="relative"><Handle type="target" position={Position.Left} id="b0" className="w-2 h-2 bg-black" /><span className="text-[8px] absolute left-3">B0</span></div>
                <div className="relative"><Handle type="target" position={Position.Left} id="b1" className="w-2 h-2 bg-black" /><span className="text-[8px] absolute left-3">B1</span></div>
                <div className="relative"><Handle type="target" position={Position.Left} id="b2" className="w-2 h-2 bg-black" /><span className="text-[8px] absolute left-3">B2</span></div>
                <div className="relative"><Handle type="target" position={Position.Left} id="b3" className="w-2 h-2 bg-black" /><span className="text-[8px] absolute left-3">B3</span></div>
            </div>

            {/* Outputs (Right) */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col gap-6">
                <div className="relative"><Handle type="source" position={Position.Right} id="gt" className="w-2 h-2 bg-black" /><span className="text-[8px] absolute right-3">A&gt;B</span></div>
                <div className="relative"><Handle type="source" position={Position.Right} id="eq" className="w-2 h-2 bg-black" /><span className="text-[8px] absolute right-3">A=B</span></div>
                <div className="relative"><Handle type="source" position={Position.Right} id="lt" className="w-2 h-2 bg-black" /><span className="text-[8px] absolute right-3">A&lt;B</span></div>
            </div>
        </LogicSymbolWrapper>
    );
}
