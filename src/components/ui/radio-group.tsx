import React, { createContext, useContext, useMemo } from "react";
import { Form } from "react-bootstrap";

type RadioGroupContextType = {
  value: string;
  onValueChange: (value: string) => void;
  name: string;
};

const RadioGroupContext = createContext<RadioGroupContextType | null>(null);

type RadioGroupProps = React.ComponentProps<"div"> & {
  value?: string;
  onValueChange?: (value: string) => void;
};

function RadioGroup({ 
  className, 
  children, 
  value, 
  onValueChange,
  ...props 
}: RadioGroupProps) {
  const groupName = useMemo(() => `radio-group-${Math.random().toString(36).substr(2, 9)}`, []);
  
  return (
    <RadioGroupContext.Provider value={{ value: value || '', onValueChange: onValueChange || (() => {}), name: groupName }}>
      <div className={className} {...props}>
        {children}
      </div>
    </RadioGroupContext.Provider>
  );
}

function RadioGroupItem({ className, id, value, ...props }: React.ComponentProps<"input">) {
  const context = useContext(RadioGroupContext);
  const isChecked = context?.value === value;
  const name = context?.name || 'radio-group';
  const handleChange = context?.onValueChange || (() => {});
  
  return (
    <Form.Check
      type="radio"
      id={id}
      name={name}
      value={value}
      checked={isChecked}
      onChange={(e) => {
        if (e.target.checked) {
          handleChange(value || '');
        }
      }}
      className={className}
      {...props}
    />
  );
}

export { RadioGroup, RadioGroupItem };
