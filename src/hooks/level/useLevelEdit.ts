import { useState, useEffect } from "react";
import { useGet, usePut } from "@hooks/index.ts";
import {
  validateLevelName,
  validateLevelDescription,
  Level,
} from "@utils/index.ts";

export const useLevelEdit = (levelId: string | undefined) => {
  const {
    loading,
    error,
    data: levelData,
  } = useGet<Level>(`/api/levels/${levelId}`);
  const level = Array.isArray(levelData) ? levelData[0] : levelData;

  const [isInitialized, setIsInitialized] = useState(false);
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [formErrors, setFormErrors] = useState<{
    name?: string;
    description?: string;
  }>({});

  const { update } = usePut<Level>(`/api/levels`);

  useEffect(() => {
    if (level && !isInitialized) {
      setName(level.name || "");
      setDescription(level.description?.toString() || "");
      setIsInitialized(true);
    }
  }, [level, isInitialized]);

  const handleSave = async () => {
    console.log();
    const nameError = validateLevelName(name);
    const descriptionError = validateLevelDescription(description);
    if (nameError || descriptionError) {
      setFormErrors({
        name: nameError,
        description: descriptionError,
      });
      return;
    }
    const updatedLevel: Level = {
      name,
      description: description,
    };
    return await update(levelId, updatedLevel);
  };
  return {
    loading,
    error,
    oldLevel: level,
    name,
    description,
    formErrors,
    setName,
    setDescription,
    handleSave,
  };
};
