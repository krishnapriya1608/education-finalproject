import React from "react";

const Avacard = ({ name, image, isUpload }) => {
  return (
    <div className={`avatar-card ${isUpload ? "upload" : ""}`}>
      {isUpload ? (
        <span>📷 {name}</span>
      ) : (
        <>
          <img src={image} alt={name} />
          <span>{name}</span>
        </>
      )}
    </div>
  );
};

export default Avacard;
