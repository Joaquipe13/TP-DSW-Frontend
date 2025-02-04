import { useState } from "react";

function useSortList<T extends object>() {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof T | null;
    direction: "asc" | "desc";
  }>({
    key: null,
    direction: "asc",
  });

  const sortList = (key: keyof T, list: T[]): T[] => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }

    setSortConfig({ key, direction });

    const sortedList = [...list].sort((a, b) => {
      let aValue;
      let bValue;
      if (key === "course") {
        aValue = a[key]?.title;
        bValue = b[key]?.title;
      } else if (key === "subscription") {
        aValue = a[key]?.duration;
        bValue = b[key]?.duration;
      } else if (key === "user") {
        aValue = a[key]?.surname + " " + a[key]?.name;
        bValue = b[key]?.surname + " " + b[key]?.name;
      } else {
        aValue = a[key];
        bValue = b[key];
      }

      if (aValue < bValue) {
        return direction === "asc" ? -1 : 1;
      }
      if (aValue > bValue) {
        return direction === "asc" ? 1 : -1;
      }
      return 0;
    });

    return sortedList;
  };

  return { sortList };
}

export default useSortList;
