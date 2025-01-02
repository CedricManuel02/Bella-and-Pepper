
export interface SearchProps {
    query: string;
}

export interface CategoriesInterface {
    category_id: string;
    category_name: string;
    category_image: string;
}
// CART INTERFACE
export interface CartItemInterface {
    cart_id: string;
    cart_item_quantity: number;
    tbl_products: ProductInterface;
    tbl_variants: VariantsInterface;
}

export interface CartStateInterface {
    items: CartItemInterface[];
    selectedItems: CartItemInterface[];
    totalPrice: number;
}
export interface AddressInterface {
    address_id: string | null;
    address_complete: string;
    address_province: string;
    address_cities: string;
    address_barangay: string;
    address_is_primary: number;
}

export interface AddressArrayInterface {
    address: AddressInterface[]
}
//CHECKOUT INTERFACE
export interface CheckoutInterface {
    tbl_products: ProductInterface | null;
    tbl_variants: VariantsInterface | null;
    quantity: number;
}
export interface CheckoutArrayInterface {
    item: CheckoutInterface[];
    totalPrice: number;
}

export interface VariantInterface {
    variant_name: string;
    variant_price: string;
    variant_discount: string;
    variant_stocks: string;
    variant_image: File | null;
    variant_discount_end_date: string;
}
interface VariantsInterface {
    variant_discount_end_date: string | number | readonly string[] | undefined;
    variant_id: string;
    variant_name: string;
    variant_image: string;
    variant_price: number;
    variant_discount: number;
    variant_stocks: number;
    product_details: string;
}

export interface ProductInterface {
    product_id: string;
    product_name: string;
    product_description: string;
    product_price: number;
    product_discount: number;
    product_image: string;
    product_upc_number: string;
    product_date_deleted: string;
    product_date_created: string;
    tbl_categories: CategoriesInterface;
    tbl_variants: VariantInterface[];
}

export interface ProductArrayInterface {
    items: ProductInterface[];
    original_items: ProductInterface[];
    selected_items: ProductSelected[];
}

export interface ProductSelected {
    product_id: string;
}
export interface CategoriesInterface {
    category_id: string;
    category_name: string;
    category_image: string;
}