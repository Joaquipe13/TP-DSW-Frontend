import React from "react";
import Alert from "react-bootstrap/Alert";
interface NotAvailableAlertProps {
  object?: string;
}
const NotAvailableAlert: React.FC<NotAvailableAlertProps> = ({ object }) => {
  return (
    <Alert variant="info" className="text-center">
      No {object} available
    </Alert>
  );
};
export default NotAvailableAlert;
