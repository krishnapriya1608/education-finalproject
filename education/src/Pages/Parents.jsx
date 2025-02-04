import React from "react";
import Parentdash from "../Components.jsx/Parentdash";
import Parentside from '../Components.jsx/Parentside'

function App() {
  return (
    <div style={{display:"flex"}} className="app">
        <Parentside />
      <Parentdash />
      
    </div>
  );
}

export default App;