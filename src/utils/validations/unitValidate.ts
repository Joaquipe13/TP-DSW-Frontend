const validateUnitName = (name: string): string | undefined => {
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

const validateUnitContent = (content: string): string | undefined => {
  const trimmedContent = content.trim();
  if (!trimmedContent) {
    return "The unit content is required.";
  }
  if (trimmedContent.length < 1) {
    return "The content must be at least 1 characters long.";
  }
  if (trimmedContent.length > 2000) {
    return "The content must not exceed 1000 characters.";
  }
  return undefined;
};

export { validateUnitName, validateUnitContent };
