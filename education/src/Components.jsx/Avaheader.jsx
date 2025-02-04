import React from "react";
import '../Styles/Avaheader.css'
const Avaheader = () => {
  return (
    <div className="header">
      <h1>Avatars</h1>
      <div className="tabs">
        <span className="tab active">Avatar Pro (831)</span>
        <span className="tab">Talking Photo (69)</span>
        <span className="tab">My Avatar (9)</span>
        <span className="tab">Custom Avatar</span>
      </div>
      <div className="actions">
        <button className="btn-upgrade">Upgrade</button>
        <button className="btn-create">+ Create Video</button>
      </div>
    </div>
  );
};

export default Avaheader;
