import React, { useEffect, useRef } from "react";
import { Button as BSButton } from "react-bootstrap";

type ButtonProps = React.ComponentProps<typeof BSButton> & {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  asChild?: boolean;
};

function Button({ variant = "default", size = "default", asChild, className, ...props }: ButtonProps) {
  // Map custom variants to Bootstrap variants
  const bsVariant = 
    variant === "destructive" ? "danger" :
    variant === "outline" ? "outline-primary" :
    variant === "secondary" ? "secondary" :
    variant === "ghost" ? "link" :
    variant === "link" ? "link" :
    "primary";

  const bsSize = size === "sm" ? "sm" : size === "lg" ? "lg" : undefined;

  // Process className to replace btn-primary and btn-outline-primary with btn-primarys and btn-outline-primarys
  const processClassName = (cls: string | undefined) => {
    if (!cls) return '';
    // Replace btn-primary with btn-primarys and btn-outline-primary with btn-outline-primarys
    return cls.replace(/\bbtn-primary\b/g, 'btn-primarys')
              .replace(/\bbtn-outline-primary\b/g, 'btn-outline-primarys')
              .trim();
  };

  // Add btn-primarys class when variant is primary/default, and btn-outline-primarys when outline
  let customClassName = '';
  if (variant === "default" || bsVariant === "primary") {
    customClassName = `btn-primarys ${processClassName(className)}`.trim();
  } else if (variant === "outline" || bsVariant === "outline-primary") {
    customClassName = `btn-outline-primarys ${processClassName(className)}`.trim();
  } else {
    customClassName = processClassName(className);
  }

  const buttonRef = useRef<HTMLButtonElement>(null);

  // Replace btn-primary with btn-primarys and btn-outline-primary with btn-outline-primarys after render
  useEffect(() => {
    if (buttonRef.current) {
      const element = buttonRef.current;
      if (element.classList.contains('btn-primary')) {
        element.classList.remove('btn-primary');
        element.classList.add('btn-primarys');
      }
      if (element.classList.contains('btn-outline-primary')) {
        element.classList.remove('btn-outline-primary');
        element.classList.add('btn-outline-primarys');
      }
    }
  }, [variant, bsVariant]);

  return (
    <BSButton
      ref={buttonRef}
      variant={bsVariant}
      size={bsSize}
      className={customClassName}
      {...props}
    />
  );
}

export { Button };
