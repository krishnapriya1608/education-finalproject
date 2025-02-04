import React, { useRef, useState, useEffect } from "react";
import Avacard from "../Components.jsx/Avacard";
import "../Styles/Avatar.css";
import { Link, useNavigate } from "react-router-dom";

const initialAvatars = [
  { id: 1, name: "Upload My Photo", isUpload: true },
  { id: 2, name: "Delores", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjloT0Kumsb28VIDS9TJfpxyjpaeap31Igqw&s" },
  { id: 3, name: "Ryan", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPEHlG2Af3DcFcCvuXkdh7YSfr-7Oen6ecng&s" },
  { id: 4, name: "Mona Lisa", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0s5B5TIgNtd8NBG31BBu2v1cCxIZi3AEE2g&s" },
  { id: 5, name: "Einstein", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHjRTlGY4xTjlhmAGHOeQQd13OSxiG-ihK0g&s" },
];

const Avatar = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [avatars, setAvatars] = useState(() => JSON.parse(localStorage.getItem("avatars")) || initialAvatars);
  const [editingAvatar, setEditingAvatar] = useState(null);
  const [customName, setCustomName] = useState("");
  const [customImage, setCustomImage] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState(() => localStorage.getItem("selectedAvatar") || null);

  useEffect(() => {
    localStorage.setItem("avatars", JSON.stringify(avatars));
  }, [avatars]);

  useEffect(() => {
    if (selectedAvatar) {
      localStorage.setItem("selectedAvatar", selectedAvatar);
    }
  }, [selectedAvatar]);

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setCustomImage(imageUrl);
    }
  };

  const handleEditClick = (avatar) => {
    setEditingAvatar(avatar);
    setCustomName(avatar.name || "");
    setCustomImage(avatar.image || "");
  };

  const handleSaveCustomAvatar = () => {
    if (editingAvatar) {
      setAvatars((prevAvatars) =>
        prevAvatars.map((avatar) =>
          avatar.id === editingAvatar.id ? { ...avatar, name: customName, image: customImage } : avatar
        )
      );
      setEditingAvatar(null);
      setCustomName("");
      setCustomImage("");
    }
  };

  const handleAddCustomAvatar = () => {
    if (customName.trim() && customImage) {
      setAvatars((prevAvatars) => [
        ...prevAvatars,
        { id: Date.now(), name: customName, image: customImage },
      ]);
      setCustomName("");
      setCustomImage("");
    } else {
      alert("Please provide a name and an image.");
    }
  };

  const handleDeleteAvatar = (id) => {
    setAvatars(avatars.filter((avatar) => avatar.id !== id));
  };

  const handleSelectAvatar = (avatar) => {
    if (!avatar.isUpload) {
      setSelectedAvatar(avatar.image);
      navigate("/dash");
    }
  };

  return (
    <>
      <div style={{ backgroundColor: "rgb(185, 164, 184)", width: "100%", height: "700px" }}>
        <Link style={{ textDecoration: "none" }} to={"/dash"}>
          <h1 style={{ textAlign: "center", color: "rgb(120, 44, 115)" }}>Avatar</h1>
        </Link>

        {/* Avatar Upload Form */}
        <div style={{ position: "relative", top: "2%", display: "flex" }} className="avatar-custom-form">
          <input
            type="text"
            placeholder={editingAvatar ? "Edit Avatar Name" : "Enter Avatar Name"}
            value={customName}
            onChange={(e) => setCustomName(e.target.value)}
          />
          <button style={{ backgroundColor: "rgb(146, 106, 151)" }} onClick={handleUploadClick}>
            {editingAvatar ? "Change Image" : "Choose Image"}
          </button>
          <input type="file" accept="image/*" ref={fileInputRef} style={{ display: "none" }} onChange={handleFileChange} />
          {customImage && <img src={customImage} alt="Custom Preview" className="custom-preview" />}
          <button style={{ backgroundColor: "rgb(146, 106, 151)" }} onClick={editingAvatar ? handleSaveCustomAvatar : handleAddCustomAvatar}>
            {editingAvatar ? "Save Changes" : "Add Avatar"}
          </button>
        </div>

        {/* Avatar Gallery */}
        <div style={{ backgroundColor: "rgb(193, 182, 192)", width: "100%", height: "700px", position: "relative", top: "8" }} className="avatar-gallery">
          {avatars.map((avatar) => (
            <div key={avatar.id} style={{ cursor: avatar.isUpload ? "pointer" : "default" }}>
              <Avacard {...avatar} />
              {!avatar.isUpload && (
                <>
                  <button style={{ backgroundColor: "rgb(146, 106, 151)" }} className="edit-button" onClick={() => handleEditClick(avatar)}>✏️ </button>
                  <button style={{ backgroundColor: "rgb(146, 106, 151)", marginLeft: "20px" }} className="delete-button" onClick={() => handleDeleteAvatar(avatar.id)}>❌ </button>
                  <button style={{ backgroundColor: "rgb(146, 106, 151)", margin: "20px" }} className="select-button" onClick={() => handleSelectAvatar(avatar)}>✅ </button>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Avatar;
