import React from "react";
import { useHistory } from "react-router-dom";

const OrderConfirm = () => {
  const history = useHistory();
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        height: "100vh",
        width: "100vw",
        padding: "0 150px",
      }}
    >
      <p
        style={{
          textAlign: "center",
        }}
      >
        Your order has been sent to the merchant for preparation. Please confirm
        your order upon arrival.
      </p>
      <p
        style={{
          textAlign: "center",
        }}
      >
        The merchant has the right to request ID for age verification. If you
        are above 36 years of age and do not meet our financial assistance
        criteria, the merchant may cancel your order.
      </p>
      <button
        onClick={() => {
          history.push("/");
        }}
      >
        Go To Home Page
      </button>
    </div>
  );
};

export default OrderConfirm;
