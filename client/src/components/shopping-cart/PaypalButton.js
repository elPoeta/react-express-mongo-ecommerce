import React, { Component } from "react";
import ReactDOM from "react-dom";
import scriptLoader from "react-async-script-loader";

class PaypalButton extends Component {

  constructor(props) {
    super(props);

    this.state = {
      showButton: false,
    };

    window.React = React;
    window.ReactDOM = ReactDOM;
  }

  componentDidMount() {
    const {
      isScriptLoaded,
      isScriptLoadSucceed
    } = this.props;

    if (isScriptLoaded && isScriptLoadSucceed) {
      this.setState({ showButton: true });
    }
  }

  componentWillReceiveProps(nextProps) {
    const {
      isScriptLoaded,
      isScriptLoadSucceed,
    } = nextProps;

    const isLoadedButWasntLoadedBefore =
      !this.state.showButton &&
      !this.props.isScriptLoaded &&
      isScriptLoaded;

    if (isLoadedButWasntLoadedBefore) {
      if (isScriptLoadSucceed) {
        this.setState({ showButton: true });
      }
    }
  }

  render() {
    const paypal = window.PAYPAL;
    const {
      env,
      commit,
      onSuccess,
      onError,
      onCancel,
    } = this.props;

    const {
      showButton,
    } = this.state;
    const payment = (data, actions) =>
      actions.request.post(`/api/payment/create-payment/${JSON.parse(localStorage.getItem('cartItems')).token}`,
      )
        .then(function (res) {
          // 3. Return res.id desde response
          console.log('response', res.id);
          return res.id;
        });

    const onAuthorize = (data, actions) =>
      actions.request.post(`/api/payment/execute-payment/${JSON.parse(localStorage.getItem('cartItems')).token}`, {
        paymentID: data.paymentID,
        payerID: data.payerID,
      })
        .then(function (res) {
          console.log(res);
          onSuccess(res.payment);
        });
    return (
      <div>
        {showButton && <paypal.Button.react
          env={env}
          commit={commit}
          payment={payment}
          onAuthorize={onAuthorize}
          onCancel={onCancel}
          onError={onError}
        />}
      </div>
    );
  }
}

export default scriptLoader('https://www.paypalobjects.com/api/checkout.js')(PaypalButton);