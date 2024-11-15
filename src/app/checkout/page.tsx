"use client";
import CheckOutMain from "@/components/checkout/CheckOutMain";
import Wrapper from "@/layout/DefaultWrapper";
import PrivetRoute from "@/privetRoute/PrivetRoute";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(`${process.env.STRIPE_PROMISE_KEY}`);

const Checkout = () => {
  return (
    <>
     <PrivetRoute>
     <Wrapper>
        <main>
          <Elements stripe={stripePromise}>
            <CheckOutMain />
          </Elements>
        </main>
      </Wrapper>
     </PrivetRoute>
    </>
  );
};

export default Checkout;
