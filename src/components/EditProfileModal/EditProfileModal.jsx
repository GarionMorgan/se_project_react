import React, { useState, useEffect } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./EditProfileModal.css";

function EditProfileModal({ isOpen, onClose, onUpdateUser, isLoading }) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name || "");
      setAvatar(currentUser.avatar || "");
    }
  }, [currentUser, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateUser({
      name,
      avatar,
    });
  };

  return (
    <ModalWithForm
      title="Change profile data"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      buttonText={isLoading ? "Saving..." : "Save"}
    >
      <label className="modal__label">
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="modal__input"
          required
        />
      </label>
      <label className="modal__label">
        Avatar URL:
        <input
          type="url"
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
          className="modal__input"
          required
        />
      </label>
    </ModalWithForm>
  );
}

export default EditProfileModal;
