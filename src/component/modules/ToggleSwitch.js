import React, { useState } from 'react';
import './ToggleSwitch.css';

function ToggleSwitch({checked, onToggleChange}) {
  const [isActive, setIsActive] = useState(false);

  const toggleSwitch = () => {
    setIsActive(!isActive);
    onToggleChange(!isActive);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      toggleSwitch();
    }
  };

  return (
    <div
      className={`toggle-container ${isActive ? 'active' : ''}`}
      role="checkbox"
      aria-checked={isActive}
      tabIndex="0"
      onClick={toggleSwitch}
      onKeyPress={handleKeyPress}
    >
      <div className="toggle-switch">
        <div className="toggle-handle">
          <span id="toggle-text"> {isActive ? 'AND' : 'OR'} </span>
        </div>
      </div>
    </div>
  );
}

export default ToggleSwitch;
