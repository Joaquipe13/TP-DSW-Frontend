import { useState, useEffect } from "react";
import { useGet, usePut } from "@hooks/index.ts";
import { validateUnitName, validateUnitContent, Unit } from "@utils/index.ts";

export const useUnitEdit = (unitId: string | undefined) => {
  const {
    loading,
    error,
    data: unitData,
  } = useGet<Unit>(`/api/units/${unitId}`);
  const unit = Array.isArray(unitData) ? unitData[0] : unitData;

  const [isInitialized, setIsInitialized] = useState(false);
  const [name, setName] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [formErrors, setFormErrors] = useState<{
    name?: string;
    content?: string;
  }>({});

  const { update } = usePut<Unit>(`/api/units`);

  useEffect(() => {
    if (unit && !isInitialized) {
      setName(unit.name || "");
      setContent(unit.content?.toString() || "");
      setIsInitialized(true);
    }
  }, [unit, isInitialized]);

  const handleSave = async () => {
    console.log();
    const nameError = validateUnitName(name);
    const contentError = validateUnitContent(content);
    if (nameError || contentError) {
      setFormErrors({
        name: nameError,
        content: contentError,
      });
      return;
    }
    const updatedUnit: Unit = {
      name,
      content: content,
    };
    return await update(unitId, updatedUnit);
  };
  return {
    loading,
    error,
    oldUnit: unit,
    name,
    content,
    formErrors,
    setName,
    setContent,
    handleSave,
  };
};
