import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

const TextAreaField = ({
  name,
  placeholder,
  value,
  error,
  info,
  onChange,
  rows
}) => {
  return (
    <div className="">
      <textarea
        className={classnames("input", error && "invalid-input")}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        rows={rows}
      />
      {info && <small className="">{info}</small>}
      {error && <div className="invalid">{error}</div>}
    </div>
  );
};

export default TextAreaField;
