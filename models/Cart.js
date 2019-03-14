class Cart {
  constructor(oldCart) {
    console.log('constructor ## ', oldCart)
    this.cart = oldCart || [];
    this.totalAmount = oldCart.totalAmount || 0;
    this.totalQuantity = oldCart.totalQuantity || 0;
  }

  addItemCart(product) {

    const foundProduct = this.cart.filter(item => {
      console.log(item.product._id, ' === ', product._id)
      if (item.product._id === product._id) {
        console.log(item.product._id, ' === ', product._id)
        this.cart.quantity++;
        return item;
      }
    });
    console.log('isfoun ', foundProduct)
    if (foundProduct.length === 0) {
      this.cart = [...this.cart, { product, quantity: 1 }];
    }


    this.totalQuantity = totals(this.cart).qty;
    this.totalAmount = totals(this.cart).amount;
  }

  updateItemCart(product, operator) {
    const cart = this.cart.map(item =>
      item._id === product._id
        ? (item = {
          ...item,
          quantity: operator === "+" ? item.quantity + 1 : item.quantity - 1
        })
        : item
    );
    this.cart = cart;
    this.totalQuantity = totals(this.cart).qty;
    this.totalAmount = totals(this.cart).amount;
  }

  removeItemCart(id) {
    this.cart = [...this.cart.filter(item => item._id !== id)]
    this.totalAmount = totals(this.cart).amount;
    this.totalQuantity = totals(this.cart).qty;
  };

  clearCart() {
    this.cart = [];
    this.totalQuantity = 0;
    this.totalAmount = 0;
  }

}

const totals = cart => {
  const totalAmount = cart
    .map(item => {
      return item.product.price * item.quantity;
    })
    .reduce((a, b) => {
      return a + b;
    }, 0);

  const totalQuantity = cart
    .map(item => {
      return item.quantity;
    })
    .reduce((a, b) => {
      return a + b;
    }, 0);

  return { amount: Number(totalAmount.toFixed(2)), qty: totalQuantity };
};

exports.Cart = Cart;
