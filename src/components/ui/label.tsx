import React from "react";
import { Form } from "react-bootstrap";

function Label({ className, ...props }: React.ComponentProps<"label">) {
  return (
    <Form.Label className={className} {...props} />
  );
}

export { Label };
