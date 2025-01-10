import { useState } from "react";
import { Topic } from "../../types";

export const useSelectedTopics = () => {
  const [selectedTopics, setSelectedTopics] = useState<Topic[]>([]);
  const [selectedTopicsIds, setSelectedTopicsIds] = useState<number[]>([]);

  const handleSelectTopic = (topic: Topic) => {
    if (selectedTopics.some((t) => t.id === topic.id)) {
      setSelectedTopics(selectedTopics.filter((t) => t.id !== topic.id));
      setSelectedTopicsIds(selectedTopicsIds.filter((id) => id !== topic.id));
    } else {
      setSelectedTopics([...selectedTopics, topic]);
      setSelectedTopicsIds([...selectedTopicsIds, topic.id]);
    }
  };

  return { selectedTopics, selectedTopicsIds, handleSelectTopic };
};
