import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";

import { useLoaderData, useNavigation } from "react-router-dom";
import Spinner from "../../../components/spinner/Spinner";
import CheckoutForm from "./CheckoutForm/CheckoutForm";

// eita ekhane deyar karon holo payment er vitor dile bar bar rerender korbe .. taile problem
const stripePromise = loadStripe(process.env.REACT_APP_PK_TEST);

const Payment = () => {
  const booking = useLoaderData();
  const navigation = useNavigation();
  const { treatment, slot, price, appointmentDate } = booking;

  if (navigation.state === "loading") {
    return <Spinner></Spinner>;
  }
  return (
    <div className=" py-10 flex flex-col gap-5">
      <h3 className="text-3xl font-bold">Payment for {treatment}</h3>
      <h4 className="text-xl font-semibold">
        Please pay <span className="font-bold text-amber-500">${price}</span>{" "}
        for your appointment on {appointmentDate} at {slot}
      </h4>

      <div className="my-10 lg:w-1/2">
        {/* eita ekhane dilam karon apatoto ei website er jnno amra payment gateway ta shudhu
        ei component a use kortesi tai .. jodi onekgula component a shared vabe use kortam taile 
        obviously app.js or index.js er moddhe use korle valo hoito 
        */}
        <Elements stripe={stripePromise}>
          <CheckoutForm booking={booking}></CheckoutForm>
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
