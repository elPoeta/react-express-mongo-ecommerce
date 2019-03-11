const { Category } = require('../models/Category');

module.exports = {
    createOrUpdateCategory: async (req, res) => {
        res.status(200).json({ msj: 'create or update', body: req.body });
    },
    deleteCategory: async (req, res) => {
        res.status(200).json({ msj: 'delete', id: req.params.id });
    },
}