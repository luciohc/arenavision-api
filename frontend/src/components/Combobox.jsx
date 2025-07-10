// src/components/Combobox.jsx
import React from 'react';

function Combobox({ options, selectedOption, onSelect, placeholder }) {
  return (
    <div className="relative w-full">
      <select
        value={selectedOption?.value || ''}
        onChange={(e) => {
          const selected = options.find(opt => opt.value === e.target.value);
          onSelect(selected);
        }}
        className="w-full p-2 rounded bg-white text-black"
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Combobox;
