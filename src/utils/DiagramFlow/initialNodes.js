import { EditorState } from 'draft-js';
const initialNodes = [
    {
        id: 'horizontal-1',
        sourcePosition: 'right',
        data: { label: 'Loi n°2015-12', text: "Lorem ipsum dolor sit amet", editorState: EditorState.createEmpty() },
        type: 'textUpdater',
        position: { x: 0, y: 220 },
        style: { backgroundColor: "#F49819", color: "black", borderColor: "#F49819", borderRadius: "5px" }
    },
    {
        id: 'horizontal-2',
        sourcePosition: 'right',
        targetPosition: 'left',
        type: 'textUpdater',
        data: { label: 'Plan National', text: "Lorem ipsum dolor sit amet", editorState: EditorState.createEmpty() },
        position: { x: 220, y: 0 },
        style: { backgroundColor: "#F0F0F0", color: "black", borderColor: "#F0F0F0", borderRadius: "5px" }
    },
    {
        id: 'horizontal-3',
        sourcePosition: 'right',
        targetPosition: 'left',
        type: 'textUpdater',
        data: {
            label: 'Productiond’EnR', text: "Lorem ipsum dolor sit amet",
            editorState: EditorState.createEmpty()
        },
        position: { x: 220, y: 100 },
        style: { backgroundColor: "#FFCD05", color: "black", borderColor: "#FFCD05", borderRadius: "5px" }
    },
    {
        id: 'horizontal-31',
        sourcePosition: 'right',
        targetPosition: 'left',
        data: {
            label: 'Commission technique', text: "Lorem ipsum dolor sit amet",
            editorState: EditorState.createEmpty()
        },
        type: 'textUpdater',
        position: { x: 220, y: 200 },
        style: { backgroundColor: "#F0F0F0", color: "black", borderColor: "#F0F0F0", borderRadius: "5px" }
    },
    {
        id: 'horizontal-32',
        sourcePosition: 'right',
        targetPosition: 'left',
        data: {
            label: 'Propriété des installations', text: "Lorem ipsum dolor sit amet",
            editorState: EditorState.createEmpty()
        },
        type: 'textUpdater',
        position: { x: 220, y: 300 },
        style: { backgroundColor: "#F0F0F0", color: "black", borderColor: "#F0F0F0", borderRadius: "5px" }
    },
    {
        id: 'horizontal-33',
        sourcePosition: 'right',
        targetPosition: 'left',
        data: {
            label: 'Contrôle, infractions et sanctions',
            text: "Lorem ipsum dolor sit amet",
            editorState: EditorState.createEmpty()
        },
        type: 'textUpdater',
        position: { x: 220, y: 400 },
        style: { backgroundColor: "#F0F0F0", color: "black", borderColor: "#F0F0F0", borderRadius: "5px" }
    },
    {
        id: 'horizontal-34',
        sourcePosition: 'right',
        targetPosition: 'left',
        data: {
            label: 'Autorité Spécialisée', text: "Lorem ipsum dolor sit amet",
            editorState: EditorState.createEmpty()
        },
        type: 'textUpdater',
        position: { x: 220, y: 500 },
        style: { backgroundColor: "#F0F0F0", color: "black", borderColor: "#F0F0F0", borderRadius: "5px" }
    },
    {
        id: 'horizontal-4',
        sourcePosition: 'right',
        targetPosition: 'left',
        data: {
            label: 'Autoconsommation', text: "Lorem ipsum dolor sit amet",
            editorState: EditorState.createEmpty()
        },
        type: 'textUpdater',
        position: { x: 450, y: 100 },
        style: { backgroundColor: "#555555", color: "white", borderColor: "#555555", borderRadius: "5px" }
    },
    {
        id: 'horizontal-5',
        sourcePosition: 'right',
        targetPosition: 'left',
        data: {
            label: 'Consommation nationale', text: "Lorem ipsum dolor sit amet",
            editorState: EditorState.createEmpty()
        },
        type: 'textUpdater',
        position: { x: 450, y: 200 },
        style: { backgroundColor: "#555555", color: "white", borderColor: "#555555", borderRadius: "5px" }
    },
    {
        id: 'horizontal-6',
        sourcePosition: 'right',
        targetPosition: 'left',
        data: {
            label: 'Exportation', text: "Lorem ipsum dolor sit amet",
            editorState: EditorState.createEmpty()
        },
        type: 'textUpdater',
        position: { x: 450, y: 400 },
        style: { backgroundColor: "#555555", color: "white", borderColor: "#555555", borderRadius: "5px" }
    },
    {
        id: 'horizontal-61',
        sourcePosition: 'right',
        targetPosition: 'left',
        data: {
            label: 'Régime de d’autoconsommation', text: "Lorem ipsum dolor sit amet",
            editorState: EditorState.createEmpty()
        },
        type: 'textUpdater',
        position: { x: 680, y: 100 },
        style: { backgroundColor: "#FFCD05", color: "black", borderColor: "#FFCD05", borderRadius: "5px" }
    },
    {
        id: 'horizontal-7',
        sourcePosition: 'right',
        targetPosition: 'left',
        data: {
            label: 'Régime des autorisations < Capacité limitée', text: "Lorem ipsum dolor sit amet",
            editorState: EditorState.createEmpty()
        },
        type: 'textUpdater',
        position: { x: 680, y: 200 },
        style: { backgroundColor: "#FFCD05", color: "black", borderColor: "#FFCD05", borderRadius: "5px" }
    },
    {
        id: 'horizontal-8',
        sourcePosition: 'right',
        targetPosition: 'left',
        data: {
            label: 'Régime des concessions > Capacité limitée', text: "Lorem ipsum dolor sit amet",
            editorState: EditorState.createEmpty()
        },
        type: 'textUpdater',
        position: { x: 680, y: 300 },
        style: { backgroundColor: "#C00000", color: "white", borderColor: "#C00000", borderRadius: "5px" }
    },
    {
        id: 'horizontal-9',
        sourcePosition: 'right',
        targetPosition: 'left',
        data: {
            label: 'Régime des concessions', text: "Lorem ipsum dolor sit amet",
            editorState: EditorState.createEmpty()
        },
        type: 'textUpdater',
        position: { x: 680, y: 400 },
        style: { backgroundColor: "#C00000", color: "white", borderColor: "#C00000", borderRadius: "5px" }
    },
    {
        id: 'horizontal-10',
        sourcePosition: 'right',
        targetPosition: 'left',
        data: {
            label: 'Sans transport d’électricité', text: "Lorem ipsum dolor sit amet",
            editorState: EditorState.createEmpty()
        },
        type: 'textUpdater',
        position: { x: 930, y: 50 },
        style: { backgroundColor: "#FFCD05", color: "black", borderColor: "#FFCD05", borderRadius: "5px" }
    },
    {
        id: 'horizontal-11',
        sourcePosition: 'right',
        targetPosition: 'left',
        data: {
            label: 'Avec transport d’électricité', text: "Lorem ipsum dolor sit amet",
            editorState: EditorState.createEmpty()
        },
        type: 'textUpdater',
        position: { x: 930, y: 150 },
        style: { backgroundColor: "#FFCD05", color: "black", borderColor: "#FFCD05", borderRadius: "5px" }
    },
];

export default initialNodes