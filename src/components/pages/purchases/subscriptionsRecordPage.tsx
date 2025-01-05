import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { DateRangePicker } from "../../common/utils/index.ts";
import {
  MySubscriptionsList,
  SubscriptionsList,
} from "../../purchaseRecord/index.ts";
import { userType } from "../../common/authentication/userType.ts";

export const SubscriptionsRecordPage: React.FC = () => {
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const role = userType();

  return (
    <Container className="mt-3" fluid>
      {role == "admin" ? (
        <h1 className="text-center">Subscriptions Page</h1>
      ) : (
        <h1 className="text-center">My Subscriptions</h1>
      )}
      <DateRangePicker
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
      />
      {role == "admin" ? (
        <SubscriptionsList
          startDate={startDate || undefined}
          endDate={endDate || undefined}
        />
      ) : (
        <MySubscriptionsList
          startDate={startDate || undefined}
          endDate={endDate || undefined}
        />
      )}
    </Container>
  );
};
