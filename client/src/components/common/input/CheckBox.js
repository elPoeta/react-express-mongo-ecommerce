import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
import "./Errors.css";

const CheckBox = ({
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
                className={classnames("", error && "invalid-input")}
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={onChange}
                disabled={disabled}
                checked={checked}
            />
            {info && <small className="">{info}</small>}
            {error && <div className="invalid">{error}</div>}
        </div>
    );
};


export default CheckBox;
