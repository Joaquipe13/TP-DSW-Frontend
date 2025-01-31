import { remove } from "@hooks/index";

export const deleteUnit = async (unitId: string) => {
  return await remove(`/api/units/${unitId}`);
};
