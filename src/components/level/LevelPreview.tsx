import { useEffect } from "react";
import { useGet } from "../../common/hooks/index.ts";
import Row from "react-bootstrap/Row";
import { Col } from "react-bootstrap";
import { Level } from "../../common/utils/types.tsx";

interface LevelPreviewProps {
  id: number | string;
}

export const LevelPreview: React.FC<LevelPreviewProps> = ({ id }) => {
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
