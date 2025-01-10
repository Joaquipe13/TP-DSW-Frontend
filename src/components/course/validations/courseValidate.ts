export const validateTitle = (title: string) => {
  const trimmedTitle = title.trim();
  if (!title || trimmedTitle === "") {
    return "Title is required.";
  }
  if (trimmedTitle.length > 40) {
    return "Title cannot be longer than 50 characters.";
  }
  return "";
};

export const validateResume = (resume: string) => {
  const trimmedResume = resume.trim();
  if (!resume || trimmedResume === "") {
    return "Resume cannot be longer than 255 characters.";
  }
  return "";
};

export const validatePrice = (price: string) => {
  const parsedPrice = parseFloat(price);
  if (isNaN(parsedPrice) || parsedPrice <= 0) {
    return "Price must be a positive number.";
  }
  return "";
};

export const validateTopics = (selectedTopics: any[]) => {
  if (selectedTopics.length === 0) {
    return "At least one topic must be selected.";
  }
  return "";
};
