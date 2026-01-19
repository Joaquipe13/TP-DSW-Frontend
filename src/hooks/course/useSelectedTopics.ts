import { useState, useEffect, useRef } from "react";
import { Topic } from "@utils/types";

const useSelectedTopics = (initialSelectedTopics: Topic[] = []) => {
  const [selectedTopics, setSelectedTopics] = useState<Topic[]>(initialSelectedTopics);
  const [selectedTopicsIds, setSelectedTopicsIds] = useState<string[]>(
    initialSelectedTopics.map(topic => topic.id)
  );
  const prevInitialRef = useRef<string>(JSON.stringify(initialSelectedTopics));

  useEffect(() => {
    const currentInitialStr = JSON.stringify(initialSelectedTopics);
    if (prevInitialRef.current !== currentInitialStr) {
      setSelectedTopics(initialSelectedTopics);
      setSelectedTopicsIds(initialSelectedTopics.map(topic => topic.id));
      prevInitialRef.current = currentInitialStr;
    }
  }, [initialSelectedTopics]);

  const handleSelectTopic = (topic: Topic) => {
    if (selectedTopics.some((t) => t.id === topic.id)) {
      setSelectedTopics(selectedTopics.filter((t) => t.id !== topic.id));
      setSelectedTopicsIds(selectedTopicsIds.filter((id) => id !== topic.id));
    } else {
      setSelectedTopics([...selectedTopics, topic]);
      setSelectedTopicsIds([...selectedTopicsIds, topic.id]);
    }
  };

  const deselectTopic = (topicId: string) => {
    setSelectedTopics(selectedTopics.filter((t) => t.id !== topicId));
    setSelectedTopicsIds(selectedTopicsIds.filter((id) => id !== topicId));
  };

  const deselectAllTopics = () => {
    setSelectedTopics([]);
    setSelectedTopicsIds([]);
  };

  return { selectedTopics, selectedTopicsIds, handleSelectTopic, deselectTopic, deselectAllTopics };
};

export default useSelectedTopics;
