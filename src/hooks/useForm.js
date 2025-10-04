import { useState } from "react";

// A tiny form hook with optional synchronous validation support.
// Usage: const { values, handleChange, errors, isValid, setValues, handleReset } = useForm(defaults, validateFn)
export function useForm(defaultValues, validate) {
  const [values, setValuesState] = useState(defaultValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // wrapped setter so callers (like reset) trigger validation too
  function setValues(next) {
    // next may be a function or object
    const nextValues = typeof next === "function" ? next(values) : next;
    setValuesState(nextValues);
    if (typeof validate === "function") {
      setErrors(validate(nextValues) || {});
    }
  }

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === "checkbox" ? checked : value;
    const nextValues = { ...values, [name]: fieldValue };
    setValuesState(nextValues);
    // mark field as touched on first change
    setTouched((prev) => ({ ...prev, [name]: true }));
    if (typeof validate === "function") {
      setErrors(validate(nextValues) || {});
    }
  }

  function handleBlur(e) {
    const { name } = e.target || {};
    if (!name) return;
    setTouched((prev) => ({ ...prev, [name]: true }));
  }

  function handleReset() {
    setValuesState(defaultValues);
    setErrors({});
    setTouched({});
  }

  const isValid = Object.keys(errors).length === 0;

  return {
    values,
    setValues,
    handleChange,
    handleBlur,
    handleReset,
    errors,
    touched,
    isValid,
  };
}
