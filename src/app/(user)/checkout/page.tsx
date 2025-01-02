"use client"
import React, { useEffect, useState } from "react"
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { useSelector } from "react-redux";
import { CheckoutArrayInterface } from "../../../../typings";
import { formatCurrency } from "@/utils/helper";
import { toast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
const formsCheckoutSchema = z.object({
    firstname: z.string().min(1, { message: "First name is required" }),
    lastname: z.string().min(1, { message: "Last name is required" }),
    email: z.string().email().min(1, { message: "Email is required" }),
    phone: z.string().min(1, { message: "Phone is required" }),
    address: z.string().min(1, { message: "Address is required" }),
    province: z.string().min(1, { message: "Province is required" }),
    cities: z.string().min(1, { message: "City is required" }),
    barangay: z.string().min(1, { message: "barangay is required" }),
});


interface Location {
    latitude: number;
    longitude: number;
    address: string | null;
  }

export default function Checkout() {
    const router = useRouter();
    const {data: session, status} = useSession();
    const [provinces, setProvinces] = useState([]);
    const [cities, setCities] = useState([]);
    const [barangay, setBarangay] = useState([]);
    const [error, setError] = useState<boolean>(true);
    const [shippingLoading, setShippingLoading] = useState<boolean>(false);
    const [provinceCode, setProvincesCode] = useState<string>("");
    const [shippingResult, setShippingResult] = useState<any>("");
    const checkoutItems = useSelector((state: { checkout: CheckoutArrayInterface }) => state.checkout.item);
    const totalPrice = useSelector((state: { checkout: CheckoutArrayInterface }) => state.checkout.totalPrice);
    const [location, setLocation] = useState<Location | null>(null);
    const form = useForm<z.infer<typeof formsCheckoutSchema>>({
        resolver: zodResolver(formsCheckoutSchema),
        defaultValues: {
            firstname: "",
            lastname: "",
            email: "",
            phone: "",
            province: "",
            cities: "",
            address: "",
            barangay: "",
        },
    })
    // function for submitting
    async function onSubmit(values: z.infer<typeof formsCheckoutSchema>) {
        if (session && status === "authenticated") {
          try {
            if (error) {
              // Handle case where delivery is not available
              form.setError("province", {
                type: "manual",
                message: "Your location is not available for delivery",
              });
              toast({
                variant: "destructive",
                title: "Oops!",
                description: "Your location is not available for delivery",
              });
            } else {
              // Send the checkout request to the server
              const response = await fetch("http://localhost:3001/api/v1/checkout", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  information: values,
                  orders: checkoutItems,
                  location: location,
                }),
              });
      
              if (response.ok) {
                // Handle success response
                const data = await response.json();
                console.log("Checkout submitted successfully:", data);
                if (data.checkout_url) {
                  window.location.href = data.checkout_url;
                } else {
                  toast({
                    variant: "destructive",
                    title: "Error",
                    description: "Failed to retrieve checkout URL.",
                  });
                }
              } else {
                // Handle server-side errors
                const errorData = await response.json();
                console.error("Checkout error:", errorData);
                toast({
                  variant: "destructive",
                  title: "Error",
                  description: errorData.message || "An error occurred during checkout.",
                });
              }
            }
          } catch (err) {
            // Handle unexpected errors
            console.error("Unexpected error:", err);
            toast({
              variant: "destructive",
              title: "Error",
              description: "Something went wrong. Please try again later.",
            });
          }
        } else {
          // Handle session expiration
          toast({
            variant: "destructive",
            title: "Oops!",
            description: "Your session expired.",
          });
          router.push("/");
        }
      }
      
    useEffect(() => {
        async function getProvinces() {
            const response = await fetch("https://psgc.cloud/api/provinces");
            const data = await response.json();
            setProvinces(data);
        }
        const getLocation = () => {
            if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;
                    const address = await fetchAddress(latitude, longitude);
                    setLocation({
                      latitude,
                      longitude,
                      address,
                    });
                },
                (err) => {
                  setError(true);
                  toast({
                    variant: "destructive",
                    title: "Opps!",
                    description: "Your location is not available for delivery"
                })
                }
              );
            } else {
              setError(true);
              toast({
                variant: "destructive",
                title: "Opps!",
                description: "Your location is not available for delivery"
            })
            }
          };
      
        getLocation();
        getProvinces();
    }, [])

    useEffect(() => {
        async function getShippingFee() {
            try {
                setShippingLoading(true);
                const response = await fetch(`http://localhost:3001/api/v1/get-shipping-fee/${provinceCode}`, {
                    method: "GET"
                });

                const data = await response.json();

                if (!response.ok) {
                    form.setError("province", {
                        type: "manual",
                        message: data.message,
                    });
                    setError(true);
                    setShippingResult(data.message || "Error fetching shipping fee");
                } else {
                    setError(false);
                    form.clearErrors("province");
                    setShippingResult(data.data);
                }
            } catch (err) {
                setShippingResult("An unexpected error occurred");
            }
            finally{
                setTimeout(() => {
                    setShippingLoading(false)
                }, 1000)
            }
        }
        if (provinceCode) {
            getShippingFee();
        }
    }, [provinceCode]);


    // Fetch Cities when Province Changes
    async function handleProvinceChange(province: string) {
        const prov : any = provinces.find((item : any) => item.name === province);
        setProvincesCode(prov.code);
        form.setValue("province", province);
        form.setValue("cities", "");
        form.setValue("barangay", "");
        const response = await fetch(`https://psgc.cloud/api/provinces/${prov.code}/cities`);
        const data = await response.json();
        setCities(data);
    }
    async function handleCitiesChange(cityCode: string) {
        form.setValue("cities", cityCode);
        form.setValue("barangay", "");
        const response = await fetch(`https://psgc.cloud/api/cities/${cityCode}/barangays`);
        const data = await response.json();
        setBarangay(data);
    }

    // fetch the address
    const fetchAddress = async (latitude: number, longitude: number): Promise<string | null> => {
        try {
          const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyCF3N9PyvoOYunofJ3roecOsNY3V9XOpuI`
          );
          const data = await response.json();
          if (data.results.length > 0) {
            return data.results[0].formatted_address;
          }
          return null;
        } catch (error) {
          console.error("Error fetching address:", error);
          return null;
        }
      };
    return (
        <div className="h-auto">
            {checkoutItems.length > 0 ? (
                <div className="w-11/12 xl:w-9/12 h-auto m-auto py-5 flex gap-10 justify-center flex-col-reverse md:flex-row">
                    {/* Information */}
                    <div className="w-full md:w-10/12 md:py-10">
                        <h3 className="font-semibold text-sm text-slate-700 py-4">Information</h3>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                                <div className="flex items-center justify-between gap-2 ">
                                    <FormField
                                        control={form.control}
                                        name="firstname"
                                        render={({ field }) => (
                                            <FormItem className="w-full">
                                                <FormLabel className="font-medium text-slate-500">First name</FormLabel>
                                                <FormControl>
                                                    <Input  {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="lastname"
                                        render={({ field }) => (
                                            <FormItem className="w-full">
                                                <FormLabel className="font-medium text-slate-500">Last name</FormLabel>
                                                <FormControl>
                                                    <Input {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="font-medium text-slate-500">Email</FormLabel>
                                            <FormControl>
                                                <Input type="email" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="phone"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="font-medium text-slate-500">Phone</FormLabel>
                                            <FormControl>
                                                <Input type="tel" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="province"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="font-medium text-slate-500">Province</FormLabel>
                                            <FormControl>
                                                <Select onValueChange={handleProvinceChange} value={field.value}>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select your province" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            <SelectLabel>Province</SelectLabel>
                                                            {provinces.map((provinces: any) => (
                                                                <SelectItem key={provinces.id} value={provinces.name}>{provinces.name}</SelectItem>
                                                            ))}
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className="flex items-center justify-between gap-2 ">
                                    <FormField
                                        control={form.control}
                                        name="cities"
                                        render={({ field }) => (
                                            <FormItem className="w-full">
                                                <FormLabel className="font-medium text-slate-500">City</FormLabel>
                                                <FormControl>
                                                    <Select onValueChange={handleCitiesChange} value={field.value} disabled={error}>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select your city" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectGroup>
                                                                <SelectLabel>City</SelectLabel>
                                                                {cities.map((cities: any) => (
                                                                    <SelectItem key={cities.id} value={cities.name}>{cities.name}</SelectItem>
                                                                ))}
                                                            </SelectGroup>
                                                        </SelectContent>
                                                    </Select>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="barangay"
                                        render={({ field }) => (
                                            <FormItem className="w-full">
                                                <FormLabel className="font-medium text-slate-500">Barangay</FormLabel>
                                                <FormControl>
                                                    <Select onValueChange={field.onChange} value={field.value}  disabled={error}>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select your barangay" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectGroup>
                                                                <SelectLabel>Barangay</SelectLabel>
                                                                {barangay.map((barangay: any) => (
                                                                    <SelectItem key={barangay.id} value={barangay.name}>{barangay.name}</SelectItem>
                                                                ))}
                                                            </SelectGroup>
                                                        </SelectContent>
                                                    </Select>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <FormField
                                    control={form.control}
                                    name="address"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="font-medium text-slate-500">Address</FormLabel>
                                            <FormControl>
                                                <Input type="text" {...field}  disabled={error}/>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <div className="flex items-center space-x-2 py-4">
                                    <Checkbox id="terms" />
                                    <label
                                        htmlFor="terms"
                                        className="text-sm font-medium text-slate-500 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        By checking this you are agreeing to the Terms and Condition
                                    </label>
                                </div>
                                <Button type="submit" className="w-full" disabled={error || checkoutItems.length <= 0 ? true : false }>Checkout</Button>
                            </form>
                        </Form>
                    </div>
                    {/* Product */}
                    <div className={`w-full md:w-8/12 md:py-10 ${shippingLoading ? "opacity-80" : "opacity-100"}`}>
                        <h3 className="font-semibold text-sm text-slate-700 py-4">Product</h3>
                        {checkoutItems.map((product, index) => (
                            <div key={index} className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Image
                                        src={`http://localhost:3001/${product.tbl_variants?.variant_image}`}
                                        alt="Product Image"
                                        className="w-auto h-auto"
                                        width={50}
                                        height={100}
                                        loading="lazy"
                                    />
                                    <section>
                                        <h3 className="text-slate-700 text-xs md:text-sm font-medium">
                                            {product.tbl_products?.product_name}
                                        </h3>
                                        <Badge variant={"outline"} className="text-slate-500 font-medium text-xs">{product.tbl_variants?.variant_name}</Badge>
                                        <div className="flex items-center gap-2">
                                            <h4 className="text-slate-500 font-medium">
                                                {formatCurrency(Number(product?.tbl_variants?.variant_price) - (Number(product?.tbl_variants?.variant_price) * Number(product?.tbl_variants?.variant_discount)) / 100)}
                                            </h4>
                                            {product.tbl_variants?.variant_discount && (
                                                <p className="line-through text-xs text-slate-500">
                                                    {formatCurrency(product.tbl_variants.variant_price)}
                                                </p>
                                            )}
                                        </div>
                                    </section>
                                </div>
                                <p className="text-slate-500">x {product.quantity}</p>
                            </div>
                        ))}


                        {/* Total Section */}
                        <div className="py-4">
                            <div className="flex items-center justify-between">
                                <h3 className="text-sm py-2 text-slate-700 font-medium">Sub Total</h3>
                                <p>{formatCurrency(totalPrice)}</p>
                            </div>
                            {shippingResult && (
                                <div className="flex items-center justify-between">
                                <h3 className="text-sm py-2 text-slate-700 font-medium">Shipping Fee</h3>
                                {shippingLoading ? (
                                    <Skeleton className="w-[100px] h-[20px] rounded" />
                                ) : (
                                    shippingResult?.shipping_fee_rate != null ? (
                                        <p>{formatCurrency(shippingResult.shipping_fee_rate)}</p>
                                    ) : (
                                        <Badge variant={"secondary"} className="font-medium text-xs text-slate-500">Not Available</Badge>
                                    )
                                )}
                            </div>
                            )}
                            <div className="flex items-center justify-between">
                                <h3 className="text-sm py-2 text-slate-700 font-medium">Total</h3>
                                <p className="text-xl">{formatCurrency(totalPrice)}</p>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="h-screen text-slate-400 w-full flex items-center justify-center">
                    Your cart is empty
                </div>
            )}
        </div >
    )
}
