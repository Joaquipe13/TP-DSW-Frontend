import { useParams } from "react-router-dom";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGet } from "../hooks/useGet";
import { Course, Level, Topic } from "../types";
import "./../../index.css";
import { remove } from "../hooks/useDelete";
import { LevelGetOne } from "../level/LevelFindOne";
import { TopicGetOne } from "../topic/TopicFindOne";
import { DateComponent } from "../date";

export const CourseFindOne = () => {
  const { id } = useParams();
  const {
    data: course,
    loading,
    error,
    fetchData,
  } = useGet<Course>(`/api/courses/${id}`);
  const navigate = useNavigate();

  const handleRemove = () => {
    const confirmed = window.confirm(
      `¿Desea eliminar el course: ${course?.title}?`
    );
    if (confirmed) {
      remove(`/api/courses/${id}`);
      console.log(`El course ${course?.title} fue creado.`);
      navigate("/course");
      // Aquí puedes agregar la lógica para crear el course
    } else {
      console.log(`Creación del course ${course?.title} cancelada.`);
    }
  };
  useEffect(() => {
    fetchData();
  }, [fetchData, id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  console.log(course?.createAt);
  return (
    <div>
      <h2>Course</h2>
      <hr></hr>
      <p>Id: {course?.id}</p>
      <p>Title: {course?.title} </p>
      <p>
        Created at: <DateComponent date={course?.createAt} />
      </p>
      <div>
        Topics:
        <ul>
          {Array.isArray(course?.topics) && course?.topics.length > 0 ? (
            course?.topics.map((topic: Topic) => (
              <li key={topic.id}>
                <div>
                  <TopicGetOne id={topic.id} />
                </div>
              </li>
            ))
          ) : (
            <p>No topics available</p>
          )}
        </ul>
      </div>
      <p>Price: {course?.price}</p>
      <div>
        <ul>
          {Array.isArray(course?.levels) && course?.levels.length > 0 ? (
            course?.levels.map((level: Level, index: number) => (
              <li key={level.id}>
                <div>
                  <h3>Level {index + 1}</h3>
                  <LevelGetOne id={level.id} />
                </div>
              </li>
            ))
          ) : (
            <p>No levels available</p>
          )}
        </ul>
        <Link to={`/level/create/${course?.id}`}>Add Level</Link>
      </div>
      <p></p>
      <button className="delete-button" onClick={handleRemove}>
        Delete
      </button>
      <button className="edit-button">
        <Link to={`/course/update/${course?.id}?title=${course?.title}`}>
          Edit
        </Link>
      </button>
      <p></p>
      <button>
        <Link to="/course">Back to Courses</Link>
      </button>
    </div>
  );
};

//el add topic y add level por ahi lo tendriamos que poner solo en el edit

interface CourseGetOneProps {
  id: number;
}

export const CourseGetOne: React.FC<CourseGetOneProps> = ({ id }) => {
  const {
    data: course,
    loading,
    error,
    fetchData,
  } = useGet<Course>(`/api/courses/${id}`);
  const navigate = useNavigate();

  const handleRemove = () => {
    const confirmed = window.confirm(
      `¿Desea eliminar el course: ${course?.title}?`
    );
    if (confirmed) {
      remove(`/api/courses/${id}`);
      console.log(`El course ${course?.title} fue creado.`);
      navigate("/course");
      // Aquí puedes agregar la lógica para crear el course
    } else {
      console.log(`Creación del course ${course?.title} cancelada.`);
    }
  };
  useEffect(() => {
    fetchData();
  }, [fetchData, id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  console.log(course?.createAt);
  return (
    <div>
      <h3>{course?.title} </h3>
      <p>
        Created at: <DateComponent date={course?.createAt} />
      </p>
      <div>
        Topics:
        <ul>
          {Array.isArray(course?.topics) && course?.topics.length > 0 ? (
            course?.topics.map((topic: Topic) => (
              <li key={topic.id}>
                <div>
                  <TopicGetOne id={topic.id} />
                </div>
              </li>
            ))
          ) : (
            <p>No topics available</p>
          )}
        </ul>
      </div>
      <p>Price: {course?.price}</p>
      <div>
        <ul>
          {Array.isArray(course?.levels) && course?.levels.length > 0 ? (
            course?.levels.map((level: Level, index: number) => (
              <li key={level.id}>
                <div>
                  <h3>Level {index + 1}</h3>
                  <LevelGetOne id={level.id} />
                </div>
              </li>
            ))
          ) : (
            <p>No levels available</p>
          )}
        </ul>
        <Link to={`/level/create/${course?.id}`}>Add Level</Link>
      </div>
      <p></p>
      <button className="edit-button">
        <Link to={`/course/update/${course?.id}?title=${course?.title}`}>
          Edit
        </Link>
      </button>
      <p></p>
    </div>
  );
};
