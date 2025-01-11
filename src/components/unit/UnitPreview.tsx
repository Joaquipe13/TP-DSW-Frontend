import Row from "react-bootstrap/Row";
import { Col } from "react-bootstrap";

interface UnitPreviewProps {
  order: number | undefined;
  name: string | undefined;
}

export const UnitPreview: React.FC<UnitPreviewProps> = ({ order, name }) => {
  return (
    <Row className="align-items-center">
      <Col xs="auto" className="text-left">
        <strong>Unit {order}:</strong>
      </Col>
      <Col xs="auto" className="text-left">
        {name}
      </Col>
    </Row>
  );
};
