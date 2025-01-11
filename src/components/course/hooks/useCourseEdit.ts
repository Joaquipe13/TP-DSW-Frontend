import { useState, useEffect } from "react";
import { Course, Topic } from "../../../common/utils/types";
import { useGet, usePut } from "../../../common/hooks";
import {
  validateTitle,
  validateResume,
  validatePrice,
  validateTopics,
} from "../validations/courseValidate";

export const useCourseEdit = (courseId: string) => {
  const {
    loading,
    error,
    data: courseData,
  } = useGet<Course>(`/api/courses/${courseId}`);
  const course = Array.isArray(courseData) ? courseData[0] : courseData;
  const [isInitialized, setIsInitialized] = useState(false);
  const [title, setTitle] = useState<string>("");
  const [resume, setResume] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [selectedTopics, setSelectedTopics] = useState<Topic[]>([]);
  const [formErrors, setFormErrors] = useState<{
    title?: string;
    resume?: string;
    price?: string;
    topics?: string;
  }>({});

  const { update } = usePut<Course>(`/api/courses`);

  useEffect(() => {
    if (course && !isInitialized) {
      setTitle(course.title || "");
      setResume(course.resume || "");
      setPrice(course.price?.toString() || "");
      setSelectedTopics(course.topics || []);
      setIsInitialized(true);
    }
  }, [course, isInitialized]);

  const handleSave = async (publish?: boolean) => {
    console.log(publish);
    const titleError = validateTitle(title);
    const resumeError = validateResume(resume);
    const priceError = validatePrice(price);
    const topicsError = validateTopics(selectedTopics);
    if (titleError || priceError || topicsError) {
      setFormErrors({
        title: titleError,
        resume: resumeError,
        price: priceError,
        topics: topicsError,
      });
      return;
    }
    const updatedCourse: Course = {
      title,
      resume,
      price: parseFloat(price),
      topics: selectedTopics.map((topic) => topic.id),
      isActive: publish ? true : false,
    };
    return await update(courseId, updatedCourse);
  };
  return {
    loading,
    error,
    oldCourse: course,
    title,
    resume,
    price,
    selectedTopics,
    formErrors,
    setTitle,
    setResume,
    setPrice,
    setSelectedTopics,
    handleSave,
  };
};
