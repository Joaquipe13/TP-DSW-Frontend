import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Loading from "../common/loading";
import Error from "../common/error";
import usePost from "@hooks/crud/usePost";
import {
  validateLevelName,
  validateLevelDescription,
} from "@utils/validations/levelValidate";
import { Level } from "@utils/types";

interface LevelCreateProps {
  course: string | undefined;
}
const LevelCreate: React.FC<LevelCreateProps> = ({ course }) => {
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

  const handleCreate = () => {
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
        if (data.id) {
          console.log(
            `Level "${name}" was created with ID ${data.id}.`
          );
          navigate(`/level/update/${courseId}/${data.id}`);
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
            data-testid="level-name"
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
            data-testid="level-description"
          />
          <Form.Control.Feedback type="invalid">
            {formErrors.description}
          </Form.Control.Feedback>
        </Form.Group>

        <div className="d-flex justify-content-center">
          <Button variant="success" onClick={handleCreate} className="mt-4" data-testid="create-level-button">
            Create Level
          </Button>
        </div>
      </Form>
    </Card>
  );
};
export default LevelCreate;
