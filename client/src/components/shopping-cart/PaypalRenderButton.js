import React from "react";
import PaypalButton from "./PaypalButton";

const CLIENT = {
  sandbox:
    "AWPV4t1UQuWCi3fQUYxcRDqo9gH0twzx08CfPoEBKFXsERAD6fbtZMHWDXDNRWo5_xpNjGlZjBFpHe2S",
  production: "xxxXXX"
};
/*
const ENV = process.env.NODE_ENV === 'production'
  ? 'production'
  : 'sandbox';
*/
const ENV = "sandbox";
class PaypalButtonRender extends React.Component {
  render() {
    const onSuccess = payment => console.log("Successful payment!", payment);

    const onError = error =>
      console.log("Erroneous payment OR failed to load script!", error);

    const onCancel = data => console.log("Cancelled payment!", data);

    return (
      <div>
        <PaypalButton
          // client={CLIENT}
          env={ENV}
          commit={true}
          currency={"USD"}
          //total={1.00}
          onSuccess={onSuccess}
          onError={onError}
          onCancel={onCancel}
        />
      </div>
    );
  }
}

export default PaypalButtonRender;
