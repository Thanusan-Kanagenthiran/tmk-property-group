"use client";
import React, { useEffect, useState } from "react";

const CheckoutPage = () => {
  const [hash, setHash] = useState<string>("");

  const fetchHash = async () => {
    const orderId = "12345";
    const amount = 1000;
    const currency = "LKR";

    try {
      const response = await fetch("/api/generate-hash", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ orderId, amount, currency })
      });

      const data = await response.json();
      setHash(data.hash);
    } catch (error) {
      console.error("Error fetching hash:", error);
    }
  };

  useEffect(() => {
    fetchHash();
  }, []);

  const merchantId = "1227798";
  const returnUrl = "http://localhost:3000/return";
  const cancelUrl = "http://localhost:3000/cancel";
  const notifyUrl = "http://localhost:3000/api/notify";

  return (
    <form method="post" action="https://sandbox.payhere.lk/pay/checkout">
      <input type="hidden" name="merchant_id" value={merchantId} />
      <input type="hidden" name="return_url" value={returnUrl} />
      <input type="hidden" name="cancel_url" value={cancelUrl} />
      <input type="hidden" name="notify_url" value={notifyUrl} />
      <br />
      <br />
      Item Details
      <br />
      <input type="text" name="order_id" defaultValue="ItemNo12345" />
      <input type="text" name="items" defaultValue="Door bell wireless" />
      <input type="text" name="currency" defaultValue="LKR" />
      <input type="text" name="amount" defaultValue="1000" />
      <br />
      <br />
      Customer Details
      <br />
      <input type="text" name="first_name" defaultValue="Saman" />
      <input type="text" name="last_name" defaultValue="Perera" />
      <input type="text" name="email" defaultValue="samanp@gmail.com" />
      <input type="text" name="phone" defaultValue="0771234567" />
      <input type="text" name="address" defaultValue="No.1, Galle Road" />
      <input type="text" name="city" defaultValue="Colombo" />
      <input type="hidden" name="country" value="Sri Lanka" />
      <input type="hidden" name="hash" value={hash} />
      <input type="submit" value="Buy Now" />
    </form>
  );
};

export default CheckoutPage;
