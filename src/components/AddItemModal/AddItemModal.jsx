import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";
import { useEffect } from "react";
import "./AddItemModal.css";

const defaultValues = {
  _id: "",
  name: "",
  imageUrl: "",
  weather: "",
};

// onAddItem refers to the submit handler declared in App.jsx
const AddItemModal = ({ isOpen, onAddItem, onClose }) => {
  // Call useForm and destructure its values and use in the JSX

  const { values, handleChange, setValues } = useForm(defaultValues);

  useEffect(() => {
    setValues(defaultValues);
  }, [isOpen, setValues]);

  function handleSubmit(e) {
    e.preventDefault();
    onAddItem(values);
  }

  return (
    <ModalWithForm
      title="New garment"
      buttonText="Add garment"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label htmlFor="name" className="modal__label">
        Name{" "}
        <input
          type="text"
          className="modal__input"
          id="name"
          placeholder="Name"
          required
          minLength="1"
          maxLength="30"
          name="name"
          value={values.name}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="imageUrl" className="modal__label">
        Image{" "}
        <input
          type="url"
          className="modal__input"
          id="imageUrl"
          placeholder="Image Url"
          required
          name="imageUrl"
          value={values.imageUrl}
          onChange={handleChange}
        />
      </label>
      <fieldset className="modal__radio-btns">
        <legend className="modal__legend">Select the weather type:</legend>
        <label htmlFor="hot" className="modal__label_type_radio">
          <input
            id="hot"
            type="radio"
            className="modal__radio-input"
            name="weather"
            value="hot"
            checked={values.weather === "hot"}
            onChange={handleChange}
          />{" "}
          Hot
        </label>
        <label htmlFor="warm" className="modal__label_type_radio">
          <input
            id="warm"
            type="radio"
            className="modal__radio-input"
            name="weather"
            value="warm"
            checked={values.weather === "warm"}
            onChange={handleChange}
          />{" "}
          Warm
        </label>
        <label htmlFor="cold" className="modal__label_type_radio">
          <input
            id="cold"
            type="radio"
            className="modal__radio-input"
            name="weather"
            value="cold"
            checked={values.weather === "cold"}
            onChange={handleChange}
          />{" "}
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;
