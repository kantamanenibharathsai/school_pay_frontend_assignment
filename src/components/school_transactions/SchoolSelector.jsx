import React from "react";

const textFieldStyle = {
  marginTop: "0.25rem",
  display: "block",
  width: "100%",
  borderRadius: "0.375rem",
  borderWidth: "1px",
  borderColor: "#d2d6dc",
  boxShadow: "0 0 0 0 transparent",
  paddingTop: "0.5rem",
  paddingBottom: "0.5rem",
  paddingLeft: "0.75rem",
  paddingRight: "0.75rem",
  fontSize: "0.875rem",
  outline: "none",
  focusBorderColor: "#6366f1",
  focusRing: "#6366f1",
  focusRingOffset: "2px",
};

const labelStyle = {
  display: "block",
  fontSize: "0.875rem", 
  fontWeight: 500,
  color: "#4a5568",
  marginBottom: "0.5rem",
};

const SchoolSelector = ({ schoolId, onSchoolIdChange }) =>  {
  return (
    <div>
      <label htmlFor="schoolId" style={labelStyle}>
        Enter School ID
      </label>
      <input
        type="text"
        id="schoolId"
        style={textFieldStyle}
        value={schoolId}
        onChange={onSchoolIdChange}
        size="small"
      />
    </div>
  );
}

export default SchoolSelector;
