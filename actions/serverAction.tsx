"use server";

import { revalidateTag } from "next/cache";

const API_END_POINT = "http://localhost:3001/api/v1";

// get cart 

export async function getCartProducts(user_id: any) {
    const response = await fetch(`${API_END_POINT}/get-cart/${user_id}`);
    const data = await response.json();
    return data.data;
}

export async function deleteCartProducts(cart_id: any){
    const response = await fetch(`${API_END_POINT}/delete-cart/${cart_id}`, {method: "DELETE"});
    const data = await response.json();
    return data;
}

export async function deleteCategory(id: string) {
    const response = await fetch(`${API_END_POINT}/delete-categories/${id}`, { method: "DELETE" });
    revalidateTag("get-categories");
}

export async function getCategoryList() {
    const response = await fetch(`${API_END_POINT}/get-categories`, {
        next: {
            tags: ["get-categories"]
        }
    });
    const data = await response.json();

    return data;
}

export async function createCategory(data: FormData) {
    const response = await fetch("http://localhost:3001/api/v1/create-categories", {
        method: "POST",
        body: data,
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to create category");
    }

    const result = await response.json();

    revalidateTag("get-categories");
    return result;
}
export async function updateCategory(data: FormData) {
    const response = await fetch("http://localhost:3001/api/v1/update-categories", {
        method: "PUT",
        body: data,
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to create category");
    }

    const result = await response.json();

    revalidateTag("get-categories");
    return result;
}

export async function getItem(id: string) {
    const response = await fetch(`http://localhost:3001/api/v1/item/${id}`, { cache: "no-cache" });
    const data = await response.json();
    return data;
}


export async function registerAccount({values} : any) {
    const response = await fetch("http://localhost:3001/api/v1/register", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(values),
    })
    return response;
}



