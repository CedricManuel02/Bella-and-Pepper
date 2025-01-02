"use server";
import { revalidateTag } from "next/cache";

// PRODUCT SERVER ACTION
export async function getProducts() {
    try {
        const response = await fetch(`http://localhost:3001/api/v1/get-products`, {
            next: { tags: ["get-products"] },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch products: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error Fetching Products Get", error);
        throw error;
    }
}
export async function deleteProducts(product_id: string) {
    try {
        const response = await fetch(`http://localhost:3001/api/v1/delete-products/${product_id}`, {
            method: "DELETE",
        });

        if (!response.ok) {
            throw new Error(`Failed to delete product: ${response.statusText}`);
        }

        const data = await response.json();
        revalidateTag("get-products");
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
export async function retrieveProducts(product_id: string) {
    try {
        const response = await fetch(`http://localhost:3001/api/v1/retrieve-products/${product_id}`, {
            method: "PUT", 
        });

        if (!response.ok) {
            throw new Error(`Failed to retrieve product: ${response.statusText}`);
        }

        const data = await response.json();
        revalidateTag("get-products");
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
export async function getProductsInformation(product_id: string) {
    try {
        const response = await fetch(`http://localhost:3001/api/v1/item/${product_id}`, {
            method: "GET",
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch product information: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
