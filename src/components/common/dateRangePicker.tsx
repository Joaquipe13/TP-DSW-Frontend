import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";

interface DateRangePickerProps {
  startDate: Date | undefined;
  setStartDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
  endDate: Date | undefined;
  setEndDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
}

export const DateRangePicker: React.FC<DateRangePickerProps> = ({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}) => {
  return (
    <Form className="text-center">
      <Row>
        <Col md={6}>
          <Form.Group controlId="start-date">
            <Form.Label>Start Date:&nbsp;</Form.Label>
            <DatePicker
              selected={startDate}
              onChange={(date: Date | null) => setStartDate(date ?? undefined)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              dateFormat="yyyy/MM/dd"
              className="form-control"
            />
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group controlId="end-date">
            <Form.Label>End Date:&nbsp;</Form.Label>
            <DatePicker
              selected={endDate}
              onChange={(date: Date | null) => setEndDate(date ?? undefined)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate || undefined}
              dateFormat="yyyy/MM/dd"
              className="form-control"
            />
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col>
          {startDate && endDate && (
            <p>
              Selected range: {startDate.toLocaleDateString()} to{" "}
              {endDate.toLocaleDateString()}
            </p>
          )}
        </Col>
      </Row>
    </Form>
  );
};
