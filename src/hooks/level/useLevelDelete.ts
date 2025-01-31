import { remove } from "@hooks/index";

export const deleteLevel = async (levelId: string) => {
  return await remove(`/api/levels/${levelId}`);
};
