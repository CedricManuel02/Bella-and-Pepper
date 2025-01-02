"use server"
import React from "react";
import ProductCard from "./shared/ProductCard";
import Header from "@/app/components/shared/Header";
import { ProductInterface } from "../../../typings";
import { getProducts } from "../../../actions/productServerAction";
import ProductCardContainer from "@/app/components/shared/ProductCardContainer";

export default async function ProductContainer({text, url} : any) {
  const response = await getProducts();
  const products = response.data.filter((data : ProductInterface) => data.tbl_categories.category_name === text);
  return (
    <div className="pb-10">
      <Header text={text} url={url} />
      <ProductCardContainer>
      {products.length > 0 ? (
          products.slice(0, 10).map((product: ProductInterface) => (
            <ProductCard key={product.product_id} {...product} />
          ))
      ) : (
        response.data.slice(0, 10).map((product: ProductInterface) => (
          <ProductCard key={product.product_id} {...product} />
        ))
      )}
      </ProductCardContainer>
    </div>
  );
}
