import React from "react";
import { Form } from "react-bootstrap";

function Input({ className, ...props }: React.ComponentProps<"input">) {
  return (
    <Form.Control
      type={props.type || "text"}
      className={className}
      {...props}
    />
  );
}

export { Input };
