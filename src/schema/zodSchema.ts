import { z } from "zod";


// Login Form Schema
export const formLoginSchema = z.object({
    user_email: z.string().email().min(1, { message: "Email is required" }),
    user_password: z.string().min(1, { message: "Password is required" }),
});

// registration Form Schema
export const formRegisterSchema = z.object({
    user_name: z.string().min(1, { message: "Name is required" }),
    user_email: z.string().email().min(1, { message: "Email is required" }),
    user_password: z.string().min(1, { message: "Password is required" }),
    confirm_password: z.string().min(1, { message: "Confirm Password is required" }),
}).refine((data) => data.user_password === data.confirm_password, {
    message: "Password don't match",
    path: ["confirm_password"]
});
