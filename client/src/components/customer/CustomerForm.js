import React from 'react';
import TextField from '../common/input/TextField';

const CustomerForm = ({ name, phone, onChange, onSubmit, errors }) => (
    <form className="category-form-container" onSubmit={onSubmit}>
        {errors.invalid && <div className="invalid">{errors.invalid}</div>}
        {errors.exist && <div className="invalid">{errors.exist}</div>}
        <fieldset>
            <legend>Full Name</legend>
            <TextField
                type='text'
                placeholder='*Your Full Name'
                name='name'
                value={name}
                onChange={onChange}
                error={errors.name}
            />
        </fieldset>
        <fieldset>
            <legend>Phone number</legend>
            <TextField
                type='text'
                placeholder='*Your Phone'
                name='phone'
                value={phone}
                onChange={onChange}
                error={errors.phone}
            />
        </fieldset>
        <button>Create</button>
    </form>

)

export default CustomerForm
