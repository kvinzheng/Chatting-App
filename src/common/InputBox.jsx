import React from "react";
import "./InputBox.css";
import PropTypes from "prop-types";

const InputBox = ({
  className,
  onChange,
  name,
  value,
  placeholder,
  onKeyDown,
}) => {
  return (
    <input
      className={`InputBox ${className}`}
      onChange={onChange}
      onKeyDown={onKeyDown}
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
  onKeyDown: PropTypes.func,
};

InputBox.defaultProps = {
  className: "",
};

export default InputBox;
