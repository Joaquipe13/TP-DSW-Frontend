import { remove } from "@hooks/index.ts";

export const deleteUnit = async (unitId: string) => {
  return await remove(`/api/units/${unitId}`);
};
