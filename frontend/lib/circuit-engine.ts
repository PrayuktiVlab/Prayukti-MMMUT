import { Edge, Node } from '@xyflow/react';

type LogicValue = 0 | 1;

export function evaluateCircuit(nodes: Node[], edges: Edge[]): Node[] {
    // Create a map of node values (initially from inputs)
    const nodeValues = new Map<string, LogicValue>();

    // 1. Initialize logic values from Input Nodes
    // 1. Initialize logic values from Input Nodes
    nodes.forEach(node => {
        if (node.type === 'inputNode') {
            // Respect existing value if present (from user interaction), otherwise 0
            const val = (node.data.value !== undefined ? node.data.value : 0) as LogicValue;
            nodeValues.set(node.id, val);
        }
    });

    // 2. Iterative evaluation (simple limit to prevent infinite loops)
    // In a real sophisticated engine, we'd use topological sort or event-driven prop.
    // For DLD prototype, 5-10 passes is usually enough for simple combinational circuits.
    let cleanPasss = false;
    let iterations = 0;

    // Clone nodes to avoid mutation during iteration if not careful, 
    // but here we just want to calculate new data.
    const newNodes = nodes.map(n => ({ ...n, data: { ...n.data } }));
    // const nodeMap = new Map(newNodes.map(n => [n.id, n])); // Unused

    while (!cleanPasss && iterations < 15) {
        cleanPasss = true;
        iterations++;

        // We need to evaluate Gate nodes
        newNodes.forEach(node => {
            const type = node.type || '';
            const incomingEdges = edges.filter(e => e.target === node.id);

            // Helper to get input value by handle ID
            const getVal = (handleId: string, defaultVal: number = 0): number => {
                // Find edge connected to this handle
                const edge = incomingEdges.find(e => e.targetHandle === handleId);
                if (!edge) return defaultVal;
                return nodeValues.get(edge.source) || 0;
            };

            // Generic inputs helper
            const inputs: LogicValue[] = incomingEdges.map(e => {
                return nodeValues.get(e.source) || 0;
            });

            let newValue: LogicValue = 0;
            // For multi-output nodes, we might strictly not use 'newValue' but update specific outputs.
            // But for simple gates, newValue is fine.

            if (type === 'and') {
                newValue = (inputs.length > 0 && inputs.every(v => v === 1)) ? 1 : 0;
                nodeValues.set(node.id, newValue);
                node.data.value = newValue;
            } else if (type === 'nand') {
                const andResult = (inputs.length > 0 && inputs.every(v => v === 1));
                newValue = andResult ? 0 : 1;
                nodeValues.set(node.id, newValue);
                node.data.value = newValue;
            } else if (type === 'or') {
                newValue = inputs.some(v => v === 1) ? 1 : 0;
                nodeValues.set(node.id, newValue);
                node.data.value = newValue;
            } else if (type === 'nor') {
                const orResult = inputs.some(v => v === 1);
                newValue = orResult ? 0 : 1;
                nodeValues.set(node.id, newValue);
                node.data.value = newValue;
            } else if (type === 'xor') {
                const ones = inputs.filter(v => v === 1).length;
                newValue = (ones % 2 === 1) ? 1 : 0;
                nodeValues.set(node.id, newValue);
                node.data.value = newValue;
            } else if (type === 'xnor') {
                const ones = inputs.filter(v => v === 1).length;
                newValue = (ones % 2 === 0) ? 1 : 0;
                nodeValues.set(node.id, newValue);
                node.data.value = newValue;
            } else if (type === 'not') {
                newValue = inputs.length > 0 && inputs[0] === 0 ? 1 : 0;
                nodeValues.set(node.id, newValue);
                node.data.value = newValue;
            } else if (type === 'outputNode') {
                newValue = (inputs.length > 0 ? inputs[0] : 0) || 0;
                nodeValues.set(node.id, newValue);
                node.data.value = newValue;
            }

            // --- MSI Components Logic ---
            else if (type === 'muxNode') {
                const s0 = getVal('s0');
                const s1 = getVal('s1');
                const select = s0 + (s1 * 2);
                const outVal = getVal(`i${select}`);
                nodeValues.set(node.id, outVal as LogicValue); // Mux usually has 1 main output
                node.data.value = outVal;
            }
            else if (type === 'demuxNode') {
                const input = getVal('in');
                const s0 = getVal('s0');
                const s1 = getVal('s1');
                const select = s0 + (s1 * 2);

                // Demux outputs need to be handled carefully as they are multiple source handles
                // We can't easily map node.id to multiple values in this simple Map.
                // We will store them in node.data.outputs = { y0: 0, y1: 1 ... }
                // And downstream nodes need to know which handle they are connected to.
                // LIMITATION: This simple engine assumes node.id maps to a single value for simple gates.
                // FIX: We need to update the nodeValues map with keys like "nodeId-handleId".

                // For now, let's update data and let the edges logic handle it if we switch to handle-based lookup.
                // The current simple engine uses nodeValues.get(e.source). 
                // We need to change how we look up values for multi-output nodes.
            }
        });
    }

    // --- REVISED EVALUATION FOR MULTI-OUTPUT SUPPORT ---
    // The previous loop is too simple for Demux/Decoder/FlipFlops.
    // We need a handle-aware value map.

    const handleValues = new Map<string, LogicValue>(); // Key: "nodeId-handleId"

    // Initialize inputs
    // Initialize inputs
    nodes.forEach(node => {
        if (node.type === 'inputNode') {
            // Respect existing value
            const val = (node.data.value !== undefined ? node.data.value : 0) as LogicValue;
            handleValues.set(`${node.id}-source`, val as LogicValue);
        }
    });

    // Re-run iteration with handle support
    iterations = 0;
    while (iterations < 10) {
        iterations++;
        let changed = false;

        newNodes.forEach(node => {
            const type = node.type;
            const incomingEdges = edges.filter(e => e.target === node.id);

            // Input Getter
            const getIn = (handleId?: string) => {
                const edge = incomingEdges.find(e => e.targetHandle === handleId || (!handleId && !e.targetHandle));
                if (!edge) return 0;
                // Source lookup
                return handleValues.get(`${edge.source}-${edge.sourceHandle}`) ??
                    handleValues.get(`${edge.source}-source`) ?? // Fallback for basic nodes
                    handleValues.get(`${edge.source}-out`) ?? // Fallback
                    handleValues.get(`${edge.source}-q`) ?? // Fallback for FF
                    0;
            };

            // Standard Gates
            if (['and', 'or', 'nand', 'nor', 'xor', 'xnor', 'not'].includes(type!)) {
                // Collect values from all connected input handles
                // SvgGateNode uses 'a', 'b', 'c'... or just target handle for single input
                // We iterate over incoming edges and get their values.

                const inputVals: number[] = incomingEdges.map(e => {
                    // Get value from source (handle-aware)
                    return handleValues.get(`${e.source}-${e.sourceHandle}`) ??
                        handleValues.get(`${e.source}-source`) ??
                        handleValues.get(`${e.source}-out`) ??
                        handleValues.get(`${e.source}-q`) ??
                        0;
                });

                // If no inputs connected, default to 0 (or floating? usually 0 for sim)
                // For NOT gate, if 0 inputs, it's 0. 

                let res = 0;
                const hasInputs = inputVals.length > 0;

                if (type === 'and') res = (hasInputs && inputVals.every(x => x === 1)) ? 1 : 0;
                if (type === 'nand') res = (hasInputs && inputVals.every(x => x === 1)) ? 0 : 1; // NAND is 0 only if ALL are 1
                if (type === 'or') res = inputVals.some(x => x === 1) ? 1 : 0;
                if (type === 'nor') res = inputVals.some(x => x === 1) ? 0 : 1; // NOR is 0 if ANY is 1
                if (type === 'xor') res = (inputVals.filter(x => x === 1).length % 2 === 1) ? 1 : 0;
                if (type === 'xnor') res = (inputVals.filter(x => x === 1).length % 2 === 0) ? 1 : 0;
                if (type === 'not') res = (hasInputs && inputVals[0] === 1) ? 0 : 1; // Invert input

                // Update output
                // SvgGateNode uses 'source' as output handle id
                const old = handleValues.get(`${node.id}-source`);
                if (old !== res) {
                    handleValues.set(`${node.id}-source`, res as LogicValue);
                    node.data.value = res;
                    changed = true;
                }
            }

            // Output Node
            if (type === 'outputNode') {
                const val = getIn(undefined); // default handle
                if (node.data.value !== val) {
                    node.data.value = val;
                    changed = true;
                }
            }

            // MUX
            if (type === 'muxNode') {
                const s0 = getIn('s0');
                const s1 = getIn('s1');
                const sel = s0 + (s1 * 2);
                const out = getIn(`i${sel}`);
                const old = handleValues.get(`${node.id}-out`);
                if (old !== out) {
                    handleValues.set(`${node.id}-out`, out as LogicValue);
                    changed = true;
                }
            }

            // DEMUX
            if (type === 'demuxNode') {
                const input = getIn('in');
                const s0 = getIn('s0');
                const s1 = getIn('s1');
                const sel = s0 + (s1 * 2);

                // Update all 4 outputs
                [0, 1, 2, 3].forEach(i => {
                    const val = (i === sel) ? input : 0;
                    const old = handleValues.get(`${node.id}-y${i}`);
                    if (old !== val) {
                        handleValues.set(`${node.id}-y${i}`, val as LogicValue);
                        changed = true;
                    }
                });
            }

            // DECODER 2:4 (Active High outputs assumed for simplicity, or check datasheet logic usually Active Low)
            // Let's assume Active High for visual clarity unless specified.
            if (type === 'decoderNode') {
                const a = getIn('a');
                const b = getIn('b');
                const en = getIn('en'); // Enable usually active low, but let's check node color. Red means active high? Let's assume Enable High.

                const sel = a + (b * 2);
                [0, 1, 2, 3].forEach(i => {
                    const val = (en === 1 && i === sel) ? 1 : 0;
                    const old = handleValues.get(`${node.id}-y${i}`);
                    if (old !== val) {
                        handleValues.set(`${node.id}-y${i}`, val as LogicValue);
                        changed = true;
                    }
                });
            }

            // ENCODER 4:2 (Priority Encoder usually)
            if (type === 'encoderNode') {
                const i0 = getIn('i0');
                const i1 = getIn('i1');
                const i2 = getIn('i2');
                const i3 = getIn('i3');

                // Simple priority logic: I3 > I2 > I1 > I0
                let y0 = 0, y1 = 0;
                if (i3) { y1 = 1; y0 = 1; }
                else if (i2) { y1 = 1; y0 = 0; }
                else if (i1) { y1 = 0; y0 = 1; }

                const oldY0 = handleValues.get(`${node.id}-y0`);
                const oldY1 = handleValues.get(`${node.id}-y1`);

                if (oldY0 !== y0 || oldY1 !== y1) {
                    handleValues.set(`${node.id}-y0`, y0 as LogicValue);
                    handleValues.set(`${node.id}-y1`, y1 as LogicValue);
                    changed = true;
                }
            }

            // COMPARATOR
            if (type === 'comparatorNode') {
                // 4-bit comparison
                let valA = 0, valB = 0;
                [0, 1, 2, 3].forEach(bit => {
                    valA += getIn(`a${bit}`) * Math.pow(2, bit);
                    valB += getIn(`b${bit}`) * Math.pow(2, bit);
                });

                const gt = valA > valB ? 1 : 0;
                const eq = valA === valB ? 1 : 0;
                const lt = valA < valB ? 1 : 0;

                if (handleValues.get(`${node.id}-gt`) !== gt) handleValues.set(`${node.id}-gt`, gt as LogicValue), changed = true;
                if (handleValues.get(`${node.id}-eq`) !== eq) handleValues.set(`${node.id}-eq`, eq as LogicValue), changed = true;
                if (handleValues.get(`${node.id}-lt`) !== lt) handleValues.set(`${node.id}-lt`, lt as LogicValue), changed = true;
            }

            // FLIP-FLOP (Sequential!)
            // Needs internal state. logic: NextState = f(Inputs, CurrentState)
            // We update state safely.
            if (type === 'flipflopNode') {
                const clk = getIn('clk');
                const lastClk = (node.data.lastClk as number) || 0;

                // Rising Edge Trigger
                if (clk === 1 && lastClk === 0) {
                    const ffType = node.data.ffType || 'JK';
                    let q = (node.data.qValue as number) || 0;

                    if (ffType === 'JK') {
                        const j = getIn('j');
                        const k = getIn('k');
                        if (j && !k) q = 1;
                        else if (!j && k) q = 0;
                        else if (j && k) q = q === 1 ? 0 : 1; // Toggle
                    } else if (ffType === 'D') {
                        q = getIn('j'); // D input mapped to J handle internally
                    } else if (ffType === 'T') {
                        const t = getIn('j'); // T input mapped to J handle
                        if (t) q = q === 1 ? 0 : 1;
                    } else if (ffType === 'SR') {
                        const s = getIn('j');
                        const r = getIn('k');
                        if (s && !r) q = 1;
                        else if (!s && r) q = 0;
                    }

                    node.data.qValue = q;
                }

                // Always update Q outputs based on current Q state
                const q = (node.data.qValue as number) || 0;
                const qBar = q === 1 ? 0 : 1;

                node.data.lastClk = clk; // Store for next edge detection

                if (handleValues.get(`${node.id}-q`) !== q) handleValues.set(`${node.id}-q`, q as LogicValue), changed = true;
                if (handleValues.get(`${node.id}-qbar`) !== qBar) handleValues.set(`${node.id}-qbar`, qBar as LogicValue), changed = true;
            }

            // HEX DISPLAY is output only, no logic propagation
            if (type === 'hexDisplayNode') {
                let val = 0;
                [0, 1, 2, 3].forEach(i => {
                    val += getIn(`d${i}`) * Math.pow(2, i);
                });
                if (node.data.value !== val) {
                    node.data.value = val;
                    // No changed=true needed as it drives nothing
                }
            }

        });

        if (!changed) break;
    }

    return newNodes;
}

