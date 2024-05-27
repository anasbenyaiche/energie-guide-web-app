import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";


ReactDOM.createRoot(document.getElementById("root")).render(

  <DndProvider backend={HTML5Backend}>
    <Router>
      <App />
    </Router>
  </DndProvider>


);
