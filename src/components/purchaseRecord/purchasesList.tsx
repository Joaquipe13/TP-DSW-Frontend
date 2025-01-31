import { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import { Loading, Error, NavigationButton } from "@components/index";
import { useGet, useSortList } from "@hooks/index";
import { CoursePurchaseRecord } from "@utils/index";

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
      case "user":
        setUserSortedDesc(!isUserSortedDesc);
        setSortedDesc(false);
        setCourseSortedDesc(false);
        setPurchDateSortedDesc(false);
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

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  const [purchaseRecords, setPurchaseRecords] = useState<
    CoursePurchaseRecord[]
  >([]);
  const { sortList } = useSortList<CoursePurchaseRecord>();
  const handleSort = (key: keyof CoursePurchaseRecord) => {
    const sortedRecords = sortList(key, response?.coursePurchaseRecords);
    setSortStarteDesc(key)
    setPurchaseRecords(sortedRecords);
  };
  useEffect(() => {
    if (response?.coursePurchaseRecords) {
      setPurchaseRecords(response.coursePurchaseRecords);
    }
  }, [response]);

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;

  return purchaseRecords.length > 0 ? (
    <Container style={{ marginTop: "2rem" }}>
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
                {isUserSortedDesc ? <TiArrowSortedUp /> : <TiArrowSortedDown />}
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
    </Container>
  ) : (
    <p>No purchase records available</p>
  );
};
