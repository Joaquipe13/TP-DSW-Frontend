import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Loading from "../common/loading";
import Error from "../common/error";
import usePost from "@hooks/crud/usePost";
import { Course } from "@utils/types";
import {
  validateCoursePrice,
  validateCourseTitle,
  validateCourseTopics,
} from "@utils/validations/courseValidate";
import EditCourseTopicList from "@components/topic/editCourseTopicList";

const CourseCreate = () => {
  const { loading, error, create } = usePost<Course>("/api/courses/");
  const [title, setTitle] = useState<string>("");
  const [resume, setResume] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [selectedTopicsIds, setSelectedTopicsIds] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const [formErrors, setFormErrors] = useState<{
    title?: string;
    resume?: string;
    price?: string;
    topics?: string;
  }>({});

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (loading) {
      console.log("loading...");
    }
    if (error) {
      console.log(`error ${error}`);
    }
  }, [loading, error]);

  const handleClick = () => {
    const titleError = validateCourseTitle(title);
    const resumeError = validateCourseTitle(resume);
    const priceError = validateCoursePrice(price);
    const topicsError = validateCourseTopics(selectedTopicsIds);

    if (titleError || resumeError || priceError || topicsError) {
      setFormErrors({
        title: titleError,
        resume: resumeError,
        price: priceError,
        topics: topicsError,
      });
      return;
    }

    const confirmed = window.confirm(
      `Do you want to create the course: "${title}"?`
    );
    if (confirmed) {
      const newCourse: Course = {
        title: title,
        resume: resume,
        price: parseFloat(price),
        topics: selectedTopicsIds,
      };
      create(newCourse).then((data) => {
        console.log(data);
        if (data.id) {
          console.log(
            `Course ${title} was created with ID ${data.id}.`
          );
          navigate(`/course/${data.id}`);
        } else {
          console.error("Error: No ID was received for the created course.");
          alert("There was an error creating the course. Please try again.");
        }
      });
    } else {
      console.log(`Creación del curso ${title} cancelada.`);
    }
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;

  return (
    <Card body className="mb-4" style={{ marginTop: "1rem" }}>
      <Card.Header as="h2">Create a Course</Card.Header>
      <Card.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              ref={inputRef}
              type="text"
              placeholder="Course Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              isInvalid={!!formErrors.title}
              data-testid="course-title"
            />
            <Form.Control.Feedback type="invalid" data-testid="course-title-error">
              {formErrors.title}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Resume</Form.Label>
            <Form.Control
              ref={inputRef}
              type="text"
              placeholder="Course Resume"
              value={resume}
              onChange={(e) => setResume(e.target.value)}
              isInvalid={!!formErrors.resume}
              data-testid="course-resume"
            />
            <Form.Control.Feedback type="invalid" data-testid="course-resume-error">
              {formErrors.resume}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="text"
              placeholder="0000.00"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              isInvalid={!!formErrors.price}
              data-testid="course-price"
            />
            <Form.Control.Feedback type="invalid" data-testid="course-price-error">
              {formErrors.price}
            </Form.Control.Feedback>
          </Form.Group>
        </Form>
      </Card.Body>

      <EditCourseTopicList
        onTopicsChange={setSelectedTopicsIds}
      />
      <Card.Body className="mb-3">
        {formErrors.topics && (
          <div className="text-danger" data-testid="course-topics-error">
            {formErrors.topics}
          </div>
        )}
      </Card.Body>
      <Card.Body className="d-flex justify-content-center">
        <Button variant="success" onClick={handleClick} className="mt-4" data-testid="create-course-button">
          Create Course
        </Button>
      </Card.Body>
    </Card>
  );
};
export default CourseCreate;
