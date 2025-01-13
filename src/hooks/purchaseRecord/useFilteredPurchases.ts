import { useMemo } from "react";
import { CoursePurchaseRecord } from "@utils/index.ts";

export function useFilteredPurchases(
  purchaseRecords: CoursePurchaseRecord[] | undefined,
  startDate?: Date,
  endDate?: Date
) {
  const records = Array.isArray(purchaseRecords) ? purchaseRecords : [];

  return useMemo(() => {
    if (!startDate && !endDate) {
      return records;
    }
    return records.filter((record) => {
      const purchaseDate = new Date(record.purchaseAt); // Convertir a objeto Date

      if (isNaN(purchaseDate.getTime())) {
        return false; // Verificar si es una fecha válida
      }

      if (startDate && endDate) {
        return purchaseDate >= startDate && purchaseDate <= endDate;
      } else if (startDate) {
        return purchaseDate >= startDate;
      } else if (endDate) {
        return purchaseDate <= endDate;
      }

      return true;
    });
  }, [records, startDate, endDate]);
}
