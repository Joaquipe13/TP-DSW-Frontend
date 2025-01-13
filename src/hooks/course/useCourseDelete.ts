import { remove } from "@hooks/index.ts";

export const deleteCourse = async (courseId: string) => {
  return await remove(`/api/courses/${courseId}`);
};
