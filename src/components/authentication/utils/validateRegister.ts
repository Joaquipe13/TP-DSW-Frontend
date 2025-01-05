interface UserData {
  name: string;
  surname: string;
  email: string;
  password: string;
}
export function validateRegister(userData: UserData) {
  const errors: any = {};
  if (!userData.name) {
    errors.name = ["Name is required"];
  }

  if (!userData.surname) {
    errors.surname = ["Surname is required"];
  }

  if (!userData.email) {
    errors.email = ["Email is required"];
  } else if (!/\S+@\S+\.\S+/.test(userData.email)) {
    errors.email = ["Email is not valid"];
  }

  if (!userData.password) {
    errors.password = ["Password is required"];
  } else if (userData.password.length < 8) {
    errors.password = ["Password must be at least 8 characters long"];
  }

  return errors;
}
