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
                backgroundColor: "#6c757d", 
                borderRadius: "50px", 
                padding: "4px 10px", 
                cursor: "pointer",
                marginRight: "4px",
                color: "#fff",
                fontSize: "12px", 
                display: "inline-block",
                marginBottom: "8px",
                maxWidth: "150px", 
                overflow: "hidden", 
                textOverflow: "ellipsis",
                whiteSpace: "nowrap", 
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
