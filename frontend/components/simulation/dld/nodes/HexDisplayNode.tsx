import { Handle, Position, NodeProps } from '@xyflow/react';

const SEGMENTS = {
    0: [1, 1, 1, 1, 1, 1, 0],
    1: [0, 1, 1, 0, 0, 0, 0],
    2: [1, 1, 0, 1, 1, 0, 1],
    3: [1, 1, 1, 1, 0, 0, 1],
    4: [0, 1, 1, 0, 0, 1, 1],
    5: [1, 0, 1, 1, 0, 1, 1],
    6: [1, 0, 1, 1, 1, 1, 1],
    7: [1, 1, 1, 0, 0, 0, 0],
    8: [1, 1, 1, 1, 1, 1, 1],
    9: [1, 1, 1, 1, 0, 1, 1],
    10: [1, 1, 1, 0, 1, 1, 1], // A
    11: [0, 0, 1, 1, 1, 1, 1], // b
    12: [1, 0, 0, 1, 1, 1, 0], // C
    13: [0, 1, 1, 1, 1, 0, 1], // d
    14: [1, 0, 0, 1, 1, 1, 1], // E
    15: [1, 0, 0, 0, 1, 1, 1], // F
};

export default function HexDisplayNode({ data, selected }: NodeProps) {
    const value = data.value || 0;
    // @ts-ignore
    const activeSegments = SEGMENTS[value] || SEGMENTS[0];

    return (
        <div className={`relative bg-gray-900 border-4 ${selected ? 'border-orange-500' : 'border-gray-800'} w-24 h-32 rounded-lg flex items-center justify-center`}>
            {/* Inputs (Bottom) - D0-D3 */}
            <div className="absolute -bottom-2 w-full flex justify-center gap-2">
                <Handle type="target" position={Position.Bottom} id="d0" className="w-2 h-2 bg-yellow-500" style={{ left: '20%' }} />
                <Handle type="target" position={Position.Bottom} id="d1" className="w-2 h-2 bg-yellow-500" style={{ left: '40%' }} />
                <Handle type="target" position={Position.Bottom} id="d2" className="w-2 h-2 bg-yellow-500" style={{ left: '60%' }} />
                <Handle type="target" position={Position.Bottom} id="d3" className="w-2 h-2 bg-yellow-500" style={{ left: '80%' }} />
            </div>

            {/* 7-Segment Display SVG */}
            <svg width="60" height="80" viewBox="0 0 10 20" className="overflow-visible">
                <g transform="skewX(-5)">
                    {/* A */}
                    <polygon points="1,1 2,0 8,0 9,1 8,2 2,2" fill={activeSegments[0] ? "#ff0000" : "#330000"} />
                    {/* B */}
                    <polygon points="9,1 10,2 10,8 9,9 8,8 8,2" fill={activeSegments[1] ? "#ff0000" : "#330000"} />
                    {/* C */}
                    <polygon points="9,11 10,12 10,18 9,19 8,18 8,12" fill={activeSegments[2] ? "#ff0000" : "#330000"} />
                    {/* D */}
                    <polygon points="1,19 2,18 8,18 9,19 8,20 2,20" fill={activeSegments[3] ? "#ff0000" : "#330000"} />
                    {/* E */}
                    <polygon points="1,11 2,12 2,18 1,19 0,18 0,12" fill={activeSegments[4] ? "#ff0000" : "#330000"} />
                    {/* F */}
                    <polygon points="1,1 2,2 2,8 1,9 0,8 0,2" fill={activeSegments[5] ? "#ff0000" : "#330000"} />
                    {/* G */}
                    <polygon points="1,9 2,8 8,8 9,9 8,10 2,10" fill={activeSegments[6] ? "#ff0000" : "#330000"} />
                </g>
            </svg>
        </div>
    );
}
