import React from "react";
import TextFieldInput from "../common/input/TextField";
import CheckBox from "../common/input/CheckBox";
import TextAreaField from "../common/input/TextAreaField";
import "./CategoryForm.css";
const CategoryForm = ({
  errors,
  name,
  description,
  isAvailable,
  onChange,
  onSubmit,
  btnValue
}) => (
  <form className="category-form-container" onSubmit={onSubmit}>
    {errors.invalid && <div className="invalid">{errors.invalid}</div>}
    {errors.exist && <div className="invalid">{errors.exist}</div>}

    <fieldset>
      <legend>Category Name</legend>

      <TextFieldInput
        type="text"
        name="name"
        placeholder="*Name"
        value={name}
        onChange={onChange}
        error={errors.name}
      />
    </fieldset>
    <fieldset>
      <legend>Description</legend>
      <TextAreaField
        name="description"
        placeholder="Description"
        value={description}
        onChange={onChange}
        error={errors.description}
        rows="6"
      />
    </fieldset>
    <label htmlFor="isAvailable" className="checkbox-container ">
      Available
      <CheckBox
        type="checkbox"
        name="isAvailable"
        placeholder="is available"
        value={isAvailable}
        onChange={onChange}
        checked={isAvailable}
        error={errors.isAvailable}
      />
    </label>
    <button>{btnValue}</button>
  </form>
);

export default CategoryForm;
