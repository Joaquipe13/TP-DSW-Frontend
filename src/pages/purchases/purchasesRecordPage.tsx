import React, { useEffect, useState } from "react";
import { Card, Container } from "react-bootstrap";
import {
  MyPurchasesList,
  PurchasesList,
  DateRangePicker,
  Loading,
} from "@components/index.ts";
import { userType, getUser } from "@utils/index.ts";

export const PurchasesRecordPage: React.FC = () => {
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [role, setRole] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchUserRole = async () => {
      setLoading(true);
      const fetchedRole = await userType();
      setRole(fetchedRole);
      setLoading(false);
    };
    fetchUserRole();
  }, []);
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        setUserId(null);
        const fetchedUser = await getUser();
        setUserId(fetchedUser.id);
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserId();
  }, []);

  return (
    <Container className="mt-3" fluid>
      <Card.Title
        style={{ fontSize: "40px", fontWeight: "bold", marginLeft: "1.5rem" }}
      >
        {role === "admin" ? "Purchases Page" : " My Purchases"}
      </Card.Title>
      <Card.Body className="text-center p-3 mb-3 mt-3">
        <DateRangePicker
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
        />
      </Card.Body>
      <Card className="bg-light text-center p-3 mb-3 mt-3">
        {loading ? (
          <Loading />
        ) : role === "admin" ? (
          <PurchasesList
            startDate={startDate || undefined}
            endDate={endDate || undefined}
          />
        ) : (
          <MyPurchasesList
            startDate={startDate || undefined}
            endDate={endDate || undefined}
            userId={userId}
          />
        )}
      </Card>
    </Container>
  );
};
