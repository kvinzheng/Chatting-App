import React from "react";
import "./InputBox.css";
import PropTypes from "prop-types";

const InputBox = ({ className, onChange, name, value, placeholder }) => {
  return (
    <input
      className={`InputBox ${className}`}
      onChange={onChange}
      name={name}
      placeholder={placeholder}
      value={value}
    />
  );
};

InputBox.propTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func,
  name: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
};

InputBox.defaultProps = {
  className: "",
};

export default InputBox;
