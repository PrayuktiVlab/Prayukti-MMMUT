import React, { memo } from 'react';
import { NodeProps } from '@xyflow/react';
import { SimpleLogicGateNode } from './SimpleLogicGateNode';

const XorGate = memo((props: NodeProps) => {
    // XOR Gate Path: Double curve back
    // Scaled to width 50
    const path = "M -5,0 Q 5,20 -5,40 M 5,0 Q 35,0 50,20 Q 35,40 5,40 Q 20,20 5,0 Z";
    return <SimpleLogicGateNode {...props} svgPath={path} label="XOR" inputs={2} />;
});

XorGate.displayName = 'XorGate';
export default XorGate;
