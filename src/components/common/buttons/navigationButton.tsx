import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import { LinkContainer } from "react-router-bootstrap";

interface NavigationButtonProps {
  to: string;
  label?: string;
  style?: React.CSSProperties;
  variant?: string;
  children?: React.ReactNode;
  className?: string;
  dataTestId?: string;
}

const NavigationButton: React.FC<NavigationButtonProps> = ({
  to,
  label,
  style,
  variant,
  children,
  className,
  dataTestId,
}) => {
  return (
    <LinkContainer to={to} className={className}>
      <Nav.Link>
        <Button style={style} variant={variant} data-testid={dataTestId}>
          {label}
          {children}
        </Button>
      </Nav.Link>
    </LinkContainer>
  );
};
export default NavigationButton;
