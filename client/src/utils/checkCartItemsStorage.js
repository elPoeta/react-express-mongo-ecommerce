import jwtDecode from 'jwt-decode';

export const checkCartItemsStorage = () => {
    if (localStorage.cartItems) {
        if (jwtDecode(localStorage.getItem("cartItems")).exp < Date.now()) {
            localStorage.removeItem("cartItems");
            return {};
        } else {
            const { items } = jwtDecode(JSON.parse(localStorage.getItem("cartItems")).token);
            return items;
        }
    }
    return {};
}
