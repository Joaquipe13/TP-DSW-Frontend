import remove from "../crud/useDelete";

const deleteLevel = async (levelId: string) => {
  return await remove(`/api/levels/${levelId}`);
};
export default deleteLevel;
