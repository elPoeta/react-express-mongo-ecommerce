class Cart {
  constructor(oldCart) {
    this.shoppingCart = {
      cart: oldCart.cart || [],
      totalAmount: oldCart.totalAmount || 0,
      totalQuantity: oldCart.totalQuantity || 0
    };
  }

  addItemCart(product) {
    this.shoppingCart.cart = [
      ...this.shoppingCart.cart,
      { ...product, quantity: 1 }
    ];
    this.shoppingCart.totalQuantity = totals(this.shoppingCart.cart).qty;
    this.shoppingCart.totalAmount = totals(this.shoppingCart.cart).amount;
  }
  updateItemCart(product, operator) {
    const cart = this.shoppingCart.cart.map(item =>
      item._id === product._id
        ? (item = {
            ...item,
            quantity: operator === "+" ? item.quantity + 1 : item.quantity - 1
          })
        : item
    );
    this.shoppingCart.cart = cart;
    this.shoppingCart.totalQuantity = totals(this.shoppingCart.cart).qty;
    this.shoppingCart.totalAmount = totals(this.shoppingCart.cart).amount;
  }
}

const totals = cart => {
  const totalAmount = cart
    .map(cart => {
      return cart.price * cart.quantity;
    })
    .reduce((a, b) => {
      return a + b;
    }, 0);

  const totalQuantity = cart
    .map(qty => {
      return qty.quantity;
    })
    .reduce((a, b) => {
      return a + b;
    }, 0);

  return { amount: totalAmount.toFixed(2), qty: totalQuantity };
};

exports.Cart = Cart;
