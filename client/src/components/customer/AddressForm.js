import React from 'react';
import TextField from '../common/input/TextField';

const AddressForm = ({ street, number, location, errors, isAdd, onChange, onSubmit }) => (
    <form onSubmit={onSubmit}>
        {isAdd && <div className="">Address Add <i className="fas fa-check-circle"></i></div>}
        {errors.user && <div className="invalid">{errors.user}</div>}
        <TextField
            type='text'
            placeholder='Street'
            name='street'
            value={street}
            onChange={onChange}
            error={errors.street}
        />
        <TextField
            type='text'
            placeholder='Number'
            name='number'
            value={number}
            onChange={onChange}
            error={errors.number}
        />
        <TextField
            type='text'
            placeholder='Location'
            name='location'
            value={location}
            onChange={onChange}
            error={errors.location}
        />
        <button>Add Address</button>
    </form>
)


export default AddressForm
