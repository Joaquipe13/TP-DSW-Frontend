import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import { usePost } from "../../common/hooks";
import { Level } from "../../common/utils/types";
import {
  validateLevelName,
  validateLevelDescription,
} from "./validations/validateLevel";
import { Loading, Error } from "../../common/utils";
interface LevelCreateProps {
  course: string | undefined;
}
export const LevelCreate: React.FC<LevelCreateProps> = ({ course }) => {
  const { loading, error, create } = usePost<Level>("/api/levels");
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const courseId = parseInt(course!);

  const [formErrors, setFormErrors] = useState<{
    name?: string;
    description?: string;
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
      console.log(`error: ${error}`);
    }
  }, [loading, error]);

  const handleClick = () => {
    const nameError = validateLevelName(name);
    const descriptionError = validateLevelDescription(description);

    if (nameError || descriptionError) {
      setFormErrors({
        name: nameError,
        description: descriptionError,
      });
      return;
    }

    const confirmed = window.confirm(
      `Do you want to create the level: "${name}"?`
    );
    if (confirmed) {
      const newLevel: Level = {
        name: name.trim(),
        description: description.trim(),
        course: courseId,
      };

      create(newLevel).then((data) => {
        if (data.createdLevel?.id) {
          console.log(
            `Level "${name}" was created with ID ${data.createdLevel.id}.`
          );
          navigate(`/course/${courseId}`);
        } else {
          console.error("Error: No ID was received for the created level.");
          alert("There was an error creating the level. Please try again.");
        }
      });
    } else {
      console.log(`Creation of level "${name}" was cancelled.`);
    }
  };
  if (loading) return <Loading />;
  if (error) return <Error message={error} />;
  return (
    <Card body className="mb-4">
      <Form>
        <Form.Group className="mb-3" controlId="formLevelName">
          <Form.Label>Level Name</Form.Label>
          <Form.Control
            ref={inputRef}
            type="text"
            placeholder="Enter level name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            isInvalid={!!formErrors.name}
          />
          <Form.Control.Feedback type="invalid">
            {formErrors.name}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formLevelDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter level description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            isInvalid={!!formErrors.description}
            style={{
              textAlign: "left",
              paddingTop: "10px",
              resize: "vertical",
              minHeight: "120px",
              overflow: "hidden",
            }}
          />
          <Form.Control.Feedback type="invalid">
            {formErrors.description}
          </Form.Control.Feedback>
        </Form.Group>

        <div className="d-flex justify-content-center">
          <Button variant="success" onClick={handleClick} className="mt-4">
            Create Level
          </Button>
        </div>
      </Form>
    </Card>
  );
};
