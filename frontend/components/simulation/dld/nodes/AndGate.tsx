import React, { memo } from 'react';
import { NodeProps } from '@xyflow/react';
import { SimpleLogicGateNode } from './SimpleLogicGateNode';

const AndGate = memo((props: NodeProps) => {
    // AND Gate Path: Flat back (x=0), curved front. Width 50.
    // L 30,0 (flat top) -> Arc to 30,40 -> L 0,40
    const path = "M 0,0 L 30,0 A 20,20 0 0 1 30,40 L 0,40 Z";
    return <SimpleLogicGateNode {...props} svgPath={path} label="AND" inputs={2} />;
});

AndGate.displayName = 'AndGate';
export default AndGate;
