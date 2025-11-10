import React from "react";
import { ProgressBar } from "react-bootstrap";

function Progress({ value = 0, className, ...props }: React.ComponentProps<"div"> & { value?: number }) {
  return (
    <div className={className} {...props}>
      <ProgressBar now={value} />
    </div>
  );
}

export { Progress };
