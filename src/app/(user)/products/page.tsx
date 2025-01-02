"use client";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ProductCardContainer from "@/app/components/shared/ProductCardContainer";
import ProductCard from "@/app/components/shared/ProductCard";
import { CategoriesInterface, ProductInterface } from "../../../../typings";
import { LoaderCircle } from "lucide-react";

export default function Product() {
  const [loading, setLoading] = useState<boolean>(false);
  const [product, setProduct] = useState<ProductInterface[]>([]);
  const [filteredProduct, setFilteredProduct] = useState<ProductInterface[]>([]);
  const [categories, setCategories] = useState<CategoriesInterface[]>([]);

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSort, setSelectedSort] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const [productRes, categoryRes] = await Promise.all([
          fetch("http://localhost:3001/api/v1/get-products"),
          fetch("http://localhost:3001/api/v1/get-categories"),
        ]);

        const productData = await productRes.json();
        const categoryData = await categoryRes.json();

        setProduct(productData.data);
        setFilteredProduct(productData.data);
        setCategories(categoryData.data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // Apply filters and sorting whenever selections change
  useEffect(() => {
    let updatedProducts = [...product];

    // Apply category filter
    if (selectedCategory !== "All" && selectedCategory) {
      updatedProducts = updatedProducts.filter(
        (p) => p.tbl_categories.category_name.toLowerCase() === selectedCategory.toLowerCase()
      );
    } else if(selectedCategory === "All"){
      updatedProducts = [...product];
    }

    // Apply sorting
    if (selectedSort === "Name") {
      updatedProducts.sort((a, b) => a.product_name.localeCompare(b.product_name));
    } else if (selectedSort === "Price") {
      updatedProducts.sort(
        (a, b) =>
          (a.tbl_variants[0]?.variant_price || 0) - (b.tbl_variants[0]?.variant_price || 0)
      );
    } else if (selectedSort === "Flash-Sale") {
      updatedProducts = updatedProducts.filter((product) =>
        product.tbl_variants.some(
          (variant) => variant.variant_discount && variant.variant_discount > 0
        )
      );

      updatedProducts.sort((a, b) => {
        const maxDiscountA = Math.max(
          ...a.tbl_variants.map((variant) => variant.variant_discount || 0)
        );
        const maxDiscountB = Math.max(
          ...b.tbl_variants.map((variant) => variant.variant_discount || 0)
        );
        return maxDiscountB - maxDiscountA;
      });
    }

    setFilteredProduct(updatedProducts);
  }, [selectedCategory, selectedSort, product]);

  return (
    <div className="w-11/12 xl:w-9/12 min-h-screen h-auto m-auto py-5">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-5">
        <h1 className="text-slate-700 font-semibold text-md lg:text-xl">
          Browse our products
        </h1>
        <div className="flex items-center gap-2">
          <Select onValueChange={(value) => setSelectedCategory(value)}>
            <SelectTrigger className="w-full lg:w-44">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent className="border-none shadow-md">
              <SelectGroup>
                <SelectLabel>Category</SelectLabel>
                <SelectItem
                  value={"All"}
                >All</SelectItem>
                {categories.map((category) => (
                  <SelectItem
                    value={category.category_name}
                    key={category.category_id}
                  >
                    {category.category_name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select onValueChange={(value) => setSelectedSort(value)}>
            <SelectTrigger className="w-full lg:w-44">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent className="border-none shadow-md">
              <SelectItem value="Name">Name</SelectItem>
              <SelectItem value="Price">Price</SelectItem>
              <SelectItem value="Flash-Sale">Flash Sale</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      {loading ? (
        <div className="flex items-center justify-center space-x-2 text-sm text-slate-400">
          <LoaderCircle className="animate-spin" size={14} />
          <p>Loading...</p>
        </div>
      ) : filteredProduct.length === 0 ? (
        <p className="text-center text-slate-500">
          No products found. Try a different filter.
        </p>
      ) : (
        <ProductCardContainer>
          {filteredProduct.map((product: ProductInterface) => (
            <ProductCard key={product.product_id} {...product} />
          ))}
        </ProductCardContainer>
      )}
    </div>
  );
}
