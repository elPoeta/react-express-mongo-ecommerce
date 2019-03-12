const { User } = require('../../../models/User');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../../../config/keys');
describe('Generate auth token', () => {
    it('should be return a valid token', () => {
        const payload = { _id: new mongoose.Types.ObjectId().toHexString(), isAdmin: false, role: 'user' }
        const user = new User(payload);
        const token = jwt.sign(
            {
                _id: user._id,
                isAdmin: user.isAdmin,
                role: user.role,
                iat: new Date().getTime(),
                exp: new Date().setDate(new Date().getDate() + 1)
            },
            JWT_SECRET
        );
        const decode = jwt.verify(token, JWT_SECRET);

        expect(decode).toMatchObject(payload);
    })
})