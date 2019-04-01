import React from 'react';
import { Link } from 'react-router-dom';
import TextFieldInput from "../common/input/TextField";
import CheckBox from "../common/input/CheckBox";
import TextAreaField from "../common/input/TextAreaField";
import SelectListField from '../common/input/SelecListField';
import './ProductForm.css';

const ProductForm = ({ name, category, price, discount, stock, description, image, isAvailable, options, isAdd, errors, onChange, onSubmit, btnFormText }) =>
    (
        <form className="form-container" onSubmit={onSubmit}>
            {errors.invalid && <div className="invalid">{errors.invalid}</div>}
            {errors.exist && <div className="invalid">{errors.exist}</div>}

            <div className="image-area">
                <figure className="tumb">
                    <img src={image} alt='not found' />
                </figure>

            </div>
            <div className="input-area">
                {isAdd && (
                    <div className="isAddress">
                        Product Add <i className="fas fa-check-circle" />
                    </div>
                )}
                <fieldset>
                    <legend>Product Name</legend>
                    <div className="name-area">

                        <TextFieldInput
                            type="text"
                            name="name"
                            placeholder="*Name"
                            value={name}
                            onChange={onChange}
                            error={errors.name}
                        />
                    </div>
                </fieldset>


                <fieldset>
                    <legend>Category Product</legend>
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
                </fieldset>


                <fieldset>
                    <legend>Price - Stock - Discount</legend>
                    <div className="number-area">
                        <TextFieldInput
                            type="text"
                            name="price"
                            placeholder="*Price U$"
                            value={price}
                            onChange={onChange}
                            error={errors.price}
                        />
                        <TextFieldInput
                            type="text"
                            name="stock"
                            placeholder="*Stock"
                            value={stock}
                            onChange={onChange}
                            error={errors.stock}
                        />
                        <TextFieldInput
                            type="text"
                            name="discount"
                            placeholder="Discount %"
                            value={discount}
                            onChange={onChange}
                            error={errors.discount}
                        />
                    </div>
                </fieldset>

                <div className="description-area">
                    <fieldset>
                        <legend>Image url</legend>
                        <TextFieldInput
                            type="text"
                            name="image"
                            placeholder="*URL Image"
                            value={image}
                            onChange={onChange}
                            error={errors.image}
                        />
                    </fieldset>
                    <fieldset>
                        <legend>Description</legend>
                        <TextAreaField
                            name="description"
                            rows="5"
                            placeholder="*Description"
                            value={description}
                            onChange={onChange}
                            error={errors.description}
                        />
                    </fieldset>
                </div>
            </div>
            <div className="button-area">
                <label htmlFor="isAvailable" className="checkbox-container ">Available
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
                <button >{btnFormText}</button>
            </div>
        </form>
    )


export default ProductForm
