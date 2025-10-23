import { useForm } from "../../hooks/useForm";
import "./LoginModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function LoginModal({ isOpen, onClose, handleSignInClick }) {
  const { values, handleChange } = useForm({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSignInClick({
      email: values.email,
      password: values.password,
    });
  };

  return (
    <>
      <ModalWithForm
        title="Log in"
        buttonText="Log in"
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}
      >
        <label htmlFor="login-email" className="modal__label">
          Email*
          <input
            type="email"
            className="modal__input"
            id="login-email"
            name="email"
            placeholder="Email"
            value={values.email}
            onChange={handleChange}
            required
          />
        </label>
        <label htmlFor="login-password" className="modal__label">
          Password*
          <input
            type="password"
            className="modal__input"
            id="login-password"
            name="password"
            placeholder="Password"
            value={values.password}
            onChange={handleChange}
            required
          />
        </label>
      </ModalWithForm>
    </>
  );
}

export default LoginModal;
