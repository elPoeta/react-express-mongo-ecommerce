class Cart {
  constructor(oldCart) {
    this.cart = oldCart || [];
    this.totalAmount = oldCart.totalAmount || 0;
    this.totalQuantity = oldCart.totalQuantity || 0;
  }

  addItemCart(product) {
    if (this.cart.length > 0) {
      const id = product._id;
      const cartIndex = this.cart.findIndex(item => {
        return item.product._id == id;
      });
      if (cartIndex === -1) {
        this.addItem(product);
      } else {
        this.updateItemCart(id, "+");
      }
    } else {
      this.addItem(product);
    }
  }
  addItem(product) {
    this.cart = [...this.cart, { product, quantity: 1 }];
    this.totalQuantity = totals(this.cart).qty;
    this.totalAmount = totals(this.cart).amount;
  }
  updateItemCart(id, operator) {
    const cart = this.cart.map(item =>
      item.product._id == id
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

  removeItem(id, operator) {
    const item = this.cart.filter(item => item.product._id == id);
    const quantity = item[0].quantity;
    if (quantity == 1 && operator === "-") {
      this.updateItemCart(id, operator);
      this.removeItemCart(id);
    } else {
      this.updateItemCart(id, operator);
    }
  }
  removeItemCart(id) {
    this.cart = [...this.cart.filter(item => item.product._id != id)];
    this.totalAmount = totals(this.cart).amount;
    this.totalQuantity = totals(this.cart).qty;
  }

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
