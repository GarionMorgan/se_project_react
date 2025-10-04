import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";
import { useEffect, useState } from "react";
import validateItem from "../../scripts/validation";
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

  const {
    values,
    handleChange,
    handleBlur,
    setValues,
    handleReset,
    errors,
    touched,
    isValid,
  } = useForm(defaultValues, validateItem);

  const [triedSubmit, setTriedSubmit] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Reset values, errors and touched state when modal opens so old validation
      // feedback doesn't appear before the user interacts.
      handleReset();
      setTriedSubmit(false);
    }
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    setTriedSubmit(true);
    // final check before submit
    if (!isValid) return;
    onAddItem(values);
  }

  return (
    <ModalWithForm
      title="New garment"
      buttonText="Add garment"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      // Don't show the form as invalid until user interacts or tries to submit
      isValid={Object.keys(touched).length > 0 || triedSubmit ? isValid : true}
    >
      <label htmlFor="name" className="modal__label">
        Name{" "}
        <input
          type="text"
          className="modal__input"
          id="name"
          placeholder="Name"
          name="name"
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.name && (touched.name || triedSubmit) && (
          <p className="modal__error">{errors.name}</p>
        )}
      </label>
      <label htmlFor="imageUrl" className="modal__label">
        Image{" "}
        <input
          type="url"
          className="modal__input"
          id="imageUrl"
          placeholder="Image Url"
          name="imageUrl"
          value={values.imageUrl}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.imageUrl && (touched.imageUrl || triedSubmit) && (
          <p className="modal__error">{errors.imageUrl}</p>
        )}
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
        {errors.weather && (touched.weather || triedSubmit) && (
          <p className="modal__error">{errors.weather}</p>
        )}
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;
