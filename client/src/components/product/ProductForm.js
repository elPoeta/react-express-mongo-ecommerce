import React from 'react';
import { Link } from 'react-router-dom';
import TextFieldInput from "../common/input/TextField";
import CheckBox from "../common/input/CheckBox";
import TextAreaField from "../common/input/TextAreaField";
import SelectListField from '../common/input/SelecListField'
const ProductForm = ({ name, category, price, discount, stock, description, image, isAvailable, options, errors, onChange, onSubmit }) =>
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
            <SelectListField
                placeholder="Category"
                name="category"
                value={category}
                onChange={onChange}
                options={options}
                error={errors.categoryId}
            />
            <Link to='/admin/add-category'>New Category</Link>
            <TextFieldInput
                type="text"
                name="price"
                placeholder="Price $"
                value={price}
                onChange={onChange}
                error={errors.price}
            />
            <TextFieldInput
                type="text"
                name="stock"
                placeholder="Stock"
                value={stock}
                onChange={onChange}
                error={errors.stock}
            />
            <TextFieldInput
                type="text"
                name="discount"
                placeholder="Discount"
                value={discount}
                onChange={onChange}
                error={errors.discount}
            />
            <TextFieldInput
                type="text"
                name="image"
                placeholder="Image"
                value={image}
                onChange={onChange}
                error={errors.image}
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

            <button>Add Product</button>
        </form>
    )


export default ProductForm
