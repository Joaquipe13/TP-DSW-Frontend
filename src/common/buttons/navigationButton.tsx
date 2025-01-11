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
}

export const NavigationButton: React.FC<NavigationButtonProps> = ({
  to,
  label,
  style,
  variant,
  children,
  className,
}) => {
  return (
    <LinkContainer to={to} className={className}>
      <Nav.Link>
        <Button style={style} variant={variant}>
          {label}
          {children}
        </Button>
      </Nav.Link>
    </LinkContainer>
  );
};
