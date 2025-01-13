import { remove } from "@hooks/index.ts";

export const deleteLevel = async (levelId: string) => {
  return await remove(`/api/levels/${levelId}`);
};
