import React from "react";
import PaypalButton from "./PaypalButton";
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { clearCart } from '../../actions/cartAction';
const ENV = "sandbox";
class PaypalButtonRender extends React.Component {
  state = {
    cancel: false,
    success: false,
  }
  render() {
    const onSuccess = payment => {
      console.log("Successful payment!", payment);
      this.props.clearCart();
      this.setState({
        success: true
      })

    }

    const onError = error =>
      console.log("#Erroneous payment OR failed to load script!", error);

    const onCancel = data => {
      console.log("Cancelled payment!", data)
      this.setState({
        cancel: true
      })

    };
    if (this.state.cancel) {
      return <Redirect to='/cart' />
    }
    if (this.state.success) {
      return <Redirect to='/' />
    }
    return (
      <div>
        <PaypalButton
          env={ENV}
          commit={true}
          currency={"USD"}
          onSuccess={onSuccess}
          onError={onError}
          onCancel={onCancel}
        />
      </div>
    );
  }
}

export default connect(null, { clearCart })(PaypalButtonRender);
