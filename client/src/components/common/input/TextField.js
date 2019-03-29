import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
import "./Errors.css";

const TextField = ({
  name,
  placeholder,
  value,
  error,
  info,
  type,
  onChange,
  disabled,
  checked
}) => {
  return (
    <div>
      <input
        type={type}
        className={classnames("input", error && "invalid-input")}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        checked={checked}
      />

      {error && <div className="invalid">{error}</div>}
    </div>
  );
};

export default TextField;
