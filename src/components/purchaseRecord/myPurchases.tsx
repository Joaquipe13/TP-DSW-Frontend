import { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import { useGet } from "../common/hooks/index.ts";
import { Loading, Error } from "../common/utils/index.ts";
import { CoursePurchaseRecord } from "../types.tsx";
import { NavigationButton } from "../common/buttons";
interface MyPurchasesListProps {
  startDate?: Date;
  endDate?: Date;
  userId: string | null;
}
export const MyPurchasesList: React.FC<MyPurchasesListProps> = ({
  startDate,
  endDate,
  userId,
}) => {
  const [isLoading, setLoading] = useState(true);
  const [queryString, setQueryString] = useState(`?user=${userId}`);

  useEffect(() => {
    const query =
      `?user=${userId}` +
      (startDate ? `&startDate=${startDate.toISOString()}` : "") +
      (endDate ? `&endDate=${endDate.toISOString()}` : "");
    console.log("query" + query);
    setQueryString(query);
    console.log(queryString);
    fetchData();
    setLoading(loading);
  }, [startDate, endDate]);

  const {
    data: response,
    error,
    loading,
    fetchData,
  } = useGet<CoursePurchaseRecord>(`/api/CoursePurchaseRecords${queryString}`);

  const purchaseRecords = response?.coursePurchaseRecords || [];

  if (isLoading) return <Loading />;
  if (error) return <Error message={error} />;

  return purchaseRecords.length > 0 ? (
    <Container
      style={{ marginTop: "2rem", minHeight: "100vh", paddingBottom: "70px" }}
    >
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
