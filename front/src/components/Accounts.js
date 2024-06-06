import React, { useEffect } from "react";
import { GET_ALL_CUSTOMERS } from "../graphql/queries";
import { useQuery } from "@apollo/client";
import axios from "axios";

function Accounts() {
  //   const { loading, error, data } = useQuery(GET_ALL_CUSTOMERS);

  const getAllCustomersv1 = async () => {
    try {
      const res = await axios.get("http://localhost:3002/accounts");
      console.log("res ", res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCustomersv1();
  }, []);

  //   if (loading) return <p>Loading...</p>;
  //   if (error) return <p>Error: {error.message}</p>;
  return (
    <ul>
      {/* {data.getAllCustomers.map(customer => (
        <li key={customer._id}>
          {customer.first_name} {customer.last_name} - {customer.email}
        </li>
      ))} */}
    </ul>
  );
}

export default Accounts;
