//const paypal = require('paypal-rest-sdk');
const request = require("request");
const JWT = require("jsonwebtoken");

//const asyncMiddleware = require('../middlewares/async');
const { PAYPAL, PAYPAL_API, JWT_SECRET_CART } = require("../config/keys");

module.exports = {
  createPayment: function (req, res) {
    // 2. Call /v1/payments/payment to set up the payment

    const token = req.params.token;
    const { items } = JWT.verify(token, JWT_SECRET_CART);
    const cart = items.cart.map(item => {
      return {
        name: item.product.name,
        price: item.product.discount && item.product.discount > 0
          ? Number(
            item.product.price -
            item.product.discount * item.product.price * 0.01
          ).toFixed(2).toString() : item.product.price.toString(),
        currency: "USD",
        quantity: item.quantity
      }
    })

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
              item_list: {
                items: cart
              },
              amount:
              {
                total: items.totalAmount.toString(),
                currency: 'USD'
              }
            }],
          redirect_urls:
          {
            return_url: 'http://localhost:3000/payment',
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
    const token = req.params.token;
    const { items } = JWT.verify(token, JWT_SECRET_CART);

    // Execute the payment:
    // 1. Set up a URL to handle requests from the PayPal button.
    // request.post('/execute-payment', function (req, res) {
    // 2. Get the payment ID and the payer ID from the request body.

    const paymentID = req.body.paymentID;
    const payerID = req.body.payerID;

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
                total: items.totalAmount.toString(),
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
