const { Customer } = require('../models/Customer');
const asyncMiddleware = require('../middlewares/async');

module.exports = {
    createOrUpdateCustomer: asyncMiddleware(async (req, res) => {
        let errors = {};
        const user = req.user._id;
        const { name, phone } = req.body;
        let customerFields = {};

        customerFields.user = user;
        if (name) customerFields.name = name;
        if (phone) customerFields.phone = phone;

        const customer = await Customer.findOne({ user });

        if (customer) {
            const updateCustomer = await Customer.findOneAndUpdate(
                { user },
                { $set: customerFields },
                { new: true }
            );
            return res.json(updateCustomer);
        }

        const newCustomer = await new Customer(customerFields).save();

        res.json(newCustomer);

    }),
    addCustomerAddress: asyncMiddleware(async (req, res) => {
        const errors = {};
        const { street, location, number } = req.body;
        const newAddress = {
            street,
            location,
            number
        };

        const customer = await Customer.findOne({ user: req.user._id });
        if (!customer) {
            errors.notFound = 'User not found';
            res.status(400).json(errors);
        }
        customer.address = [...customer.address, newAddress];
        const updateCustomer = await customer.save();
        res.json(updateCustomer);

    }),
    deleteCustomerAddress: asyncMiddleware(async (req, res) => {
        const errors = {};
        const user = req.user._id;
        const addressId = req.value.params
        const customer = await Customer.findOne({ user });
        if (!customer) {
            errors.notFound = "Customer not found";
            return res.status(404).json(errors);
        }

        customer.address = [...customer.address.filter(a => a._id.toString() !== addressId)];
        await customer.save();
        res.status(200).json(customer);
    }),
    getCustomers: asyncMiddleware(async (req, res) => {
        //TODO GET CUSTOMERS
    }),
    getCustomer: asyncMiddleware(async (req, res) => {
        const errors = {};
        const customer = await Customer.findOne({ user: req.user._id });
        if (!customer) {
            errors.notFound = 'User not found';
            res.status(400).json(errors);
        }
        res.status(200).json(customer);
    }),
    deleteCustomer: asyncMiddleware(async (req, res) => {
        const errors = {};
        const _id = req.value.params;
        const customer = await Customer.findByIdAndRemove(_id);
        if (!customer) {
            errors.notFound = 'Customer not found'
            return res.status(400).json(errors)
        }

        res.status(200).json({ success: true });
    })
}