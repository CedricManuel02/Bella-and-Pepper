import { redirect } from "next/navigation";
import React from "react";

interface ProductParams {
  query: string;
}

export default function Product({ params }: { params: ProductParams }) {
  if (!params.query) {
    redirect("/");
  }

  return <div>This is the search: {params.query}</div>;
}
