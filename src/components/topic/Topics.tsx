import { useEffect } from "react";
import { useGet } from "../common/hooks/useGet";
import { Topic } from "../types";
import ListGroup from "react-bootstrap/ListGroup";
import { Loading, Error } from "../common/utils";
interface TopicsProps {
  selectedTopics: Topic[];
  onSelectTopic?: (topic: Topic) => void;
}
export const Topics: React.FC<TopicsProps> = ({
  selectedTopics,
  onSelectTopic,
}) => {
  const {
    data: topics,
    error,
    loading,
    fetchData,
  } = useGet<Topic>(`/api/topics`);

  const availableTopics = onSelectTopic
    ? topics?.filter(
        (topic) => !selectedTopics.some((selected) => selected.id === topic.id)
      )
    : selectedTopics;

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;

  return (
    <div className="d-flex flex-wrap">
      <ListGroup horizontal style={{ display: "flex", flexWrap: "wrap" }}>
        {availableTopics && availableTopics.length > 0 ? (
          availableTopics.map((topic) => (
            <ListGroup.Item
              key={topic.id}
              style={{
                backgroundColor: "#F0F0F0",
                borderRadius: "20px",
                padding: "0px 4px",
                cursor: onSelectTopic ? "pointer" : "default",
                marginRight: "4px",
                color: "#000",
                fontSize: "12px",
                flex: "0 1 48%", // Dos por fila, ajustable según el espacio
                marginBottom: "8px",
                maxWidth: "200px", // Limita el ancho a 200px
                overflow: "hidden", // Oculta el contenido que exceda el límite
                textOverflow: "ellipsis", // Muestra "..." si el texto se corta
                whiteSpace: "nowrap", // Evita que el texto se rompa en varias líneas
              }}
              onClick={() => onSelectTopic && onSelectTopic(topic)}
            >
              {topic.description.length > 20
                ? topic.description.slice(0, 20) + "..."
                : topic.description}
            </ListGroup.Item>
          ))
        ) : (
          <p>No more topics available</p>
        )}
      </ListGroup>
    </div>
  );
};
