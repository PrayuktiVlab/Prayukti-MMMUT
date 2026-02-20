import React, { memo } from 'react';
import { NodeProps } from '@xyflow/react';
import { SimpleLogicGateNode } from './SimpleLogicGateNode';

const OrGate = memo((props: NodeProps) => {
    // OR Gate Path: Curved back, pointed front. Width 50.
    const path = "M 0,0 Q 30,0 50,20 Q 30,40 0,40 Q 15,20 0,0 Z";
    return <SimpleLogicGateNode {...props} svgPath={path} label="OR" inputs={2} />;
});

OrGate.displayName = 'OrGate';
export default OrGate;
