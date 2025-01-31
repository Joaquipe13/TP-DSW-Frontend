import { remove } from "@hooks/index";

export const deleteCourse = async (courseId: string) => {
  return await remove(`/api/courses/${courseId}`);
};
