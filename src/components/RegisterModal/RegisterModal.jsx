import { useForm } from "../../hooks/useForm";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import validateItem from "../../scripts/validation";
import "./RegisterModal.css";

function RegisterModal({ isOpen, onClose, handleSignUpClick }) {
  const { values, handleChange } = useForm({
    name: "",
    avatarUrl: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSignUpClick({
      name: values.name,
      avatar: values.avatarUrl,
      email: values.email,
      password: values.password,
    });
  };

  return (
    <ModalWithForm
      title="Sign up"
      buttonText="Next"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label htmlFor="register-email" className="modal__label">
        Email*{" "}
        <input
          type="email"
          className="modal__input"
          id="register-email"
          placeholder="Email"
          name="email"
          value={values.email}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="register-password" className="modal__label">
        Password*{" "}
        <input
          type="password"
          className="modal__input"
          id="register-password"
          placeholder="Password"
          name="password"
          value={values.password}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="register-name" className="modal__label">
        Name{" "}
        <input
          type="text"
          className="modal__input"
          id="register-name"
          placeholder="Name"
          name="name"
          value={values.name}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="avatarUrl" className="modal__label">
        Avatar URL{" "}
        <input
          type="text"
          className="modal__input"
          id="avatarUrl"
          placeholder="Avatar URL"
          name="avatarUrl"
          value={values.avatarUrl}
          onChange={handleChange}
        />
      </label>
    </ModalWithForm>
  );
}

export default RegisterModal;
