import React from 'react';
import { BaseEdge, EdgeProps, getSmoothStepPath } from '@xyflow/react';

export default function SignalEdge({
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    style = {},
    markerEnd,
    data, // We will pass { value: 0 | 1 } here
}: EdgeProps) {
    const [edgePath] = getSmoothStepPath({
        sourceX,
        sourceY,
        sourcePosition,
        targetX,
        targetY,
        targetPosition,
    });

    // Safe check for data, as it might be undefined properly
    const isHigh = data && typeof data.value === 'number' && data.value === 1;
    const isLow = data && typeof data.value === 'number' && data.value === 0;

    // Dynamic Styling
    let stroke = '#94a3b8'; // Default Slate-400 (Undefined)
    let filter = 'none';
    let strokeWidth = 2;
    let opacity = 0.5;

    const customColor = data?.color as string;

    if (isHigh) {
        stroke = customColor || '#22c55e'; // Custom or Green-500
        filter = `drop-shadow(0 0 3px ${customColor || 'rgba(34,197,94,0.6)'})`; // Glow
        strokeWidth = 3;
        opacity = 1;
    } else if (isLow) {
        stroke = customColor || '#475569'; // Custom or Slate-600
        strokeWidth = 2;
        opacity = 0.8;
    }

    return (
        <>
            <BaseEdge
                path={edgePath}
                markerEnd={markerEnd}
                style={{
                    ...style,
                    stroke,
                    strokeWidth,
                    filter,
                    opacity,
                    transition: 'all 0.15s ease-out', // Fast transition for responsiveness
                }}
            />
        </>
    );
}
