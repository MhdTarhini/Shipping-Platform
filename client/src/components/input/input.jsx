import React, { useState } from "react";
import "./index.css";

function Input({ onchange, label, name, type }) {
  return (
    <div className="flex column input-component ">
      <input
        type={type}
        name={name}
        id={name}
        placeholder={label}
        onChange={(e) => {
          onchange(e);
        }}
      />
    </div>
  );
}

export default Input;
