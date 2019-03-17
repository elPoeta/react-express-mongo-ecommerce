//const paypal = require('paypal-rest-sdk');
const request = require('request');
//const asyncMiddleware = require('../middlewares/async');
const { PAYPAL, PAYPAL_API } = require('../config/keys');

module.exports = {
    createPayment: function (req, res) {
        // 2. Call /v1/payments/payment to set up the payment

        console.log('items :: ', req.params.token)
        console.log("post payment")
        request.post(PAYPAL_API + '/v1/payments/payment',
            {
                auth:
                {
                    user: PAYPAL.client_id,
                    pass: PAYPAL.client_secret
                },
                body:
                {
                    intent: 'sale',
                    payer:
                    {
                        payment_method: 'paypal'
                    },
                    transactions: [
                        {
                            amount:
                            {
                                total: '1.00',
                                currency: 'USD'
                            }
                        }],
                    redirect_urls:
                    {
                        return_url: 'http://localhost:3000',
                        cancel_url: 'http://localhost:3000'
                    }
                },
                json: true
            }, function (err, response) {
                if (err) {
                    console.error(err);
                    return res.status(500).send(err);
                }
                // 3. Return the payment ID to the client

                res.json(
                    {
                        id: response.body.id
                    });
            });
    },
    executePayment: function (req, res) {
        // Execute the payment:
        // 1. Set up a URL to handle requests from the PayPal button.

        // 2. Get the payment ID and the payer ID from the request body.

        var paymentID = req.body.paymentID;
        var payerID = req.body.payerID;
        // 3. Call /v1/payments/payment/PAY-XXX/execute to finalize the payment.
        request.post(PAYPAL_API + '/v1/payments/payment/' + paymentID +
            '/execute',
            {
                auth:
                {
                    user: PAYPAL.client_id,
                    pass: PAYPAL.client_secret
                },
                body:
                {
                    payer_id: payerID,
                    transactions: [
                        {
                            amount:
                            {
                                total: '1.00',
                                currency: 'USD'
                            }
                        }]
                },
                json: true
            },
            function (err, response) {
                if (err) {
                    console.error(err);
                    return res.status(500).send(err);
                }
                // 4. Return a success response to the client

                const payment = {
                    paid: true,
                    cancelled: false,
                    payerID: response.body.payer.payer_info.payer_id,
                    paymentID: response.body.id,
                };
                res.json(
                    {
                        status: 'success',
                        payment
                    });
            });
    }
}
