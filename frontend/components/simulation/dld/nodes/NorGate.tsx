import React, { memo } from 'react';
import { NodeProps } from '@xyflow/react';
import { SimpleLogicGateNode } from './SimpleLogicGateNode';

const NorGate = memo((props: NodeProps) => {
    // NOR Gate Path (Same as OR)
    const path = "M 0,0 Q 30,0 50,20 Q 30,40 0,40 Q 15,20 0,0 Z";
    return <SimpleLogicGateNode {...props} svgPath={path} label="NOR" inputs={2} showBubble={true} />;
});

NorGate.displayName = 'NorGate';
export default NorGate;
