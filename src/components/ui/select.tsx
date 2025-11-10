import React, { useState } from "react";

type SelectContextType = {
  value: string;
  onValueChange: (value: string) => void;
};

const SelectContext = React.createContext<SelectContextType | null>(null);

function Select({ children, value, onValueChange, ...props }: React.ComponentProps<"select"> & { 
  value?: string;
  onValueChange?: (value: string) => void;
}) {
  const [internalValue, setInternalValue] = useState(value || '');
  const currentValue = value !== undefined ? value : internalValue;
  const handleChange = onValueChange || setInternalValue;

  return (
    <SelectContext.Provider value={{ value: currentValue, onValueChange: handleChange }}>
      {children}
    </SelectContext.Provider>
  );
}

function SelectGroup({ children, ...props }: React.ComponentProps<"optgroup">) {
  return (
    <optgroup {...props}>
      {children}
    </optgroup>
  );
}

function SelectValue({ placeholder, ...props }: { placeholder?: string }) {
  return <option value="">{placeholder || "Select..."}</option>;
}

function SelectTrigger({ children, className, style, ...props }: React.ComponentProps<"select">) {
  const context = React.useContext(SelectContext);
  
  return (
    <select 
      value={context?.value || ''} 
      onChange={(e) => context?.onValueChange(e.target.value)}
      className={`theme-select ${className || ''}`}
      style={{
        borderColor: 'rgba(15, 23, 42, 0.1)',
        backgroundColor: '#f8fafc',
        borderRadius: '8px',
        padding: '0.5rem 0.75rem',
        paddingRight: '2.5rem',
        fontSize: '1rem',
        color: '#0f172a',
        border: '1px solid rgba(15, 23, 42, 0.1)',
        outline: 'none',
        cursor: 'pointer',
        appearance: 'none',
        backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%230d9488' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M2 5l6 6 6-6'/%3e%3c/svg%3e")`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right 0.75rem center',
        backgroundSize: '16px 12px',
        ...style
      }}
      onFocus={(e) => {
        e.currentTarget.style.borderColor = '#0d9488';
        e.currentTarget.style.border = '1px solid #0d9488';
        e.currentTarget.style.boxShadow = '0 0 0 0.2rem rgba(13, 148, 136, 0.25)';
        e.currentTarget.style.backgroundColor = '#f8fafc';
        e.currentTarget.style.outline = 'none';
      }}
      onBlur={(e) => {
        e.currentTarget.style.borderColor = 'rgba(15, 23, 42, 0.1)';
        e.currentTarget.style.border = '1px solid rgba(15, 23, 42, 0.1)';
        e.currentTarget.style.boxShadow = 'none';
        e.currentTarget.style.backgroundColor = '#f8fafc';
        e.currentTarget.style.outline = 'none';
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = '#0d9488';
        e.currentTarget.style.border = '1px solid #0d9488';
        e.currentTarget.style.backgroundColor = '#f1f5f9';
        e.currentTarget.style.outline = 'none';
      }}
      onMouseLeave={(e) => {
        if (document.activeElement !== e.currentTarget) {
          e.currentTarget.style.borderColor = 'rgba(15, 23, 42, 0.1)';
          e.currentTarget.style.border = '1px solid rgba(15, 23, 42, 0.1)';
          e.currentTarget.style.backgroundColor = '#f8fafc';
          e.currentTarget.style.outline = 'none';
        }
      }}
      {...props}
    >
      {children}
    </select>
  );
}

function SelectContent({ children, ...props }: React.ComponentProps<"div">) {
  return <>{children}</>;
}

function SelectItem({ children, value, ...props }: React.ComponentProps<"option">) {
  return (
    <option value={value} {...props}>
      {children}
    </option>
  );
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
};
