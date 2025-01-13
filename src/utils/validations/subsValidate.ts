const validateSubsDescription = (description: string) => {
  if (!description || description.trim() === "") {
    return "Description is required.";
  }
  return "";
};

const validateSubsPrice = (price: string) => {
  const parsedPrice = parseFloat(price);
  if (isNaN(parsedPrice) || parsedPrice <= 0) {
    return "Price must be a positive number.";
  }
  return "";
};

const validateSubsDuration = (duration: string) => {
  const parsedDuration = parseInt(duration);
  if (isNaN(parsedDuration) || parsedDuration <= 0) {
    return "Duration must be a positive number.";
  }
  return "";
};

export { validateSubsDescription, validateSubsPrice, validateSubsDuration };
