import React, { useCallback } from 'react'
import ReactFlow, { useNodesState, useEdgesState, addEdge } from 'reactflow';
import 'reactflow/dist/style.css';


const initialNodes = [
    { id: '1', sourcePosition: 'right', position: { x: 50, y: 350 }, data: { label: 'Loi n° 2015-12' } },
    { id: '2', sourcePosition: 'right', targetPosition: 'left', position: { x: 250, y: 150 }, data: { label: 'Production d’EnR' } },
    { id: '3', sourcePosition: 'right', targetPosition: 'left', position: { x: 250, y: 50 }, data: { label: 'Plan National' } },
    { id: '4', sourcePosition: 'right', targetPosition: 'left', position: { x: 250, y: 250 }, data: { label: 'Commission technique' } },
    { id: '5', sourcePosition: 'right', targetPosition: 'left', position: { x: 250, y: 350 }, data: { label: 'Propriété des installations' } },
    { id: '6', sourcePosition: 'right', targetPosition: 'left', position: { x: 250, y: 450 }, data: { label: 'Contrôle, infractions et sanctions' } },
    { id: '7', sourcePosition: 'right', targetPosition: 'left', position: { x: 250, y: 550 }, data: { label: 'Autorité Spécialisée' } },
    { id: '8', sourcePosition: 'right', targetPosition: 'left', position: { x: 450, y: 150 }, data: { label: 'Autoconsommation' } },
    { id: '9', sourcePosition: 'right', targetPosition: 'left', position: { x: 450, y: 250 }, data: { label: 'Consommation nationale' } },
    { id: '10', sourcePosition: 'right', targetPosition: 'left', position: { x: 450, y: 450 }, data: { label: 'Exportation' } },
    { id: '11', sourcePosition: 'right', targetPosition: 'left', position: { x: 650, y: 150 }, data: { label: 'Régime de d’autoconsommation' } },
    { id: '12', sourcePosition: 'right', targetPosition: 'left', position: { x: 650, y: 250 }, data: { label: 'Régime des autorisations < Capacité limitée' } },
    { id: '13', sourcePosition: 'right', targetPosition: 'left', position: { x: 650, y: 350 }, data: { label: 'Régime des concessions > Capacité limitée' } },
    { id: '14', sourcePosition: 'right', targetPosition: 'left', position: { x: 650, y: 450 }, data: { label: 'Régime des concessions' } },
    { id: '15', sourcePosition: 'right', targetPosition: 'left', position: { x: 850, y: 100 }, data: { label: 'Régime des concessions > Capacité limitée' } },
    { id: '16', sourcePosition: 'right', targetPosition: 'left', position: { x: 850, y: 180 }, data: { label: 'Régime des concessions' } },

];


const initialEdges = [
    { id: 'e2-8', source: '2', target: '8', type: 'straight', sourcePosition: 'right', targetPosition: 'left' },
    { id: 'e2-9', source: '2', target: '9', type: 'straight', sourcePosition: 'right', targetPosition: 'left' },
    { id: 'e2-10', source: '2', target: '10', type: 'straight', sourcePosition: 'right', targetPosition: 'left' },
    { id: 'e8-11', source: '8', target: '11', type: 'straight', sourcePosition: 'right', targetPosition: 'left' },
    { id: 'e9-12', source: '9', target: '12', type: 'straight', sourcePosition: 'right', targetPosition: 'left' },
    { id: 'e12-13', source: '12', target: '13', type: 'straight', sourcePosition: 'right', targetPosition: 'left' },
    { id: 'e12-14', source: '12', target: '14', type: 'straight', sourcePosition: 'right', targetPosition: 'left' },
    { id: 'e13-15', source: '13', target: '15', type: 'straight', sourcePosition: 'right', targetPosition: 'left' },
    { id: 'e14-16', source: '14', target: '16', type: 'straight', sourcePosition: 'right', targetPosition: 'left' },
];

const Diagram = () => {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    const onConnect = useCallback((params) => setEdges((els) => addEdge(params, els)), []);



    return (
        <div style={{ width: '100vw', height: '100vh' }}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                attributionPosition="bottom-left">
            </ReactFlow>
        </div>
    )
}

export default Diagram
