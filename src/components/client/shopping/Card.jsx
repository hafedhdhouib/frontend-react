import React, { useState } from "react";
import { useShoppingCart } from "use-shopping-cart";
import { Link } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";

import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
const stripePromise = loadStripe(
  "pk_test_51QZzZJE33zxYiv05oeukjvk9eucUrih9ukPzqJa3DYZ5xt6drOa2ws8UYIgPczTkZkP17Cq6uAMxkWFjmAFsCD7800UtGKtlQX  "
);
const Cart = () => {
  const {
    cartDetails,
    removeItem,
    clearCart,
    totalPrice,
    cartCount,
    incrementItem,
    decrementItem,
  } = useShoppingCart();
  const stripe = useStripe();
  const elements = useElements();
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();
    setPaymentProcessing(true);
    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      console.error("CardElement not found");
      return;
    }

    const { error, token } = await stripe.createToken(cardElement);
    if (error) {
      console.log("[error]", error);
    } else {
      console.log("[TOKEN]", token);
    }
    await axios
      .post("http://127.0.0.1:8000/api/payment/processpayment", {
        amount: totalPrice * 100,
        token: token.id,
      })
      .then((res) => {
        alert(res.data.message);
        setPaymentProcessing(false);
      })
      .catch((err) => {
        console.error(err.response.data.message);
      });
  };
  return (
    <div className="cart-container">
      {paymentProcessing ? (
        <form onSubmit={handleSubmit}>
          <CardElement />
          <button type="submit" disabled={!stripe}>
            Pay
          </button>
        </form>
      ) : null}
      <h2>Shopping Cart</h2>
      {cartCount === 0 ? (
        <div className="cart-empty">
          <p>Panier Vide</p>
          <div className="start-shopping">
            <Link to="/articlescard">
              <span>Start Shopping</span>
            </Link>
          </div>
        </div>
      ) : (
        <div>
          <div className="titles">
            <h3 className="product-title">Product</h3>
            <h3 className="price">Price</h3>
            <h3 className="quantity">Quantity</h3>
            <h3 className="total">Total</h3>
          </div>
          <div className="cart-items">
            {cartDetails &&
              Object.values(cartDetails).map((cartItem) => {
                return (
                  <div className="cart-item" key={cartItem.id}>
                    <div className="cart-product">
                      <img src={`${cartItem.image}`} alt={cartItem.title} />
                      <div>
                        <h3>{cartItem.title}</h3>
                        <button onClick={() => removeItem(cartItem.id)}>
                          <i
                            className="fa-solid fa-trash-can"
                            style={{ fontSize: "14px", color: "red" }}
                          ></i>
                        </button>
                      </div>
                    </div>
                    <div className="cart-product-price">
                      {" "}
                      {cartItem.price}
                      TND
                    </div>

                    <div className="cart-product-quantity">
                      <button
                        className="button-actions"
                        onClick={() => decrementItem(cartItem.id)}
                      >
                        -
                      </button>
                      <div className="count">{cartItem.quantity}</div>
                      <button
                        className="button-actions"
                        onClick={() => incrementItem(cartItem.id)}
                      >
                        +
                      </button>
                    </div>
                    <div className="cart-product-total-price">
                      {cartItem.quantity * cartItem.price} TND
                    </div>
                  </div>
                );
              })}
          </div>
          <div className="cart-summary">
            <button className="clear-btn" onClick={() => clearCart()}>
              Clear Cart
            </button>
            <div className="cart-checkout">
              <div className="subtotal">
                <span>Subtotal</span>
                <span className="amount">{totalPrice} TND</span>
              </div>
              <p>Taxes and shipping calculated at checkout</p>
              <button
                onClick={() => setPaymentProcessing(true)}
                disabled={paymentProcessing}
              >
                {paymentProcessing ? "Loading..." : "Check Out"}
              </button>
              <div className="continue-shopping">
                <Link to="/articlescard">
                  <span>Continue Shopping</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
const Wrapper = (props) => (
  <Elements stripe={stripePromise}>
    <Cart {...props} />
  </Elements>
);
export default Wrapper;
