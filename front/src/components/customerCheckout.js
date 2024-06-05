/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
/* eslint-disable react/jsx-filename-extension */
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  useMutation,
  useLazyQuery,
  gql,
} from "@apollo/client";
import axios from "axios";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import {
  Typography,
  Box,
  Grid,
  Hidden,
  Card,
  CardActions,
  CardActionArea,
  CardContent,
  List,
  ListItem,
} from "@material-ui/core";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { orange, teal } from "@material-ui/core/colors";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Navigationbar from "./navigationbar";
import { clearCart, updateCustomerProfile } from "../app/reducers/mainSlice";
import { capsStrFirstChar } from "../utility";
import ResDishCard from "./ResDishCard";
import CartDialog from "./CartDialog";
import { PLACE_ORDER } from "../graphql/mutation";
import { loadStripe } from "@stripe/stripe-js";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Elements } from '@stripe/react-stripe-js';
import PaymentForm from './PaymentForm';

const stripePromise = loadStripe("pk_test_51PD8wPGEpr3f403gfUpeHIf1hqpuU85b9lTXiPbFtRiWgE1DrlIWJXXmX47HTfKOvAqo2vgTwFTH2LUv6n6WY7KS00qeft1Nhu");

const useStyles = makeStyles({
  //   gridContainer: {
  //     display: 'flex',
  //     paddingLeft: '40px',
  //     paddingRight: '40px',
  //     overflow: 'auto',
  //     justifyContent: 'start',
  //     flexWrap: 'wrap',
  //   },
  //   container: {
  //     marginTop: '160px',
  //   },
});

export default function CustomerCheckout() {
  const mainReducer = useSelector((state) => state.mainReducer);
  const { customerProfile, token, cart = [] } = mainReducer;
  const [deliveryAddressList, setDeliveryAddressList] = useState(
    customerProfile.delivery_addresses || []
  );
  const [selectedAddress, setSelectedAddress] = useState();
  const [newAddess, setNewAddess] = useState();
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {}, [dispatch]);
  useEffect(() => {
    getDeliveryAddressesApi();
  }, []);
  const history = useHistory();
  const classes = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getDeliveryAddressesApi = async () => {
    try {
      setDeliveryAddressList(customerProfile.delivery_addresses);
    } catch (err) {
      console.log(err);
    }
  };

  const addDeliveryAddressesApi = async (delivery_address) => {
    const url = `/customers/delivery_address`;
    const body = {
      customer_id,
      delivery_address,
    };
    const headers = {
      Authorization: token,
    };
    try {
      const res = await axios.post(url, body, { headers });
      console.log("response", res);
      dispatch(updateCustomerProfile(res.data?.data));
      setDeliveryAddressList(res.data?.data?.delivery_addresses);
      setNewAddess("");
    } catch (err) {
      console.log(err);
    }
  };

  let subTotalAmount = 0;
  for (let resIndex = 0; resIndex < cart.length; resIndex++) {
    for (let dishIndex = 0; dishIndex < cart[resIndex].dishes?.length; dishIndex++) {
      subTotalAmount +=
        cart[resIndex].dishes[dishIndex].dish_price * cart[resIndex].dishes[dishIndex].quantity;
    }
  }

  const deliveryFee = 0.0;
  const taxes = 0.0;
  const totalAmount = deliveryFee * cart.length + taxes + subTotalAmount;
  const isPickupOnlyRes = cart.length > 0 && cart[0]?.delivery_option === 3;

  const resAddress = cart.length > 0 && cart[0].address;
  const pickupAddress = Object.values(resAddress).join(", ");
  const { street_address, zipcode, city, state, country } = customerProfile;
  const customer_id = customerProfile?._id;

  const [placeOrder] = useMutation(PLACE_ORDER, {
    onCompleted(res) {
      console.log("da", res);
      handleClose();
      alert("Your order is placed successfully");
      dispatch(clearCart());
      history.push("/");
    },
    onError(e) {
      console.log("--dfd", e);
    },
  });

  const handlePlaceOrder = async () => {
    if (!isPickupOnlyRes &&!selectedAddress) {
      alert("Select a delivery address");
      return;
    }

    const orderData = {
      cart: cart,
      customer_id,
      first_name: customerProfile?.first_name,
      last_name: customerProfile?.first_name,
      delivery_type: isPickupOnlyRes? 2 : 1,
      delivery_address:
        selectedAddress ||
        `${street_address}, ${zipcode}, ${city}, ${state}, ${country}`,
      order_date_time: new Date().toISOString(),
      amount: parseFloat(totalAmount.toFixed(2)),
      delivery_fee: deliveryFee,
      taxes: 0,
      instruction: cart[0]?.instruction,
      tip: 0,
    };

    try {
      // Make an HTTP POST request to your backend endpoint to create a PaymentIntent
      const response = await axios.post("http://localhost:3002/payment/create-payment-intent", orderData, {
        headers: {
          Authorization: token,
        },
      });

      // Assuming the response from your backend includes the client secret for the PaymentIntent
      const clientSecret = response.data.clientSecret;
      console.log(response.data.clientSecret);

      // Use Stripe.js and Elements to handle payment confirmation
      const stripe = await stripePromise;
      const elements = useElements();
      const cardElement = elements.getElement(CardElement);

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: "Customer Name", // Replace with actual customer name
            // Add more billing details as needed (address, email, phone, etc.)
          },
        },
      });
      console.log(result.error);
      if (result.error) {
        // Payment failed
        console.error(result.error.message);
        alert("Payment failed. Please try again.");
      } else {
        // Payment successful
        console.log("Payment succeeded!");
        handleClose(); // Close the dialog
        dispatch(clearCart());
        history.push("/");
      }
    } catch (error) {
      console.error("Error processing payment:", error);
      alert("Error processing payment. Please try again.");
    }
  };

  return (
    <>
      <h1 style={{ textAlign: "center", marginTop: 20 }}>Checkout Page</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "stretch",
          marginTop: "50px",
        }}
      >
        <div style={{ backgroundColor: "white", flex: 1 }}>
          <List sx={{ pt: 0 }}>
            <div style={{ paddingLeft: 10, paddingBottom: 20 }}>
              <Typography
                style={{ alignSelf: "center", textAlign: "center" }}
              >
                Ordered Items
              </Typography>

              {cart?.length > 0 &&
                cart.map((cartItem, index) => {
                  return (
                    cartItem?.dishes?.length > 0 &&
                    cartItem?.dishes.map((dish, dishIndex) => (
                      <ListItem key={index}>
                        <div
                          style={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "space-between",
                            paddingTop: 0,
                            paddingBottom: 0,
                            paddingLeft: 100,
                            paddingRight: 100,
                          }}
                        >
                          <Typography
                            variant="body1"
                            color="black"
                            style={{ alignSelf: "center", textAlign: "center" }}
                          >
                            {`${dish?.quantity}  ${dish?.dish_name}`}
                          </Typography>
                          <Typography
                            variant="body1"
                            color="black"
                            style={{ alignSelf: "center", textAlign: "center" }}
                          >
                            {`$ ${dish.dish_price}`}
                          </Typography>
                        </div>
                      </ListItem>
                    ))
                  );
                })}

              <ListItem>
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    paddingTop: 0,
                    paddingBottom: 0,
                    paddingLeft: 100,
                    paddingRight: 100,
                  }}
                >
                  <Typography
                    variant="body1"
                    color="black"
                    style={{ alignSelf: "center", textAlign: "center" }}
                  >
                    Total Amount:
                  </Typography>
                  <Typography
                    variant="body1"
                    color="black"
                    style={{ alignSelf: "center", textAlign: "center" }}
                  >
                    {`$ ${subTotalAmount.toFixed(2)}`}
                  </Typography>
                </div>
              </ListItem>
            </div>
          </List>
          {isPickupOnlyRes? (
            <Typography
              variant="body1"
              color="black"
              style={{ alignSelf: "center", textAlign: "center" }}
            >
              Pickup Address: {pickupAddress}
            </Typography>
          ) : (
            <form style={{ marginRight: 30, marginLeft: 30 }}>
              {deliveryAddressList?.length > 0 && (
                <TextField
                  id="selectedAddress"
                  select
                  fullWidth
                  label="selected delivery Address"
                  style={{ color: "black", marginBottom: 10 }}
                  value={selectedAddress}
                  onChange={(e) => setSelectedAddress(e.target.value)}
                >
                  {deliveryAddressList.map((option) => (
                    <MenuItem key={option.delivery_address} value={option.delivery_address}>
                      {option.delivery_address}
                    </MenuItem>
                  ))}
                </TextField>
              )}
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                name="newAddess"
                label="add new address"
                type="text"
                id="newAddess"
                value={newAddess}
                onChange={(e) => setNewAddess(e.target.value)}
              />
              <Button
                disabled={!newAddess}
                variant="outlined"
                style={{ backgroundColor: "black", color: "white" }}
                onClick={() => addDeliveryAddressesApi(newAddess)}
              >
                Add
              </Button>
            </form>
          )}
          {/* <Button>Add a delivery Addres</Button> */}
        </div>
        <div
          style={{
            backgroundColor: "#F2F3F5",
            flex: 0.7,
            paddingLeft: 50,
            paddingRight: 50,
          }}
        >
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              paddingTop: 10,
              paddingBottom: 0,
            }}
          >
            <Typography
              variant="body1"
              color="black"
              style={{ alignSelf: "center", textAlign: "center" }}
            >
              Subtotal Amount:
            </Typography>
            <Typography
              variant="body1"
              color="black"
              style={{ alignSelf: "center", textAlign: "center" }}
            >
              {`$ ${subTotalAmount.toFixed(2)}`}
            </Typography>
          </div>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              paddingTop: 10,
              paddingBottom: 0,
            }}
          >
            <Typography
              variant="body1"
              color="black"
              style={{ alignSelf: "center", textAlign: "center" }}
            >
              Delivery Fee:
            </Typography>
            <Typography
              variant="body1"
              color="black"
              style={{ alignSelf: "center", textAlign: "center" }}
            >
              {`$ ${deliveryFee}`}
            </Typography>
          </div>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              paddingTop: 10,
              paddingBottom: 0,
            }}
          >
            <Typography
              variant="body1"
              color="black"
              style={{ alignSelf: "center", textAlign: "center" }}
            >
              Taxes:
            </Typography>
            <Typography
              variant="body1"
              color="black"
              style={{ alignSelf: "center", textAlign: "center" }}
            >
              {`$ ${taxes}`}
            </Typography>
          </div>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              paddingTop: 10,
              paddingBottom: 0,
            }}
          >
            <Typography
              variant="h6"
              color="black"
              style={{ alignSelf: "center", textAlign: "center" }}
            >
              Total:
            </Typography>
            <Typography
              variant="h6"
              color="black"
              style={{ alignSelf: "center", textAlign: "center" }}
            >
              {`$ ${totalAmount.toFixed(2)}`}
            </Typography>
          </div>
          <div
            style={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <Button
              size="medium"
              variant="outlined"
              color="primary"
              onClick={() => handleClickOpen()}
              style={{
                alignSelf: "center",
                backgroundColor: "green",
                color: "white",
                marginTop: 30,
                paddingLeft: 100,
                paddingRight: 100,
              }}
            >
              Place Order
            </Button>
          </div>
        </div>
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle style={{ textAlign: 'center', borderBottom: '1px solid #ccc' }}>
        Payment Details
      </DialogTitle>
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <Elements stripe={stripePromise}>
        <PaymentForm handlePlaceOrder={handlePlaceOrder} />
        </Elements>
        
      </div>
    </Dialog>
      </div>
    </>
  );
}