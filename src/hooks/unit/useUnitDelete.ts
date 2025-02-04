import remove from "@hooks/crud/useDelete";

const deleteUnit = async (unitId: string) => {
  return await remove(`/api/units/${unitId}`);
};
export default deleteUnit;
