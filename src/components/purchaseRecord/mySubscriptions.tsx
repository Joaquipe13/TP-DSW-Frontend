import { useEffect } from "react";
import { Container, Table } from "react-bootstrap";
import { useGet } from "../common/hooks/index.ts";
import { Loading, Error } from "../common/utils/index.ts";
import { SubsPurchaseRecord } from "../types.tsx";
import { getUser } from "../common/authentication/getUser.ts";
import { NavigationButton } from "../common/buttons";
interface MySubscriptionsListProps {
  startDate?: Date;
  endDate?: Date;
}
export const MySubscriptionsList: React.FC<MySubscriptionsListProps> = ({
  startDate,
  endDate,
}) => {
  const user = getUser();
  const queryString =
    (user ? `?user=${user.id}` : "") +
    (startDate ? `&startDate=${startDate.toISOString()}` : "") +
    (endDate ? `&endDate=${endDate.toISOString()}` : "");
  const {
    data: response,
    error,
    loading,
    fetchData,
  } = useGet<SubsPurchaseRecord>(`/api/subsPurchaseRecords${queryString}`);

  useEffect(() => {
    fetchData();
    console.log("purchaseRecords:", purchaseRecords);
  }, [fetchData]);
  const purchaseRecords = response?.subsPurchaseRecords || [];

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;

  return purchaseRecords.length > 0 ? (
    <Container style={{ marginTop: "2rem" }}>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Subscription Name</th>
            <th>Duration</th>
            <th>User Name</th>
            <th>Purchase Date</th>
            <th>Activation Date</th>
            <th>Total Amount</th>
          </tr>
        </thead>
        <tbody>
          {purchaseRecords.map((record) => (
            <tr key={record.id}>
              <td>{record.id}</td>
              <td>{record.subscription?.description || "N/A"}</td>
              <td className="text-center">
                {record.subscription?.duration + " days" || "N/A"}
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
              <td>
                {record.effectiveAt
                  ? new Date(record.effectiveAt).toLocaleDateString()
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
