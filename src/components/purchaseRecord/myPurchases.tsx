import { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import Loading from "../common/loading";
import Error from "../common/error";
import NavigationButton from "../common/buttons/navigationButton";
import useGet from "@hooks/crud/useGet";
import useSortList from "@hooks/purchaseRecord/useSortList";
import { CoursePurchaseRecord } from "@utils/types";
interface MyPurchasesListProps {
  startDate?: Date;
  endDate?: Date;
  userId: string | null;
}
const MyPurchasesList: React.FC<MyPurchasesListProps> = ({
  startDate,
  endDate,
  userId,
}) => {
  const [isLoading, setLoading] = useState(true);
  const [queryString, setQueryString] = useState(`?user=${userId}`);
  const [isIdSortedDesc, setSortedDesc] = useState(false);
  const [isCourseSortedDesc, setCourseSortedDesc] = useState(false);
  const [isUserSortedDesc, setUserSortedDesc] = useState(false);
  const [isPurchDateSortedDesc, setPurchDateSortedDesc] = useState(false);
  const [isAmountSortedDesc, setAmountSortedDesc] = useState(false);
  const setSortStarteDesc = (key: keyof CoursePurchaseRecord) => {
    switch (key) {
      case "id":
        setSortedDesc(!isIdSortedDesc);
        setCourseSortedDesc(false);
        setPurchDateSortedDesc(false);
        setUserSortedDesc(false);
        setAmountSortedDesc(false);
        break;

      case "course":
        setCourseSortedDesc(!isCourseSortedDesc);
        setSortedDesc(false);
        setPurchDateSortedDesc(false);
        setUserSortedDesc(false);
        setAmountSortedDesc(false);
        break;
      case "purchaseAt":
        setPurchDateSortedDesc(!isPurchDateSortedDesc);
        setSortedDesc(false);
        setCourseSortedDesc(false);
        setUserSortedDesc(false);
        setAmountSortedDesc(false);
        break;

      case "totalAmount":
        setAmountSortedDesc(!isAmountSortedDesc);
        setSortedDesc(false);
        setCourseSortedDesc(false);
        setPurchDateSortedDesc(false);
        setUserSortedDesc(false);
        break;
      default:
        break;
    }
  };

  const {
    data: response,
    error,
    loading,
    fetchData,
  } = useGet<CoursePurchaseRecord>(`/api/CoursePurchaseRecords${queryString}`);
  useEffect(() => {
    const query =
      `?user=${userId}` +
      (startDate ? `&startDate=${startDate.toISOString()}` : "") +
      (endDate ? `&endDate=${endDate.toISOString()}` : "");
    setQueryString(query);
    fetchData();
    setLoading(loading);
  }, [startDate, endDate]);

  const [purchaseRecords, setPurchaseRecords] = useState<
    CoursePurchaseRecord[]
  >([]);
  const { sortList } = useSortList<CoursePurchaseRecord>();
  const handleSort = (key: keyof CoursePurchaseRecord) => {
    const sortedRecords = sortList(key, response?.coursePurchaseRecords);
    setSortStarteDesc(key);
    setPurchaseRecords(sortedRecords);
  };
  useEffect(() => {
    if (response?.coursePurchaseRecords) {
      setPurchaseRecords(response.coursePurchaseRecords);
    }
  }, [response]);

  if (isLoading) return <Loading />;
  if (error) return <Error message={error} />;

  return (
    <Container
      style={{ marginTop: "2rem", minHeight: "100vh", paddingBottom: "70px" }}
    >
      {purchaseRecords.length > 0 ? (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>
                ID
                <span
                  onClick={() => handleSort("id")}
                  style={{ cursor: "pointer" }}
                >
                  {isIdSortedDesc ? <TiArrowSortedUp /> : <TiArrowSortedDown />}
                </span>
              </th>
              <th>
                Course Title
                <span
                  onClick={() => handleSort("course")}
                  style={{ cursor: "pointer" }}
                >
                  {isCourseSortedDesc ? (
                    <TiArrowSortedUp />
                  ) : (
                    <TiArrowSortedDown />
                  )}
                </span>
              </th>
              <th>
                User Name
                <span
                  onClick={() => handleSort("user")}
                  style={{ cursor: "pointer" }}
                >
                  {isUserSortedDesc ? (
                    <TiArrowSortedUp />
                  ) : (
                    <TiArrowSortedDown />
                  )}
                </span>
              </th>
              <th>
                Purchase Date
                <span
                  onClick={() => handleSort("purchaseAt")}
                  style={{ cursor: "pointer" }}
                >
                  {isPurchDateSortedDesc ? (
                    <TiArrowSortedUp />
                  ) : (
                    <TiArrowSortedDown />
                  )}
                </span>
              </th>
              <th>
                Total Amount
                <span
                  onClick={() => handleSort("totalAmount")}
                  style={{ cursor: "pointer" }}
                >
                  {isAmountSortedDesc ? (
                    <TiArrowSortedUp />
                  ) : (
                    <TiArrowSortedDown />
                  )}
                </span>
              </th>
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
      ) : (
        <p>No purchase records available</p>
      )}
    </Container>
  );
};
export default MyPurchasesList;
