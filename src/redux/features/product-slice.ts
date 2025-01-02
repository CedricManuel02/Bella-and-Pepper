import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductArrayInterface, ProductInterface, ProductSelected } from '../../../typings';

const initialState: ProductArrayInterface = {
    items: [] as ProductInterface[],
    original_items: [] as ProductInterface[],
    selected_items: [] as ProductSelected[],
};

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        addProducts(state, action: PayloadAction<{ tbl_products: ProductInterface; }>) {
            const { tbl_products } = action.payload;
            const isExisting = state.items.find((product) => product.product_id === tbl_products.product_id);
            if (!isExisting) {
                state.items.push(tbl_products);
            }
        },
        sortProducts(state, action: PayloadAction<{ sort_by: string; }>) {
            const { sort_by } = action.payload;

            if (state.original_items.length === 0) {
                state.original_items = [...state.items];
            }

            if (sort_by === "All") {
                state.items = [...state.original_items];
            }
            else {
                state.items.sort((a, b) => {
                    if (sort_by === "Name") {
                        return a.product_name.localeCompare(b.product_name);
                    } else if (sort_by === "Price") {
                        return Number(a.tbl_variants[0].variant_price) - Number(b.tbl_variants[0].variant_price);
                    } else if (sort_by === "Date Added") {
                        return new Date(a.product_date_created).getTime() - new Date(b.product_date_created).getTime();
                    }
                    return 0;
                });
            }

        },
        sortByCategory(state, action: PayloadAction<{ category_id: string; }>) {
            const { category_id } = action.payload;

            if (state.original_items.length === 0) {
                state.original_items = [...state.items];
            }

            if (category_id === "All") {
                state.items = [...state.original_items];
            }
            else {
                state.items = [...state.original_items];
                const result = state.items.filter((product) => product.tbl_categories.category_id === category_id && product.product_date_deleted === null);
                state.items = [...result];
            }
        },
        searchProducts(state, action: PayloadAction<{ search: string; }>) {
            const { search } = action.payload;
            if (state.original_items.length === 0) {
                state.original_items = [...state.items];
            }
            state.items = [...state.original_items];

            const result = state.items.filter((product) =>
                product.product_name.toLowerCase().includes(search.toLowerCase()) ||
                product.product_upc_number.startsWith(search)
            );

            if (!result) {
                state.items = [];
            } else {
                state.items = [...result];
            }

        },
        addSelectedItems(state, action: PayloadAction<{ product_id: string; }>) {
            const { product_id } = action.payload;
            const isExisting = state.selected_items.find((product) => product.product_id === product_id);
            if (!isExisting) {
                state.selected_items.push({ product_id: product_id });
            }
        },
        removeSelectedItems(state, action: PayloadAction<{ product_id: string; }>) {    
            const { product_id } = action.payload;
            state.selected_items = state.selected_items.filter((product) => product.product_id !== product_id);
        },
        removeProducts(state, action: PayloadAction<{ product_id: string; }>) {
            const { product_id } = action.payload;
            state.items = state.items.filter((product) => product.product_id !== product_id);
        },
        clearProducts(state) {
            state.items = [];
        },
    },
});

export const { addProducts, clearProducts, sortProducts, sortByCategory, searchProducts, addSelectedItems, removeSelectedItems, removeProducts } = productSlice.actions;

export default productSlice.reducer;