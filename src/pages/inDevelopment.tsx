import { useParams } from "react-router-dom";
import { NavigationButton } from "@components/index.ts";

export const InDevelopmentPage = () => {
  const { title } = useParams();

  return (
    <div>
      <br />
      <br />
      <h3>{title} page is in development</h3>
      <br />
      <br />
      <NavigationButton to="/" label="Back to main page" />
    </div>
  );
};
