"use client";
import { Button } from "@/components/ui/button";
import { CircleCheck, CircleX } from "lucide-react";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";

export default function Payment() {
  const { status } = useParams();
  useEffect(() => {
    async function updateCheckout() {
      const options = {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          authorization: 'Basic c2tfdGVzdF9Mbm9rM2FzWlF1RFdOMVRzRll5MVQ1ZVM6'
        },
        body: JSON.stringify({
          data: {
            attributes: {url: 'http://localhost:3001/api/v1/webhooks-test', events: ['payment.paid']}
          }
        })
      };
      
      fetch('https://api.paymongo.com/v1/webhooks', options)
        .then(res => res.json())
        .then(res => console.log(res))
        .catch(err => console.error(err));
    }
    updateCheckout();
  }, []);
  return (
    <div className="w-full min-h-screen h-auto flex flex-col gap-4 items-center justify-center px-4">
      {status === "success" ? (
        <CircleCheck className="text-green-500" size={40} />
      ) : (
        <CircleX className="text-red-500" size={40} />
      )}
      <h3 className="text-slate-700 font-semibold text-lg sm:text-2xl">
        {status === "success" ? "Payment Successful!" : "Payment Failed!"}
      </h3>
      <p className="text-slate-500 text-center text-xs sm:text-sm">
        {status === "success"
          ? "We will be sending you an email confirmation to bellaandpepper@gmail.com."
          : "Your transaction has failed due to some technical error. Please try again."}
      </p>
      <Button className="w-full lg:w-96" >
        Continue Shopping
      </Button>
    </div>
  );
}
