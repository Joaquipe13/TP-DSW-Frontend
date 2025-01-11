import { remove } from "../../../common/hooks";

export const useDeleteTopic = (fetchData: () => void) => {
  const handleDeleteClick = async (topicId: number) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this topic?"
    );

    if (!isConfirmed) {
      return;
    }

    try {
      const status = await remove(`/api/topics/${topicId}`);
      if (status === 200) {
        alert("Topic deleted successfully!");
        fetchData();
      } else {
        alert("Failed to delete the topic. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting topic:", error);
      alert(`Error: ${error.message}`);
    }
  };

  return { handleDeleteClick };
};
