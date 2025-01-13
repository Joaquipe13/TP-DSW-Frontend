import { useState, useEffect } from "react";
import { useGet, usePut } from "@hooks/index.ts";
import {
  validateCourseTitle,
  validateCourseResume,
  validateCoursePrice,
  validateCourseTopics,
  Course,
  Topic,
} from "@utils/index.ts";

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
    const titleError = validateCourseTitle(title);
    const resumeError = validateCourseResume(resume);
    const priceError = validateCoursePrice(price);
    const topicsError = validateCourseTopics(selectedTopics);
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
