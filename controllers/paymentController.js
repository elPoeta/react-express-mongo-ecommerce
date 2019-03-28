const { Order } = require('../models/Order');
const { Product } = require('../models/Product');
const { Customer } = require('../models/Customer');
const request = require("request");
const JWT = require("jsonwebtoken");

const { PAYPAL, PAYPAL_API, JWT_SECRET_CART, JWT_SECRET } = require("../config/keys");

const verifyUserAuth = async bearerToken => {
  if (!bearerToken) {
    return null;
  }
  try {
    if (typeof bearerToken !== 'undefined') {
      const bearer = bearerToken.split(' ');
      const token = bearer[1];
      const decoded = await JWT.verify(token, JWT_SECRET);
      return decoded;

    }
    else {
      return null;
    }

  }
  catch (err) {
    return null;
  }
}
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
  executePayment: async function (req, res) {

    const user = await verifyUserAuth(req.header('authorization'));
    if (user === null) {
      return res.status(401).send('Access denied. No token provided.');
    }
    const token = req.params.token;
    const { items } = JWT.verify(token, JWT_SECRET_CART);

    // Execute the payment:
    // 1. Set up a URL to handle requests from the PayPal button.
    // request.post('/execute-payment', function (req, res) {
    // 2. Get the payment ID and the payer ID from the request body.

    const { paymentID, payerID, shipAddress } = req.body;

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
      async function (err, response) {
        if (err) {
          console.error(err);
          return res.status(500).send(err);
        }
        // 4. Return a success response to the client 
        const customer = await Customer.findOne({ user: user._id }).select('_id');
        if (!customer) {
          errors.notFound = 'Customer not found';
          return res.status(400).json(errors);
        }
        items.cart.map(async item => {
          const stock = item.product.stock - item.quantity;
          await Product.findByIdAndUpdate(item.product._id, { stock: stock }, { new: true });
        })

        const order = new Order({
          customer: customer._id,
          items,
          paymentId: paymentID,
          shipAddress
        });

        await order.save();

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

