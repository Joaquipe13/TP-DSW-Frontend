import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { DateRangePicker } from "../../common/utils/index.ts";
import { MyPurchasesList, PurchasesList } from "../../purchaseRecord/index.ts";
import { userType } from "../../common/authentication/userType.ts";

export const PurchasesRecordPage: React.FC = () => {
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const role = userType();

  return (
    <Container className="mt-3" fluid>
      {role == "admin" ? (
        <h1 className="text-center">Purchases Page</h1>
      ) : (
        <h1 className="text-center">My Purchases</h1>
      )}
      <DateRangePicker
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
      />
      {role == "admin" ? (
        <PurchasesList
          startDate={startDate || undefined}
          endDate={endDate || undefined}
        />
      ) : (
        <MyPurchasesList
          startDate={startDate || undefined}
          endDate={endDate || undefined}
        />
      )}
    </Container>
  );
};
