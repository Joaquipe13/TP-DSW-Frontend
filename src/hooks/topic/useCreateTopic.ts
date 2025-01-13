import { useState } from "react";
import { usePost } from "@hooks/index.ts";
import { Topic } from "@utils/index.ts";

export const useCreateTopic = (fetchData: () => void) => {
  const [newTopicDescription, setNewTopicDescription] = useState<string>("");
  const { loading, error, create } = usePost<Topic>("/api/topics");

  const handleConfirmAdd = async () => {
    if (newTopicDescription.trim() !== "") {
      const newTopic: Topic = { description: newTopicDescription };
      const result = await create(newTopic);
      if (result) {
        alert("Topic created successfully!");
        setNewTopicDescription("");
        fetchData();
      } else {
        alert("Failed to create the topic. Please try again.");
      }
    } else {
      alert("Please enter a valid topic description.");
    }
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTopicDescription(e.target.value);
  };

  return {
    newTopicDescription,
    loading,
    error,
    handleConfirmAdd,
    handleDescriptionChange,
  };
};
