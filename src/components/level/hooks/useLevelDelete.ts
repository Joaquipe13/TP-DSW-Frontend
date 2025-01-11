import { remove } from "../../common/hooks";

export const deleteLevel = async (levelId: string) => {
  return await remove(`/api/levels/${levelId}`);
};
