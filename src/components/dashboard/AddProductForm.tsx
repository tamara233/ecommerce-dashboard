import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { addProduct } from '../../redux/productsSlice';
import { Button, TextField, FormControl, InputLabel, Select, MenuItem, Dialog, DialogTitle, DialogContent } from '@mui/material';

interface AddProductFormProps {
    open: boolean;
    onClose: () => void;
}
const AddProductForm: React.FC<AddProductFormProps> = ({ open, onClose }) => {
    const dispatch: AppDispatch = useDispatch();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('Books');
    const [availability, setAvailability] = useState('true');
    const [errors, setErrors] = useState<string[]>([]);

    const validateForm = () => {
        const errors: string[] = [];
        if (!name) errors.push('Name is required.');
        if (!description) errors.push('Description is required.');
        if (!price || isNaN(Number(price))) errors.push('Price must be a valid number.');
        if (!category) errors.push('Category is required.');
        setErrors(errors);
        return errors.length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            dispatch(addProduct({ id: Date.now(), name, description, price: Number(price), product_category: { name: category }, availability }));
            setName('');
            setDescription('');
            setPrice('');
            setCategory('Books');
            setAvailability('true');
            onClose()
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Add Product</DialogTitle>
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
                        label="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
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
                            label="Category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <MenuItem value="Electronics">Electronics</MenuItem>
                            <MenuItem value="Clothing">Clothing</MenuItem>
                            <MenuItem value="Books">Books</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl fullWidth margin="normal" variant="outlined">
                        <InputLabel>Availability</InputLabel>
                        <Select
                            value={availability}
                            onChange={(e) => setAvailability(e.target.value)}
                            label="Availability"
                        >
                            <MenuItem value={'true'}>In Stock</MenuItem>
                            <MenuItem value={'false'}>Out of Stock</MenuItem>
                        </Select>
                    </FormControl>
                    <Button type="submit" variant="contained" color="primary" sx={{ mt: 2, display: 'block', ml: 'auto' }}>
                        Add Product
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default AddProductForm;
