import React from "react";
import TextField from "../common/input/TextField";

const AddressForm = ({
  street,
  number,
  location,
  errors,
  isAdd,
  onChange,
  onSubmit
}) => (
  <form className="category-form-container" onSubmit={onSubmit}>
    {isAdd && (
      <div className="isAddress">
        Address Add <i className="fas fa-check-circle" />
      </div>
    )}
    {errors.user && <div className="invalid">{errors.user}</div>}
    <fieldset>
      <legend>Street</legend>
      <TextField
        type="text"
        placeholder="*Street"
        name="street"
        value={street}
        onChange={onChange}
        error={errors.street}
      />
    </fieldset>
    <fieldset>
      <legend>Street Number</legend>
      <TextField
        type="text"
        placeholder="*Number"
        name="number"
        value={number}
        onChange={onChange}
        error={errors.number}
      />
    </fieldset>
    <fieldset>
      <legend>Location</legend>
      <TextField
        type="text"
        placeholder="*Location"
        name="location"
        value={location}
        onChange={onChange}
        error={errors.location}
      />
    </fieldset>
    <button>Add Address</button>
  </form>
);

export default AddressForm;
