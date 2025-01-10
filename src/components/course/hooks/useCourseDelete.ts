import { remove } from "../../common/hooks";

export const deleteCourse = async (courseId: string) => {
  return await remove(`/api/courses/${courseId}`);
};
