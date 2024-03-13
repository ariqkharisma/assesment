import React from "react";

const Select = ({ options, label, ...otherProps }) => {
  return (
    <div>
      {label && (
        <label className="block text-sm font-medium mb-1">{label}</label>
      )}
      <select
        className="form-select block w-full px-2 py-3 border-2 rounded-lg border-blue-100 rounded-lg cursor-pointer"
        {...otherProps}
      >
        {options.map((option) => (
          <option className="p-5" key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
