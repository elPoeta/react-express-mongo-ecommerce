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
  disabled
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
        disabled={disabled}
      />
      {info && <small className="">{info}</small>}
      {error && <div className="invalid">{error}</div>}
    </div>
  );
};

TextField.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.string
};

TextField.defaultProps = {
  type: "text"
};

export default TextField;
