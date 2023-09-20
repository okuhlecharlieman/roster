import React, { useState } from "react";

function PinEntry({ onPinEntered }) {
  const [pin, setPin] = useState("");

  const handleChange = (e) => {
    setPin(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onPinEntered(pin);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Enter PIN:
          <input
            type="password"
            value={pin}
            onChange={handleChange}
            maxLength="4" // Set the maximum length of the PIN
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default PinEntry;
