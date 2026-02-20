import React, { memo } from 'react';
import { NodeProps } from '@xyflow/react';
import { SimpleLogicGateNode } from './SimpleLogicGateNode';

const NandGate = memo((props: NodeProps) => {
    // NAND Gate Path (Same as AND, bubble added by component)
    const path = "M 0,0 L 30,0 A 20,20 0 0 1 30,40 L 0,40 Z";
    return <SimpleLogicGateNode {...props} svgPath={path} label="NAND" inputs={2} showBubble={true} />;
});

NandGate.displayName = 'NandGate';
export default NandGate;
