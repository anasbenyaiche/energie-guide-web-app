const initialNodes = [
    {
        id: 'horizontal-1',
        sourcePosition: 'right',
        data: { label: 'Loi n°2015-12' },
        type: 'textUpdater',
        position: { x: 0, y: 250 },
        style: { backgroundColor: "#F49819", color: "black", borderColor: "#F49819" }
    },
    {
        id: 'horizontal-2',
        sourcePosition: 'right',
        targetPosition: 'left',
        type: 'textUpdater',
        data: { label: 'Plan National' },
        position: { x: 250, y: 0 },
        style: { backgroundColor: "#F0F0F0", color: "black", borderColor: "#F0F0F0" }
    },
    {
        id: 'horizontal-3',
        sourcePosition: 'right',
        targetPosition: 'left',
        type: 'textUpdater',
        data: { label: 'Productiond’EnR' },
        position: { x: 250, y: 100 },
        style: { backgroundColor: "#FFCD05", color: "black", borderColor: "#FFCD05" }
    },
    {
        id: 'horizontal-31',
        sourcePosition: 'right',
        targetPosition: 'left',
        data: { label: 'Commission technique' },
        type: 'textUpdater',
        position: { x: 250, y: 200 },
        style: { backgroundColor: "#F0F0F0", color: "black", borderColor: "#F0F0F0" }
    },
    {
        id: 'horizontal-32',
        sourcePosition: 'right',
        targetPosition: 'left',
        data: { label: 'Propriété des installations' },
        type: 'textUpdater',
        position: { x: 250, y: 300 },
        style: { backgroundColor: "#F0F0F0", color: "black", borderColor: "#F0F0F0" }
    },
    {
        id: 'horizontal-33',
        sourcePosition: 'right',
        targetPosition: 'left',
        data: { label: 'Contrôle, infractions et sanctions' },
        type: 'textUpdater',
        position: { x: 250, y: 400 },
        style: { backgroundColor: "#F0F0F0", color: "black", borderColor: "#F0F0F0" }
    },
    {
        id: 'horizontal-34',
        sourcePosition: 'right',
        targetPosition: 'left',
        data: { label: 'Autorité Spécialisée' },
        type: 'textUpdater',
        position: { x: 250, y: 500 },
        style: { backgroundColor: "#F0F0F0", color: "black", borderColor: "#F0F0F0" }
    },
    {
        id: 'horizontal-4',
        sourcePosition: 'right',
        targetPosition: 'left',
        data: { label: 'Autoconsommation' },
        type: 'textUpdater',
        position: { x: 500, y: 100 },
        style: { backgroundColor: "#555555", color: "white", borderColor: "#555555" }
    },
    {
        id: 'horizontal-5',
        sourcePosition: 'right',
        targetPosition: 'left',
        data: { label: 'Consommation nationale' },
        type: 'textUpdater',
        position: { x: 500, y: 200 },
        style: { backgroundColor: "#555555", color: "white", borderColor: "#555555" }
    },
    {
        id: 'horizontal-6',
        sourcePosition: 'right',
        targetPosition: 'left',
        data: { label: 'Exportation' },
        type: 'textUpdater',
        position: { x: 500, y: 400 },
        style: { backgroundColor: "#555555", color: "white", borderColor: "#555555" }
    },
    {
        id: 'horizontal-61',
        sourcePosition: 'right',
        targetPosition: 'left',
        data: { label: 'Régime de d’autoconsommation' },
        type: 'textUpdater',
        position: { x: 700, y: 100 },
        style: { backgroundColor: "#FFCD05", color: "black", borderColor: "#FFCD05" }
    },
    {
        id: 'horizontal-7',
        sourcePosition: 'right',
        targetPosition: 'left',
        data: { label: 'Régime des autorisations < Capacité limitée' },
        type: 'textUpdater',
        position: { x: 700, y: 200 },
        style: { backgroundColor: "#FFCD05", color: "black", borderColor: "#FFCD05" }
    },
    {
        id: 'horizontal-8',
        sourcePosition: 'right',
        targetPosition: 'left',
        data: { label: 'Régime des concessions > Capacité limitée' },
        type: 'textUpdater',
        position: { x: 700, y: 300 },
        style: { backgroundColor: "#C00000", color: "white", borderColor: "#C00000" }
    },
    {
        id: 'horizontal-9',
        sourcePosition: 'right',
        targetPosition: 'left',
        data: { label: 'Régime des concessions' },
        type: 'textUpdater',
        position: { x: 700, y: 400 },
        style: { backgroundColor: "#C00000", color: "white", borderColor: "#C00000" }
    },
    {
        id: 'horizontal-10',
        sourcePosition: 'right',
        targetPosition: 'left',
        data: { label: 'Sans transport d’électricité' },
        type: 'textUpdater',
        position: { x: 900, y: 50 },
        style: { backgroundColor: "#FFCD05", color: "black", borderColor: "#FFCD05" }
    },
    {
        id: 'horizontal-11',
        sourcePosition: 'right',
        targetPosition: 'left',
        data: { label: 'Avec transport d’électricité' },
        type: 'textUpdater',
        position: { x: 900, y: 150 },
        style: { backgroundColor: "#FFCD05", color: "black", borderColor: "#FFCD05" }
    },
];

export default initialNodes