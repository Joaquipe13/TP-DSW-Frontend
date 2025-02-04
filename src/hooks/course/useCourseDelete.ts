import remove from "../crud/useDelete";

const deleteCourse = async (courseId: string) => {
  return await remove(`/api/courses/${courseId}`);
};
export default deleteCourse;
