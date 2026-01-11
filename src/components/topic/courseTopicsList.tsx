import ListGroup from "react-bootstrap/ListGroup";
import NotAvailableAlert from "@components/common/notAvailableAlert.js";
import { Topic } from "@utils/types";

interface CourseTopicsListProps {
  selectedTopics: Topic[]|Number[];
}

const CourseTopicsList: React.FC<CourseTopicsListProps> = ({
  selectedTopics,
}) => {
  return (
    <div className="d-flex flex-wrap">
      <ListGroup horizontal style={{ display: "flex", flexWrap: "wrap" }}>
        {selectedTopics && selectedTopics.length > 0 ? (
          selectedTopics.map((topic) => (
            <ListGroup.Item
              key={topic.id}
              style={{
                backgroundColor: "#6c757d",
                borderRadius: "50px",
                padding: "4px 10px",
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
            >
              {topic.description.length > 20
                ? topic.description.slice(0, 20) + "..."
                : topic.description}
            </ListGroup.Item>
          ))
        ) : (
          <NotAvailableAlert object="topics" />
        )}
      </ListGroup>
    </div>
  );
};

export default CourseTopicsList;
