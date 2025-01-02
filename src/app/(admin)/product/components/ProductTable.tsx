"use client";
import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import { ProductInterface } from "../../../../../typings"
import { getProducts } from "../../../../../actions/productServerAction";
import { addProducts, clearProducts } from "@/redux/features/product-slice";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import ProductTableRow from "./ProductTableRow";
import { LoaderCircle } from "lucide-react";

export default function ProductTable() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);

  const getProduct = async () => {
    setLoading(true);
    try {
      const response = await getProducts();
      dispatch(clearProducts());
      response.data.forEach((item: ProductInterface) => {
        dispatch(addProducts({ tbl_products: item }));
      });
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };
 
  useEffect(() => {
    getProduct();
  }, []);

  return (
    <Table className="whitespace-nowrap">
     
      {/* Table Header */}
      <TableHeader>
        <TableRow>
          <TableHead></TableHead>
          <TableHead className="w-[150px]">Barcode</TableHead>
          <TableHead>Product Name</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Variants</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      {/* Table Body */}
      <TableBody>
        {loading ? (
          <TableRow>
            <TableCell colSpan={8}>
              <div className="flex items-center justify-center space-x-2 text-slate-500">
                <LoaderCircle size={14} className="animate-spin"/>
                <p>Loading...</p>
              </div>
            </TableCell>
          </TableRow>
        ) : (
          <ProductTableRow />
        )}
      </TableBody>
    </Table>
  )
}
