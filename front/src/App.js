/* eslint-disable react/jsx-filename-extension */
// import logo from './logo.svg';
import "./App.css";
import React from "react";
import { Route } from "react-router-dom";
import Home from "./components/home";
import Dashboard from "./components/Dashboard";
import Login from "./components/login";
import ResProfile from "./components/restProfile";
import CustomerSignup from "./components/customerSignup";
import RestaurantSignup from "./components/restaurantSignup";
import CustomerProfile from "./components/customerProfile";
import RestaurantMenu from "./components/restaurantMenu";
import CustomersLanding from "./components/CustomersLanding";
import ResLanding from "./components/ResLanding";
import CustomerCheckout from "./components/customerCheckout";
import CustomerOrders from "./components/CustomerOrders";
import RestaurantOrders from "./components/RestaurantOrders";
import FavouritesTab from "./components/FavouritesTab";
import CustomerProfileDetails from "./components/CustomerProfileDetails";

import TermsAndConditionsCus from "./components/terms-and-conditions-cus";
import TermsAndConditionsRes from "./components/terms-and-conditions-res";
import PrivacyNotice from "./components/privacy-notice";
const path = require("path");
/*App.use(express.static(path.join(__dirname, '/frontend/build))')))
App.listen(5000, () => {
  console.log("Server is running on port 5000");
})*/
function App() {
  return (
    <>
      <Route exact path="/" component={Home} />
      <Route exact path="/dashboad" component={Dashboard} />
      <Route path="/login" component={Login} />
      <Route path="/res_profile" component={ResProfile} />
      <Route path="/customer_profile" component={CustomerProfile} />
      <Route path="/customer_signup" component={CustomerSignup} />
      <Route path="/res_signup" component={RestaurantSignup} />
      <Route path="/restaurant/menu" component={RestaurantMenu} />
      <Route path="/customer" component={CustomersLanding} />
      <Route path="/restaurant/landing" component={ResLanding} />
      <Route path="/customer_checkout" component={CustomerCheckout} />
      <Route path="/customer_orders" component={CustomerOrders} />
      <Route path="/restaurant_orders" component={RestaurantOrders} />
      <Route path="/customer_favourites" component={FavouritesTab} />
      <Route path="/customer_detail" component={CustomerProfileDetails} />
      <Route
        path="/terms-and-conditions-cus"
        component={TermsAndConditionsCus}
      />
      <Route
        path="/terms-and-conditions-res"
        component={TermsAndConditionsRes}
      />
      <Route path="/PrivacyNotice" component={PrivacyNotice} />
    </>
  );
}

export default App;
