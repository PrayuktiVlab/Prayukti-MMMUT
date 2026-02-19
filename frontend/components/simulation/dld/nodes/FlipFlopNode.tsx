import { Handle, Position, NodeProps } from '@xyflow/react';
import { LogicSymbolWrapper } from './BaseLogicNode';

export default function FlipFlopNode({ id, data, selected }: NodeProps) {
    const type = (data.ffType as string) || 'JK';
    const qValue = data.qValue === 1 ? '1' : '0';
    const qBarValue = data.qValue === 1 ? '0' : '1';

    return (
        <LogicSymbolWrapper id={id} label={data.label as string || `${type} FLIP-FLOP`} selected={selected} width="w-32" height="h-32">

            {/* Clock */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2">
                <div className="w-0 h-0 border-t-[5px] border-t-transparent border-l-[8px] border-l-black border-b-[5px] border-b-transparent ml-[-1px]"></div>
                <Handle type="target" position={Position.Left} id="clk" className="w-2 h-2 bg-black !left-[-4px]" />
                <span className="text-[8px] absolute left-3 -top-3">CLK</span>
            </div>

            {/* Inputs */}
            <div className="absolute left-0 top-4">
                <Handle type="target" position={Position.Left} id="j" className="w-2 h-2 bg-black" />
                <span className="text-[8px] absolute left-3 -top-1">{type === 'D' ? 'D' : type === 'T' ? 'T' : 'J'}</span>
            </div>

            {(type === 'JK' || type === 'SR') && (
                <div className="absolute left-0 bottom-4">
                    <Handle type="target" position={Position.Left} id="k" className="w-2 h-2 bg-black" />
                    <span className="text-[8px] absolute left-3 -top-1">{type === 'SR' ? 'R' : 'K'}</span>
                </div>
            )}

            {/* Outputs */}
            <div className="absolute right-0 top-4">
                <Handle type="source" position={Position.Right} id="q" className="w-2 h-2 bg-black" />
                <span className="text-[8px] absolute right-3 -top-1">Q</span>
            </div>
            <div className="absolute right-0 bottom-4">
                <Handle type="source" position={Position.Right} id="qbar" className="w-2 h-2 bg-black" />
                <span className="text-[8px] absolute right-3 -top-1" style={{ textDecoration: 'overline' }}>Q</span>
            </div>

            {/* State Indicator */}
            <div className="font-mono bg-black text-white px-2 py-0.5 rounded textxs mt-6">
                Q={qValue}
            </div>

        </LogicSymbolWrapper>
    );
}
