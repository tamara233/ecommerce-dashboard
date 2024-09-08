import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/authSlice';
import { fetchProducts, setPage, deleteProduct } from '../../redux/productsSlice';
import { RootState, AppDispatch } from '../../redux/store';
import { Product } from '../../types/products';
import {
  CircularProgress,
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import EditProductForm from './EditProductForm';
import AddProductForm from './AddProductForm';
import Header from './Header';

const Dashboard: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [availabilityFilter, setAvailabilityFilter] = useState('');
  const [sortOption, setSortOption] = useState('name');

  const { products, currentPage, totalPages, status, error } = useSelector(
    (state: RootState) => state.products
  );

  const handleLogout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    dispatch(fetchProducts(currentPage));
  }, [dispatch, currentPage]);

  const handlePageChange = (event: null | React.MouseEvent<HTMLButtonElement>, newPage: number) => {
    event?.preventDefault()
    dispatch(setPage(newPage + 1));
  };

  const handleDelete = (productId: number) => {
    dispatch(deleteProduct(productId));
    const newTotalPages = Math.ceil((products.length - 1) / 10);
    if (currentPage > newTotalPages && newTotalPages > 0) {
      dispatch(setPage(newTotalPages));
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setShowEditModal(true);
  };

  const filteredProducts = products
    .filter(product =>
      (searchQuery ? product.name.toLowerCase().includes(searchQuery.toLowerCase()) : true) &&
      (categoryFilter ? product.product_category.name === categoryFilter : true) &&
      (availabilityFilter ? product.availability === availabilityFilter : true)
    )
    .sort((a, b) => {
      if (sortOption === 'price') return a.price - b.price;
      if (sortOption === 'name') return a.name.localeCompare(b.name);
      if (sortOption === 'category') return a.product_category.name.localeCompare(b.product_category.name);
      return 0;
    });


  return (
    <Container>
      <Header
        handleLogout={handleLogout}
        setShowAddModal={setShowAddModal}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        availabilityFilter={availabilityFilter}
        setAvailabilityFilter={setAvailabilityFilter}
        sortOption={sortOption}
        setSortOption={setSortOption}
      />
      <Container>
        <Typography variant="h4" gutterBottom>
          Product Dashboard
        </Typography>
        {status === 'loading' && <CircularProgress />}
        {status === 'failed' && <Typography color="error">{error}</Typography>}
        {status === 'idle' && (
          filteredProducts.length ? <>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell>Availability</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredProducts.slice(0, 10).map((product: Product) => (
                    <TableRow key={product.id}>
                      <TableCell>{product.name}</TableCell>
                      <TableCell>{product.description}</TableCell>
                      <TableCell>${product.price.toFixed(2)}</TableCell>
                      <TableCell>{product.product_category.name}</TableCell>
                      <TableCell
                        sx={{
                          color: product.availability === 'true' ? 'green' : 'red',
                          fontWeight: 'bold',
                        }}>
                        {product.availability === 'true' ? 'In Stock' : 'Out of Stock'}</TableCell>
                      <TableCell>
                        <IconButton onClick={() => handleEdit(product)}>
                          <EditIcon />
                        </IconButton>
                      </TableCell>
                      <TableCell>
                        <IconButton onClick={() => handleDelete(product.id)} color="error">
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            {console.log('total', totalPages)}
            {filteredProducts.length / 10 > 1 && <TablePagination
              rowsPerPageOptions={[10]}
              component="div"
              count={filteredProducts.length}
              rowsPerPage={10}
              page={currentPage - 1}
              onPageChange={handlePageChange}
            />}
          </>
            : <>No products available now</>
        )}
      </Container>
      {showEditModal && editingProduct && (
        <EditProductForm product={editingProduct} onClose={() => setShowEditModal(false)} open={showEditModal} />
      )}
      {showAddModal && <AddProductForm onClose={() => setShowAddModal(false)} open={showAddModal} />}

    </Container>
  );
};

export default Dashboard;
