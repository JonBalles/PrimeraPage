import { Link } from "react-router-dom";

interface EdenLinkProps {
  to: string;
  icon: string;
  children: React.ReactNode;
}

export default function EdenLink({
  to,
  icon,
  children,
}: EdenLinkProps) {
  return (
    <Link to={to} className="eden-link">
      <span className="eden-link-icon">{icon}</span>
      <span>{children}</span>
    </Link>
  );
}