"use client";
import React from "react"
import { LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ButtonInterface {
  type: "submit" | "button";
  variant: "outline" | "default" | "destructive";
  text: string;
  textLoading: string;
  loading: boolean;
  disabled: boolean;
}

export default function ButtonComponent({ type, variant, text, textLoading, loading, disabled }: ButtonInterface) {
  return (
    <Button
      type={type}
      variant={variant}
      disabled={disabled}
      className="w-full bg-green-500 hover:bg-green-600">
      {loading ?
        <div className="flex items-center justify-center gap-2">
          <LoaderCircle size={14} className="animate-spin" />
          {textLoading}
        </div>
        :
        <p>{text}</p>
      }
    </Button>
  )
}
