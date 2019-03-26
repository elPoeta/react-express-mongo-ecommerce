import React from 'react';
import TextFieldInput from "../common/input/TextField";
import CheckBox from "../common/input/CheckBox";
import TextAreaField from "../common/input/TextAreaField";
const CategoryForm = ({ errors, name, description, isAvailable, onChange, onSubmit }) =>
    (
        <form className="" onSubmit={onSubmit}>
            {errors.invalid && <div className="invalid">{errors.invalid}</div>}
            {errors.exist && <div className="invalid">{errors.exist}</div>}
            <TextFieldInput
                type="text"
                name="name"
                placeholder="Name"
                value={name}
                onChange={onChange}
                error={errors.name}
            />
            <TextAreaField
                name="description"
                placeholder="Description"
                value={description}
                onChange={onChange}
                error={errors.description}
            />
            <CheckBox
                type="checkbox"
                name="isAvailable"
                placeholder="is available"
                value={isAvailable}
                onChange={onChange}
                checked={isAvailable}
                error={errors.isAvailable}
            />

            <button>Add Category</button>
        </form>
    )


export default CategoryForm
