import React from 'react';
import TextField from '../common/input/TextField';

const CustomerForm = ({ name, phone, onChange, onSubmit, errors }) => (
    <form onSubmit={onSubmit}>
        <TextField
            type='text'
            placeholder='Your Name'
            name='name'
            value={name}
            onChange={onChange}
            error={errors.name}
        />
        <TextField
            type='text'
            placeholder='Your Phone'
            name='phone'
            value={phone}
            onChange={onChange}
            error={errors.phone}
        />
        <button>Create</button>
    </form>

)

export default CustomerForm
