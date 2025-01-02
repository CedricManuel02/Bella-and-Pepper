"use client"
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ProductTable from "./components/ProductTable";
import { Separator } from "@/components/ui/separator";
import ProductExportDialog from "./components/ProductExportDialog";
import { removeProducts, removeSelectedItems, searchProducts, sortByCategory, sortProducts } from "@/redux/features/product-slice";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertDialogHeader, AlertDialogFooter } from "@/components/ui/alert-dialog";
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogTitle, AlertDialogDescription, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog";
import { toast } from "@/hooks/use-toast";
import { CategoriesInterface, ProductArrayInterface, ProductSelected } from "../../../../typings";
import { deleteProducts } from "../../../../actions/productServerAction";
import { EllipsisVertical, Loader, Trash } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { getCategoryList } from "../../../../actions/serverAction";


export default function Product() {
  const router = useRouter();
  const dispatch = useDispatch();
  const selected = useSelector((state: { product: ProductArrayInterface }) => state.product.selected_items);
  const [loading, setLoading] = useState<boolean>(false);
  const [category, setCategory] = useState<CategoriesInterface[]>([]);
  function handleSortChange(value: string) {
    try {
      const sort_array = ["All", "Name", "Price", "Date Added"];
      if (sort_array.includes(value)) {
        dispatch(sortProducts({ sort_by: value }));
      }
    } catch (error) {
      console.error("Error sorting products:", error);
    }
  }
  function handleSortByCategory(value: string) {
    try {
      if (value !== "") {
        if (value === "All") {
          dispatch(sortProducts({ sort_by: "All" }));
        } else {
          dispatch(sortByCategory({ category_id: value }));
        }
      }
    } catch (error) {
      console.error("Error sorting products by category:", error);
    }
  }
  function handleSearch(e: React.KeyboardEvent<HTMLInputElement>) {
    try {
      const search = e.currentTarget.value;
      dispatch(searchProducts({ search: search }));
    } catch (error) {
      console.error("Error searching products:", error);
    }
  }
  function handleDelete() {
    try {
      setLoading(true);
      if (selected.length === 0) {
        toast({
          variant: "default",
          title: "Opps!",
          description: "Please select a product to delete."
        });
        return;
      }

      selected.forEach(async (item: ProductSelected) => {
        const response = await deleteProducts(item.product_id);
        if (response.status === 200) {
          dispatch(removeSelectedItems({ product_id: item.product_id }));
          dispatch(removeProducts({ product_id: item.product_id }));
        }
      });
    } catch (error) {
      console.error("Error deleting products:", error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    }

  }

  const getCategory = async () => {
    try {
      const response = await getCategoryList();
      setCategory(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }
  useEffect(() => {
    getCategory();
  }, []);

  return (
    <div className="w-11/12 xl:w-9/12 min-h-screen h-auto m-auto py-10">
      <div className="flex justify-between flex-col items-start gap-2 lg:items-center lg:flex-row">
        <div className="space-y-1">
          <h2 className="text-slate-700 font-semibold text-md lg:text-xl">
            Product
          </h2>
          <p className="text-slate-500 text-xs lg:text-sm">
            Manage the shop products.
          </p>
        </div>
      </div>
      <div className="py-4 flex sm:flex-row justify-between flex-col items-start gap-2">
        <div className="flex items-center space-x-2">
          <Button onClick={() => router.push("/product/create")} variant={"default"} className="bg-green-500 hover:bg-green-600">
            Create
          </Button>
          <ProductExportDialog />
        </div>
        <div className="flex items-center gap-2">
          <Input className="w-full md:w-96" type="text" placeholder="Search Product Name or UPC number..." onKeyUp={handleSearch} />
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">Sort by</Button>
            </PopoverTrigger>
            <PopoverContent className="w-full flex flex-col gap-2">
            <div className="space-y-2">
              <h4 className="font-medium leading-none">Sort Product</h4>
            </div>
              <Select onValueChange={handleSortChange}>
                <SelectTrigger className="w-full md:w-[200px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All</SelectItem>
                  <SelectItem value="Name">Name</SelectItem>
                  <SelectItem value="Price">Price</SelectItem>
                  <SelectItem value="Date Added">Date Added</SelectItem>
                </SelectContent>
              </Select>
              <Select onValueChange={handleSortByCategory}>
                <SelectTrigger className="w-full md:w-[200px]">
                  <SelectValue placeholder="Sort by Category" />
                </SelectTrigger>
                <SelectContent>
                  {category.map((item: CategoriesInterface) => (
                    <SelectItem key={item.category_id} value={item.category_id}>{item.category_name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </PopoverContent>
          </Popover>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <EllipsisVertical size={14} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-auto">
              <DropdownMenuGroup>
                <DropdownMenuItem className="cursor-pointer" asChild>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button className="flex items-center justify-center gap-2 w-full" variant="link" disabled={selected.length > 0 ? false : true}><Trash size={14} /> Delete</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This will remove <span className="text-red-500 font-medium">{selected.length} Products</span> from the list.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete}>{loading ? (<div className="flex items-center justify-center space-x-2">
                          <Loader size={14} className="animate-spin" />
                          <p>Deleting...</p>
                        </div>) : (<p>Delete</p>)}</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <Separator />
      <ProductTable />
    </div>
  );
}
