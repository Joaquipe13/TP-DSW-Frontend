import { useState, useEffect } from "react";
import useGet from "../crud/useGet";
import usePut from "../crud/usePut";
import {
  validateCourseTitle,
  validateCourseResume,
  validateCoursePrice,
  validateCourseTopics,
} from "@utils/validations/courseValidate";
import { Course, Topic } from "@utils/types";

const useCourseEdit = (courseId: string) => {
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
  const [selectedTopicsIds, setSelectedTopicsIds] = useState<string[]>([]);
  const [initialSelectedTopics, setInitialSelectedTopics] = useState<Topic[]>([]);
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
      const topics = course.topics || [];
      setInitialSelectedTopics(topics);
      const topicIds = topics.map((topic) => topic.id);
      setSelectedTopicsIds(topicIds);
      setIsInitialized(true);
    }
  }, [course, isInitialized]);

  useEffect(() => {
    if (selectedTopicsIds.length > 0 && formErrors.topics) {
      setFormErrors((prev) => ({ ...prev, topics: "" }));
    }
  }, [selectedTopicsIds, formErrors.topics]);

  const handleSave = async (publish?: boolean) => {
    console.log(publish);
    const titleError = validateCourseTitle(title);
    const resumeError = validateCourseResume(resume);
    const priceError = validateCoursePrice(price);
    const topicsError = validateCourseTopics(selectedTopicsIds);
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
      topics: selectedTopicsIds,
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
    initialSelectedTopics,
    selectedTopicsIds,
    formErrors,
    setTitle,
    setResume,
    setPrice,
    setSelectedTopicsIds,
    handleSave,
  };
};
export default useCourseEdit;
