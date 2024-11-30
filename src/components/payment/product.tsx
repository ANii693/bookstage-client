"use client";

import React, { useEffect, useState } from "react";

declare global {
  interface Window {
    Razorpay: any;
  }
}

const Product: React.FC = (prop) => {
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);

  const amount = 100;
  const currency = "INR";
  const receiptId = "qwsaq1";

  useEffect(() => {
    // Dynamically load the Razorpay SDK
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => setRazorpayLoaded(true);
    script.onerror = () => console.error("Failed to load Razorpay SDK");
    document.body.appendChild(script);

    return () => {
      // Cleanup script
      document.body.removeChild(script);
    };
  }, []);

  const paymentHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!razorpayLoaded) {
      console.error("Razorpay SDK is not loaded");
      return;
    }

    try {
      const response = await fetch(`${process.env.BASE_URL}payment/order`, {
        method: "POST",
        body: JSON.stringify({
          amount,
          currency,
          receipt: receiptId,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to create order");
      }

      const order = await response.json();
      console.log(order);

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Fetching the key from the environment variable
        amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency,
        name: "Metaheuristic Corporate India Ltd", // Your business name
        description: "Test Transaction",
        image: "https://example.com/your_logo",
        order_id: order.id, // Pass the `id` obtained in the response of Step 1
        handler: async function (response: any) {
          const body = {
            ...response,
          };

          const validateRes = await fetch(
            `${process.env.BASE_URL}payment/order/validate`,
            {
              method: "POST",
              body: JSON.stringify(body),
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          const jsonRes = await validateRes.json();
          console.log(jsonRes);
        },
        prefill: {
          // Auto-fill customer's contact information
          name: "Sunil Dev", // Your customer's name
          email: "sunil@example.com",
          contact: "1234567890", // Customer's phone number
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.on("payment.failed", function (response: any) {
        alert(response.error.code);
        alert(response.error.description);
        alert(response.error.source);
        alert(response.error.step);
        alert(response.error.reason);
        alert(response.error.metadata.order_id);
        alert(response.error.metadata.payment_id);
      });

      rzp1.open();
    } catch (error) {
      console.error("Payment initialization failed", error);
    }
  };

  return (
    <div className="product">
      <h2>Speaking Skills</h2>
      <p>Gain Confidence</p>
      <br />
      <button onClick={paymentHandler} disabled={!razorpayLoaded}>
        Pay
      </button>
    </div>
  );
};

export default Product;
