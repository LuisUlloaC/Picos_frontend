import * as React from "react";
import '../../home.css';

export default function NoWorkingScreen() {
  return (
    <div className="home-container" style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <h1 className="heartbeat">Cerrado</h1>
    </div>
  );
}

