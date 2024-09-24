import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useGet } from "./../hooks/useGet";
import { Topic } from "./../types";
import "./../../index.css";

interface TopicsProps {
  selectedTopics: Topic[];
  onSelectTopic: (topic: Topic) => void;
}
export const Topics: React.FC<TopicsProps> = ({
  selectedTopics,
  onSelectTopic,
}) => {
  const { data: topics, error, fetchData } = useGet<Topic>(`/api/topics`);

  const availableTopics = topics?.filter(
    (topic) => !selectedTopics.some((selected) => selected.id === topic.id)
  );

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  //if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="topic-list">
      <ul>
        {availableTopics && availableTopics.length > 0 ? (
          availableTopics?.map((topic) => (
            <li key={topic.id}>
              <button onClick={() => onSelectTopic(topic)}>
                {topic.description}
              </button>
            </li>
          ))
        ) : (
          <p>No topics available</p>
        )}
        <Link to="/topic/create">Create Topic</Link>
      </ul>
    </div>
  );
};
