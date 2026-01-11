
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

interface LevelPreviewProps {
  order: number,
  name: string,
}

const LevelPreview: React.FC<LevelPreviewProps> = ( level ) => {
  return (
    <Row className="align-items-center">
      <Col xs="auto" className="text-left">
        <strong>Level {level?.order}:</strong>
      </Col>
      <Col xs="auto" className="text-left">
        {level?.name}
      </Col>
    </Row>
  );
};

export default LevelPreview;
