"use client";
import Header from "@/app/components/shared/Header";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";
import { ProductInterface } from "../../../../../typings";
import ProductCard from "@/app/components/shared/ProductCard";
import ProductCardContainer from "@/app/components/shared/ProductCardContainer";

interface CategoryInterface {
  query: string;
}

export default function Category({ params: paramsPromise }: { params: Promise<CategoryInterface> }) {
  const [category, setCategory] = useState<string>("");
  const [data, setData] = useState([]);
  useEffect(() => {
    async function fetchParams() {
      const resolvedParams = await paramsPromise;
      if (resolvedParams.query) {
        const decodeUri = resolvedParams.query ? decodeURIComponent(resolvedParams.query) : "";
        setCategory(decodeUri);
        fetchData(resolvedParams.query);
      } else {
        redirect("/");
      }
    }
    fetchParams();

    const fetchData = async (search: string) => {
      const response = await fetch(`http://localhost:3001/api/v1/get-products-category/${search}`, { method: "GET" })
      const data = await response.json();
      setData(data.data);
    }
    // get data 
  }, [paramsPromise]);

  return (
    <div className="w-11/12 xl:w-9/12 min-h-screen h-auto m-auto py-5">
      <Header text={`Results for Category ${category}`} url={null} />
      {data.length > 0 ? (
        <ProductCardContainer>
          {data.map((product: ProductInterface) => (
            <ProductCard key={product.product_id} {...product} />
          ))}
        </ProductCardContainer>
      ) : (
        <div className="h-full flex items-center justify-center text-slate-400 w-full">
          <p>
            No result found
          </p>
        </div>
      )}
    </div>
  );
}
