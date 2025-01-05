import { useEffect } from "react";
import { Container, Table } from "react-bootstrap";
import { useGet } from "../common/hooks";
import { Loading, Error } from "../common/utils";
import { CoursePurchaseRecord } from "../types";
import { NavigationButton } from "../common/buttons";

interface PurchasesListProps {
  startDate?: Date;
  endDate?: Date;
}

export const PurchasesList: React.FC<PurchasesListProps> = ({
  startDate,
  endDate,
}) => {
  const queryString = startDate
    ? `?startDate=${startDate.toISOString()}` +
      (endDate ? `&endDate=${endDate.toISOString()}` : "")
    : endDate
    ? `?endDate=${endDate.toISOString()}`
    : "";
  const {
    data: response,
    error,
    loading,
    fetchData,
  } = useGet<CoursePurchaseRecord>(`/api/CoursePurchaseRecords${queryString}`);

  useEffect(() => {
    fetchData();
    console.log("purchaseRecords:", purchaseRecords);
  }, [fetchData]);
  const purchaseRecords = response?.coursePurchaseRecords || [];

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;

  return purchaseRecords.length > 0 ? (
    <Container style={{ marginTop: "2rem" }}>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Course Title</th>
            <th>User Name</th>
            <th>Purchase Date</th>
            <th>Total Amount</th>
          </tr>
        </thead>
        <tbody>
          {purchaseRecords.map((record) => (
            <tr key={record.id}>
              <td>{record.id}</td>
              <td>
                <NavigationButton
                  to={`/course/${record.course?.id}`}
                  label={record.course?.title || "N/A"}
                  variant="link"
                  style={{
                    padding: 0,
                    color: "inherit",
                    textDecoration: "none",
                  }}
                />
              </td>
              <td>
                {record.user?.surname || "N/A"}
                {", " + record.user?.name}
              </td>
              <td>
                {record.purchaseAt
                  ? new Date(record.purchaseAt).toLocaleDateString()
                  : "N/A"}
              </td>
              <td>${record.totalAmount.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  ) : (
    <p>No purchase records available</p>
  );
};
