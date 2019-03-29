import React from 'react'
import './Ticket.css';

const Ticket = ({ shipAddress, totalItems, totalPaid, cart }) => {

    const address = shipAddress.length ? {
        street: shipAddress[0].street,
        number: shipAddress[0].number,
        location: shipAddress[0].location
    }
        : null;
    console.log('object', cart);
    const displayProducts = cart ? cart.map(item => (
        <p key={item.product._id}>{item.quantity} {' '}{item.product.name} ${item.product.discount && item.product.discount > 0
            ? Number(
                item.product.price - item.product.discount * item.product.price * 0.01
            ).toFixed(2)
            : item.product.price}</p>
    )) : null;
    return (
        <div className='body-ticket'>
            <article className="ticket">
                <div className="ticket__wrapper">
                    <div className="ticket__header">
                        {totalItems} <i className="fas fa-shopping-basket"></i>
                    </div>
                </div>
                <div className="ticket__divider">
                    <div className="ticket__notch"></div>
                    <div className="ticket__notch ticket__notch--right"></div>
                </div>
                <div className="ticket__body">
                    <section className="ticket__section">
                        <h3>Your Items</h3>
                        {displayProducts}
                    </section>
                    <section className="ticket__section">
                        <h3>Delivery Address</h3>
                        <p>{address && address.street} {' '} {address && address.number}</p>
                        <p>{address && address.location}</p>
                    </section>
                    <section className="ticket__section">
                        <h3>Payment Method</h3>
                        <p><i className="fab fa-cc-paypal" />Paypal</p>
                    </section>
                </div>
                <div className="ticket__footer">
                    <span>Total Paid</span>
                    <span>${totalPaid}</span>
                </div>
            </article>
        </div>
    )
}

export default Ticket
