import React from "react";
import { Form } from "react-bootstrap";

function Checkbox({ className, checked, style, ...props }: React.ComponentProps<"input">) {
  return (
    <Form.Check
      type="checkbox"
      checked={checked}
      className={className}
      style={{
        ...style
      }}
      {...props}
    />
  );
}

export { Checkbox };
