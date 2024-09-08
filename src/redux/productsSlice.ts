import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Product } from '../types/products';

interface ProductsState {
    products: Product[];
    currentPage: number;
    totalPages: number;
    status: 'idle' | 'loading' | 'failed';
    error: string | null;
}

const initialState: ProductsState = {
    products: [],
    currentPage: 1,
    totalPages: 1,
    status: 'idle',
    error: null,
};

export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async (page: number) => {
        const response = await axios({
            method: 'get',
            url: 'https://jsonfakery.com/products', // mock API for json data
            responseType: 'json',
        });
        return {
            products: response.data.slice(0, 30).map((product: any) => ({
                ...product,
                availability: String(Math.random() < 0.5),
            })),
        };
    }
);

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setPage: (state, action) => {
            const newPage = action.payload;
            if (newPage > state.totalPages) {
                state.currentPage = state.totalPages;
            } else if (newPage < 1) {
                state.currentPage = 1;
            } else {
                state.currentPage = newPage;
            }
        },
        setTotalPageCount: (state) => {
            state.totalPages = Math.ceil(state.products.length / 10);
            if (state.currentPage > state.totalPages) {
                state.currentPage = state.totalPages;
            }
        },
        addProduct: (state, action: PayloadAction<Product>) => {
            state.products.unshift(action.payload);
            productsSlice.caseReducers.setTotalPageCount(state)
        },
        deleteProduct: (state, action: PayloadAction<number>) => {
            state.products = state.products.filter(product => product.id !== action.payload);
            productsSlice.caseReducers.setTotalPageCount(state)
        },
        updateProduct: (state, action: PayloadAction<Product>) => {
            const index = state.products.findIndex(product => product.id === action.payload.id);
            if (index !== -1) {
                state.products[index] = action.payload;
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                console.log('fetch new')
                state.status = 'idle';
                state.products = action.payload.products;
                state.totalPages = Math.ceil(action.payload.products.length / 10);
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to fetch products';
            })
    },
});

export const { setPage, setTotalPageCount, addProduct, deleteProduct, updateProduct } = productsSlice.actions;
export default productsSlice.reducer;
