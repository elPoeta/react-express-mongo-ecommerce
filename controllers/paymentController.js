const paypal = require('paypal-rest-sdk');
const asyncMiddleware = require('../middlewares/async');
const { PAYPAL } = require('../config/keys');
paypal.configure({
    'mode': PAYPAL.mode,
    'client_id': PAYPAL.client_id,
    'client_secret': PAYPAL.client_secret
});

module.exports = {
    createPayment: asyncMiddleware(async (req, res) => {
        const create_payment_json = {
            "intent": "sale",
            "payer": {
                "payment_method": "paypal"
            },
            "redirect_urls": {
                "return_url": "http://localhost:3000/payment/success",
                "cancel_url": "http://localhost:3000/payment/cancel"
            },
            "transactions": [{
                "item_list": {
                    "items": [{
                        "name": "item",
                        "sku": "item",
                        "price": "1.00",
                        "currency": "USD",
                        "quantity": 1
                    }]
                },
                "amount": {
                    "currency": "USD",
                    "total": "1.00"
                },
                "description": "This is the payment description."
            }]
        };
        paypal.payment.create(create_payment_json, function (error, payment) {
            if (error) {
                throw error;
            } else {
                for (let i = 0; i < payment.links.length; i++) {
                    if (payment.links[i].rel === 'approval_url') {
                        res.redirect(payment.links[i].href);
                    }
                }
            }
        });
    }),
    paymentSucces: asyncMiddleware(async (req, res) => {
        const payerId = req.query.PayerID;
        const paymentId = req.query.paymentId;

        const execute_payment_json = {
            "payer_id": payerId,
            "transactions": [{
                "amount": {
                    "currency": "USD",
                    "total": "1.00"
                }
            }]
        };

        paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
            if (error) {
                console.log(error.response);
                throw error;
            } else {
                //TODO create a order
                console.log(JSON.stringify(payment));
                res.send('Success');
            }
        });
    }),
    paymentCancel: asyncMiddleware(async (req, res) => {
        res.send('Cancelled');
    })
}