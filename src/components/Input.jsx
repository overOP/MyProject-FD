// src/components/Input.jsx
import React from "react";

const Input = React.forwardRef(({ className = "", ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={`p-2 border border-gray-300 rounded outline-none focus:ring-2 focus:ring-green-500 ${className}`}
      {...props}
    />
  );
});

export default Input;
