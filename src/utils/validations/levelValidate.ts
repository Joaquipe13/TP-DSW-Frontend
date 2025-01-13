const validateLevelName = (name: string): string | undefined => {
  const trimmedName = name.trim();
  const regex = /^[A-Za-z0-9\s.,-]+$/;
  if (!trimmedName) {
    return "The unit name is required.";
  }
  if (trimmedName.length < 1) {
    return "The unit name must be at least 1 characters long.";
  }
  if (trimmedName.length > 50) {
    return "The unit name must not exceed 50 characters.";
  }
  if (!regex.test(trimmedName)) {
    return "The unit name can only contain letters, numbers, spaces, periods, commas, and hyphens.";
  }
  return undefined;
};

const validateLevelDescription = (description: string): string | undefined => {
  const trimmedDescription = description.trim();
  if (!trimmedDescription) {
    return "The level description is required.";
  }
  if (trimmedDescription.length < 10) {
    return "The description must be at least 10 characters long.";
  }
  if (trimmedDescription.length > 200) {
    return "The description must not exceed 200 characters.";
  }
  return undefined;
};

export { validateLevelName, validateLevelDescription };
