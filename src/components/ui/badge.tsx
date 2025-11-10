import React from "react";
import { Badge as BSBadge } from "react-bootstrap";

type BadgeProps = React.ComponentProps<typeof BSBadge> & {
  variant?: "default" | "secondary" | "destructive" | "outline";
  asChild?: boolean;
};

function Badge({ variant = "default", asChild, className, ...props }: BadgeProps) {
  const bsVariant = 
    variant === "destructive" ? "danger" :
    variant === "secondary" ? "secondary" :
    variant === "outline" ? "outline-primary" :
    "primary";

  return (
    <BSBadge bg={bsVariant} className={className} {...props} />
  );
}

export { Badge };
