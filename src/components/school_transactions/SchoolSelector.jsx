import React from "react";
import { schoolSelectorStyles } from "./SchoolSelectorStyles";

const SchoolSelector = ({ schoolId, onSchoolIdChange }) => {
  return (
    <div>
      <label htmlFor="schoolId" style={schoolSelectorStyles.labelStyle}>
        Enter School ID
      </label>
      <input
        type="text"
        id="schoolId"
        style={schoolSelectorStyles.textFieldStyle}
        value={schoolId}
        onChange={onSchoolIdChange}
        size="small"
      />
    </div>
  );
};

export default SchoolSelector;
