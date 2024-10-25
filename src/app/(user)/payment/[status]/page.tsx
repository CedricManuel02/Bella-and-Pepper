"use client";
import { Button } from "@/components/ui/button";
import { CircleCheck, CircleX } from "lucide-react";
import { useParams } from "next/navigation";
import React from "react";

export default function Payment() {
  const { status } = useParams();

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