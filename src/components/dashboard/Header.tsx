
import React from 'react';
import { Button, TextField, MenuItem, Box, Typography, Select } from '@mui/material';

interface HeaderProps {
    handleLogout: () => void;
    setShowAddModal: React.Dispatch<React.SetStateAction<boolean>>;
    searchQuery: string;
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
    categoryFilter: string;
    setCategoryFilter: React.Dispatch<React.SetStateAction<string>>;
    availabilityFilter: string;
    setAvailabilityFilter: React.Dispatch<React.SetStateAction<string>>;
    sortOption: string;
    setSortOption: React.Dispatch<React.SetStateAction<string>>;
}

const Header: React.FC<HeaderProps> = ({
    handleLogout,
    setShowAddModal,
    searchQuery,
    setSearchQuery,
    categoryFilter,
    setCategoryFilter,
    availabilityFilter,
    setAvailabilityFilter,
    sortOption,
    setSortOption
}) => {

    return (
        <Box sx={{ mb: 2 }}>
            <Box sx={{
                position: 'fixed',
                top: 0,
                backgroundColor: 'white',
                zIndex: 1000,
                padding: '16px',
                // boxShadow: '0 0px 4px rgba(0, 0, 0, 0.1)',
                width: '100vw',
                borderBottom: 1,
                borderColor: 'grey.500',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                maxWidth: '1152px'
            }}>
                <Typography variant="h6">
                    Best Store
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <TextField
                        label="Search by name"
                        variant="outlined"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        sx={{ mr: 2 }}
                    />
                    <Button onClick={handleLogout} variant="contained" color="secondary" sx={{ mr: 2 }}>
                        Logout
                    </Button>
                    <Button variant="contained" color="primary" onClick={() => setShowAddModal(true)}>
                        Add Product
                    </Button>
                </Box>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, mt: '120px' }}>
                <Box sx={{ display: 'block', mr: 2 }}> Sort by:</Box>
                {/* <InputLabel>Category</InputLabel> */}
                <Select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value as string)}
                    displayEmpty
                    sx={{ mr: 2, width: '150px' }}
                >
                    <MenuItem value="" sx={{ color: 'text.disabled' }}>All Categories</MenuItem>
                    <MenuItem value="Electronics">Electronics</MenuItem>
                    <MenuItem value="Clothing">Clothing</MenuItem>
                    <MenuItem value="Books">Books</MenuItem>
                </Select>
                {/* <InputLabel>Availability</InputLabel> */}
                <Select
                    value={availabilityFilter}
                    onChange={(e) => setAvailabilityFilter(e.target.value as string)}
                    displayEmpty
                    sx={{ mr: 2, width: '150px' }}
                >
                    <MenuItem value="" sx={{ color: 'text.disabled' }}>All Availability</MenuItem>
                    <MenuItem value="true">In Stock</MenuItem>
                    <MenuItem value="false">Out of Stock</MenuItem>
                </Select>
                {/* <InputLabel>Sort By</InputLabel> */}
                <Select
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value as string)}
                    sx={{ mr: 2, width: '150px' }}
                >
                    <MenuItem value="name">Name</MenuItem>
                    <MenuItem value="price">Price</MenuItem>
                    <MenuItem value="category">Category</MenuItem>
                </Select>
            </Box>
        </Box>
    );
};

export default Header;
