import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import { usePost } from "../common/hooks";
import { Unit } from "../types";
import {
  validateUnitName,
  validateUnitContent,
} from "./validations/validateUnit";
interface UnitCreateProps {
  level: string | undefined;
  course: string | undefined;
}
export const UnitCreate: React.FC<UnitCreateProps> = ({ level, course }) => {
  const { loading, error, create } = usePost<Unit>("/api/units");
  const [name, setName] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const levelId = parseInt(level!);
  console.log("levelId", levelId, "level", level);
  const [formErrors, setFormErrors] = useState<{
    name?: string;
    content?: string;
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
    const nameError = validateUnitName(name);
    const contentError = validateUnitContent(content);

    if (nameError || contentError) {
      setFormErrors({
        name: nameError,
        content: contentError,
      });
      return;
    }

    const confirmed = window.confirm(
      `Do you want to create the unit: "${name}"?`
    );
    if (confirmed) {
      const newUnit: Unit = {
        name: name.trim(),
        content: content.trim(),
        level: levelId,
      };

      create(newUnit).then((data) => {
        if (data) {
          console.log(`Unit "${name}" was created with ID: ${data.id}.`);
          navigate(`/level/${course}/${levelId}`);
        } else {
          console.error("Error: No ID was received for the created unit.");
          alert("There was an error creating the unit. Please try again.");
        }
      });
    } else {
      console.log(`Creation of unit "${name}" was cancelled.`);
    }
  };

  return (
    <Card body className="mb-4">
      <Form>
        <Form.Group className="mb-3" controlId="formUnitName">
          <Form.Label>Unit Name</Form.Label>
          <Form.Control
            ref={inputRef}
            type="text"
            placeholder="Enter unit name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            isInvalid={!!formErrors.name}
          />
          <Form.Control.Feedback type="invalid">
            {formErrors.name}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formUnitContent">
          <Form.Label>Content</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter unit content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            isInvalid={!!formErrors.content}
            style={{
              textAlign: "left",
              paddingTop: "10px",
              minHeight: "120px",
            }}
          />
          <Form.Control.Feedback type="invalid">
            {formErrors.content}
          </Form.Control.Feedback>
        </Form.Group>

        <div className="d-flex justify-content-center">
          <Button variant="success" onClick={handleClick} className="mt-4">
            Create Unit
          </Button>
        </div>
      </Form>
    </Card>
  );
};
