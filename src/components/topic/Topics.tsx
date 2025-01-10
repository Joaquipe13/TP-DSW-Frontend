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
                backgroundColor: "#6c757d", // Gris similar al fondo del badge
                borderRadius: "50px", // Bordes redondeados para parecerse más al badge
                padding: "4px 10px", // Añadí algo más de espacio horizontal
                cursor: "pointer", // Cambié esto para siempre mostrar el cursor de pointer
                marginRight: "4px",
                color: "#fff", // Cambié el color del texto a blanco para mayor contraste
                fontSize: "12px", // Tamaño de fuente similar al del badge
                display: "inline-block", // Asegura que el elemento se acomode junto a otros
                marginBottom: "8px",
                maxWidth: "150px", // Limita el ancho
                overflow: "hidden", // Evita que el texto sobresalga
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
