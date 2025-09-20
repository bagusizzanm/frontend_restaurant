export const validateEmail = (email) => {
  if (!email.trim()) return "Email tidak boleh kosong.";
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return "Email harus valid.";
  return "";
};

export const validatePassword = (password) => {
  const errors = [];
  if (!password) errors.push("Password tidak boleh kosong.");
  if (password && password.length < 8)
    errors.push("Password minimal 8 karakter.");
  return errors;
};

export const validateForm = (setFormState, formData) => {
  const errors = {
    email: validateEmail(formData.email),
    password: validatePassword(formData.password),
  };

  Object.keys(errors).forEach((key) => {
    if (
      (Array.isArray(errors[key]) && errors[key].length === 0) || // hapus password array kosong
      (!Array.isArray(errors[key]) && !errors[key]) // hapus string kosong
    ) {
      delete errors[key];
    }
  });

  setFormState((prev) => ({ ...prev, errors }));
  return Object.keys(errors).length === 0;
};

export const toastStyleSuccess = {
  position: "top-center",
  duration: 5000,
  style: {
    background: "#15803d",
    color: "#fff",
    padding: "10px",
    borderRadius: "10px",
  },
};
export const toastStyleError = {
  position: "top-right",
  duration: 5000,
  style: {
    background: "#b91c1c",
    color: "#fff",
    padding: "10px",
    borderRadius: "10px",
  },
};
