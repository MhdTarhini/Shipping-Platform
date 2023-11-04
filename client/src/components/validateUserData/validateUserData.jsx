export const validateUserData = (userData) => {
  let errors = {};
  let isValid = true;

  if (userData.name && !userData.name.trim()) {
    errors.name = "Name is required.";
    isValid = false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!userData?.email || !emailRegex.test(userData.email)) {
    errors.email = "Please enter a valid email address.";
    isValid = false;
  }

  if (userData?.password.length < 6) {
    errors.password = "Password must be at least 6 characters long.";
    isValid = false;
  }

  if (userData.address && !userData?.address?.trim()) {
    errors.address = "Address is required.";
    isValid = false;
  }

  return { isValid, errors };
};
