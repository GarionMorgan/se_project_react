// Simple synchronous validation utilities for forms
// export a validation function for the AddItem form

export function validateItem(values) {
  const errors = {};

  if (!values.name || values.name.trim().length === 0) {
    errors.name = "Name is required";
  } else if (values.name.length > 30) {
    errors.name = "Name must be 30 characters or fewer";
  }

  if (!values.imageUrl || values.imageUrl.trim().length === 0) {
    errors.imageUrl = "Image URL is required";
  } else {
    try {
      // Use the URL constructor for a basic format check
      new URL(values.imageUrl);
    } catch (e) {
      errors.imageUrl = "Image URL must be a valid URL";
    }
  }

  if (!values.weather) {
    errors.weather = "Please select a weather type";
  }

  return errors;
}

export default validateItem;
