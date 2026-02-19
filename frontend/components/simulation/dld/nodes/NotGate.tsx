import React, { memo } from 'react';
import { NodeProps } from '@xyflow/react';
import { SimpleLogicGateNode } from './SimpleLogicGateNode';

const NotGate = memo((props: NodeProps) => {
    // NOT Gate Path: Triangle. Width 50.
    const path = "M 0,0 L 50,20 L 0,40 Z";
    return <SimpleLogicGateNode {...props} svgPath={path} label="NOT" inputs={1} showBubble={true} />;
});

NotGate.displayName = 'NotGate';
export default NotGate;
