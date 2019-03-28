import React from 'react';
import { Link } from 'react-router-dom';
import TextFieldInput from "../common/input/TextField";
import CheckBox from "../common/input/CheckBox";
import TextAreaField from "../common/input/TextAreaField";
import SelectListField from '../common/input/SelecListField';
import './ProductForm.css';

const ProductForm = ({ name, category, price, discount, stock, description, image, isAvailable, options, errors, onChange, onSubmit }) =>
    (
        <form className="form-container" onSubmit={onSubmit}>
            {errors.invalid && <div className="invalid">{errors.invalid}</div>}
            {errors.exist && <div className="invalid">{errors.exist}</div>}
            <div className="image-area">
                <figure class="tumb">
                    <img src={image} alt='image not found' />
                </figure>

            </div>
            <div className="input-area">
                <div className="name-area">
                    <TextFieldInput
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={name}
                        onChange={onChange}
                        error={errors.name}
                    />
                </div>
                <div className="select-area">
                    <SelectListField
                        placeholder="Category"
                        name="category"
                        value={category}
                        onChange={onChange}
                        options={options}
                        error={errors.categoryId}
                    />
                    <Link to='/admin/add-category'>New Category</Link>
                </div>
                <div className="number-area">
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
                    <div>
                        <CheckBox
                            type="checkbox"
                            name="isAvailable"
                            placeholder="is available"
                            value={isAvailable}
                            onChange={onChange}
                            checked={isAvailable}
                            error={errors.isAvailable}
                        /> Available
                </div>
                </div>
                <div className="description-area">
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
                        rows="5"
                        placeholder="Description"
                        value={description}
                        onChange={onChange}
                        error={errors.description}
                    />
                </div>
            </div>
            <button className="button-area">Add Product</button>
        </form>
    )


export default ProductForm
