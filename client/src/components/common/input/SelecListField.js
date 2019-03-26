import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const SelectListField = ({ name, value, error, info, onChange, options }) => {
    const selectOptions = options.map(option => (
        <option key={option.label} value={option.value}>
            {option.label}
        </option>
    ));
    return (
        <div className="">
            <select
                className={classnames("input", error && "invalid-input")}
                name={name}
                value={value}
                onChange={onChange}
            >
                {selectOptions}
            </select>
            {info && <small className="">{info}</small>}
            {error && <div className="invalid">{error}</div>}
        </div>
    );
};

SelectListField.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    info: PropTypes.string,
    error: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    options: PropTypes.array.isRequired
};

export default SelectListField;