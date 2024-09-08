import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, Button, MenuItem, Box, FormControl, InputLabel, Select } from '@mui/material';
import { useDispatch } from 'react-redux';
import { updateProduct } from '../../redux/productsSlice';
import { Product } from '../../types/products';

interface EditProductModalProps {
    open: boolean;
    onClose: () => void;
    product: Product;
}

const EditProductModal: React.FC<EditProductModalProps> = ({ open, onClose, product }) => {
    const [name, setName] = useState(product.name);
    const [description, setDescription] = useState(product.description);
    const [price, setPrice] = useState(product.price.toString());
    const [category, setCategory] = useState(product.product_category.name);
    const [availability, setAvailability] = useState(product.availability);
    const [errors, setErrors] = useState<string[]>([]);

    const dispatch = useDispatch();

    const validateForm = () => {
        const errors: string[] = [];
        if (!name) errors.push('Name is required.');
        if (!description) errors.push('Description is required.');
        if (!price || isNaN(Number(price))) errors.push('Price must be a valid number.');
        if (!category) errors.push('Category is required.');
        setErrors(errors);
        return errors.length === 0;
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (validateForm()) {
            dispatch(updateProduct({
                ...product,
                name,
                description,
                price: Number(price),
                product_category: { name: category },
                availability,
            }));
            onClose();
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Edit Product</DialogTitle>
            <DialogContent>
                {errors.length > 0 && (
                    <div style={{ color: 'red' }}>
                        {errors.map((error, index) => (
                            <div key={index}>{error}</div>
                        ))}
                    </div>
                )}
                <form onSubmit={handleSubmit}>
                    <TextField
                        id="product-name"
                        label="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        fullWidth
                        margin="dense"
                    />
                    <TextField
                        id="product-description"
                        label="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        fullWidth
                        margin="dense"
                    />
                    <TextField
                        id="product-price"
                        label="Price"
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        fullWidth
                        margin="dense"
                        inputProps={{
                            min: "0",
                            step: "any"
                        }}
                        onInput={(e: React.FormEvent<HTMLInputElement>) => {
                            const input = e.currentTarget;
                            if (parseFloat(input.value) < 0) {
                                input.value = '0';
                            }
                        }}
                    />
                    <FormControl fullWidth margin="normal">
                        <InputLabel id="category-label">Category</InputLabel>
                        <Select
                            id="product-category"
                            labelId="category-label"
                            label="category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <MenuItem value={category}>{category}</MenuItem>
                            <MenuItem value="Electronics">Electronics</MenuItem>
                            <MenuItem value="Clothing">Clothing</MenuItem>
                            <MenuItem value="Books">Books</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl fullWidth margin="dense" sx={{ mb: '20px' }}>
                        <InputLabel id="product-availability">Availability</InputLabel>
                        <Select
                            id="product-availability"
                            labelId="product-availability"
                            label="Availability"
                            value={availability}
                            onChange={(e) => setAvailability(e.target.value as string)}
                        >
                            <MenuItem value="true">In Stock</MenuItem>
                            <MenuItem value="false">Out of Stock</MenuItem>
                        </Select>
                    </FormControl>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button onClick={onClose} >Cancel</Button>
                        <Button type="submit" variant="contained" color="primary">Save</Button>
                    </Box>

                </form>
            </DialogContent>
        </Dialog>
    );
};

export default EditProductModal;
