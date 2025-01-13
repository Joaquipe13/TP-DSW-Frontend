import { useEffect } from "react";
import Row from "react-bootstrap/Row";
import { Col } from "react-bootstrap";
import { useGet } from "@hooks/index.ts";
import { Level } from "@utils/index.tsx";

interface LevelPreviewProps {
  id: number | string;
}

const LevelPreview: React.FC<LevelPreviewProps> = ({ id }) => {
  const levelId = typeof id === "string" ? parseInt(id) : id;
  const {
    data: level,
    loading,
    error,
    fetchData,
  } = useGet<Level>(`/api/levels/${levelId}`);
  const levelData = Array.isArray(level) ? level[0] : level;
  useEffect(() => {
    fetchData();
  }, [fetchData, levelId]);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  return (
    <Row className="align-items-center">
      <Col xs="auto" className="text-left">
        <strong>Level {levelData?.order}:</strong>
      </Col>
      <Col xs="auto" className="text-left">
        {levelData?.name}
      </Col>
    </Row>
  );
};

export default LevelPreview;
