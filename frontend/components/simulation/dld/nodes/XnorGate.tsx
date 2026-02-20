import React, { memo } from 'react';
import { NodeProps } from '@xyflow/react';
import { SimpleLogicGateNode } from './SimpleLogicGateNode';

const XnorGate = memo((props: NodeProps) => {
    // XNOR Gate Path (Same as XOR)
    const path = "M -5,0 Q 5,20 -5,40 M 5,0 Q 35,0 50,20 Q 35,40 5,40 Q 20,20 5,0 Z";
    return <SimpleLogicGateNode {...props} svgPath={path} label="XNOR" inputs={2} showBubble={true} />;
});

XnorGate.displayName = 'XnorGate';
export default XnorGate;
