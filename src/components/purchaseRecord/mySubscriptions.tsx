import { useEffect, useState } from "react";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import { Button, Container, Table } from "react-bootstrap";
import { Loading, Error } from "@components/index";
import { useGet, useSortList } from "@hooks/index";
import { SubsPurchaseRecord } from "@utils/index";
import { AiOutlineEye } from "react-icons/ai";
import { PurchaseDetailOverlay } from "./purchaseDetailOverlay";
interface MySubscriptionsListProps {
  startDate?: Date;
  endDate?: Date;
  userId: string | null;
}
export const MySubscriptionsList: React.FC<MySubscriptionsListProps> = ({
  startDate,
  endDate,
  userId,
}) => {
  const [isLoading, setLoading] = useState(true);
  const [queryString, setQueryString] = useState(`?user=${userId}`);
  const [isIdSortedDesc, setIdSortedDesc] = useState(false);
  const [isDurationSortedDesc, setDurationSortedDesc] = useState(false);
  const [isPurchDateSortedDesc, setPurchDateSortedDesc] = useState(false);
  const [isActDateSortedDesc, setActDateSortedDesc] = useState(false);
  const [isAmountSortedDesc, setAmountSortedDesc] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [purchaseRecord, setPurchaseRecord] =
    useState<SubsPurchaseRecord | null>(null);
  const onHide = () => setShowDetail(false);
  const handleShowDetail = (record: SubsPurchaseRecord) => {
    setPurchaseRecord(record);
    setShowDetail(true);
  };
  const setSortStarteDesc = (key: keyof SubsPurchaseRecord) => {
    switch (key) {
      case "id":
        setIdSortedDesc(!isIdSortedDesc);
        setDurationSortedDesc(false);
        setPurchDateSortedDesc(false);
        setActDateSortedDesc(false);
        setAmountSortedDesc(false);
        break;

      case "subscription":
        setDurationSortedDesc(!isDurationSortedDesc);
        setIdSortedDesc(false);
        setPurchDateSortedDesc(false);
        setActDateSortedDesc(false);
        setAmountSortedDesc(false);
        break;
      case "purchaseAt":
        setPurchDateSortedDesc(!isPurchDateSortedDesc);
        setIdSortedDesc(false);
        setDurationSortedDesc(false);
        setActDateSortedDesc(false);
        setAmountSortedDesc(false);
        break;
      case "effectiveAt":
        setActDateSortedDesc(!isActDateSortedDesc);
        setIdSortedDesc(false);
        setDurationSortedDesc(false);
        setPurchDateSortedDesc(false);
        setAmountSortedDesc(false);
        break;
      case "totalAmount":
        setAmountSortedDesc(!isAmountSortedDesc);
        setIdSortedDesc(false);
        setDurationSortedDesc(false);
        setPurchDateSortedDesc(false);
        setActDateSortedDesc(false);
        break;
      default:
        break;
    }
  };
  useEffect(() => {
    const query =
      `?user=${userId}` +
      (startDate ? `&startDate=${startDate.toISOString()}` : "") +
      (endDate ? `&endDate=${endDate.toISOString()}` : "");
    console.log("query" + query);
    setQueryString(query);
    fetchData();
    setLoading(loading);
  }, [startDate, endDate]);

  const {
    data: response,
    error,
    loading,
    fetchData,
  } = useGet<SubsPurchaseRecord>(`/api/subsPurchaseRecords${queryString}`);

  const [purchaseRecords, setPurchaseRecords] = useState<SubsPurchaseRecord[]>(
    []
  );
  const { sortList } = useSortList<SubsPurchaseRecord>();
  const handleSort = (key: keyof SubsPurchaseRecord) => {
    const sortedRecords = sortList(key, response);
    setSortStarteDesc(key);
    setPurchaseRecords(sortedRecords);
  };
  useEffect(() => {
    console.log(response);
    if (response) {
      setPurchaseRecords(response);
    }
  }, [response]);

  if (isLoading) return <Loading />;
  if (error) return <Error message={error} />;

  return purchaseRecords.length > 0 ? (
    <Container
      className="bg-light text-center p-3"
      style={{ marginTop: "2rem", minHeight: "100vh", paddingBottom: "70px" }}
    >
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
            <th>Subscription Name</th>
            <th>
              Duration
              <span
                onClick={() => handleSort("subscription")}
                style={{ cursor: "pointer" }}
              >
                {isDurationSortedDesc ? (
                  <TiArrowSortedUp />
                ) : (
                  <TiArrowSortedDown />
                )}
              </span>
            </th>
            <th>User Name</th>
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
              Activation Date
              <span
                onClick={() => handleSort("effectiveAt")}
                style={{ cursor: "pointer" }}
              >
                {isActDateSortedDesc ? (
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
              <td>
                <Button
                  variant="outline-primary"
                  onClick={() => {
                    handleShowDetail(record);
                  }}
                >
                  <AiOutlineEye size={20} />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <PurchaseDetailOverlay
        show={showDetail}
        onHide={onHide}
        record={purchaseRecord}
      />
    </Container>
  ) : (
    <p>No purchase records available</p>
  );
};
