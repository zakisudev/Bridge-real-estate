import { UserRegister } from "../redux/interfaces/userInterface";

interface Errors {
  username: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
  [key: string]: string | null | undefined;
}

const validateForm = (user: UserRegister) => {
  const newErrors: Errors = {
    username: "",
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  // Validate username
  if (!user.username) {
    newErrors.username = "Username is required";
  } else if (user.username.length < 3) {
    newErrors.username = "Username must be at least 3 characters";
  } else if (user.username.length > 10) {
    newErrors.username = "Username must be at most 10 characters";
  }

  // Validate firstName
  if (!user.firstName) {
    newErrors.firstName = "First name is required";
  } else if (user.firstName.length < 3) {
    newErrors.firstName = "First name must be at least 3 characters";
  } else if (user.firstName.length > 20) {
    newErrors.firstName = "First name must be at most 20 characters";
  }

  // Validate lastName
  if (!user.lastName) {
    newErrors.lastName = "Last name is required";
  } else if (user.lastName.length < 3) {
    newErrors.lastName = "Last name must be at least 3 characters";
  } else if (user.lastName.length > 20) {
    newErrors.lastName = "Last name must be at most 20 characters";
  }

  // Validate phone
  if (!user.phone) {
    newErrors.phone = "Phone is required";
  } else if (!/^\d{10}$/.test(user.phone)) {
    newErrors.phone = "Phone must be 10 digits";
  }

  // Validate email
  if (!user.email) {
    newErrors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(user.email)) {
    newErrors.email = "Invalid email address";
  }

  // Validate password
  if (!user.password) {
    newErrors.password = "Password is required";
  } else if (user.password.length < 8) {
    newErrors.password = "Password must be at least 8 characters";
  } else if (user.password.length > 20) {
    newErrors.password = "Password must be at most 20 characters";
  }

  // Validate confirmPassword
  if (!user.confirmPassword) {
    newErrors.confirmPassword = "Confirm password is required";
  } else if (user.confirmPassword !== user.password) {
    newErrors.confirmPassword = "Passwords do not match";
  }

  return newErrors;
};

export default validateForm;
