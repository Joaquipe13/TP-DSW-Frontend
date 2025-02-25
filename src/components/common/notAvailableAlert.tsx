import { Alert } from "react-bootstrap";
import React from "react";
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
