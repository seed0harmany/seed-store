import { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';
import { Modal, Button, Form } from 'react-bootstrap';
import { Toast, ToastContainer } from 'react-bootstrap';
import { CheckCircle, XCircle, Info } from 'react-bootstrap-icons';


const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null);
  const [formData, setFormData] = useState({ name: '', price: '', image: '' });
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [toast, setToast] = useState({
  show: false,
  message: '',
  bg: 'success',
  icon: <CheckCircle className="me-2" />,
});

  const fetchProducts = async () => {
    try {
      const res = await axios.get('/api/products');
      setProducts(res.data.data || []);
    } catch (err) {
      console.error('Failed to load products', err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleEditClick = (product) => {
    setEditProduct(product);
    setFormData({
      name: product.name,
      price: Number(product.price).toFixed(2),
      image: product.image,
      description: product.description || ''
    });
    setShowModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Format price on input
    if (name === 'price') {
      const formatted = value === '' ? '' : parseFloat(value).toFixed(2);
      setFormData(prev => ({ ...prev, price: formatted }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSaveChanges = async () => {
    const updated = {
      ...formData,
      price: parseFloat(formData.price).toFixed(2),
    };

    const unchanged =
      updated.name === editProduct.name &&
      updated.price === Number(editProduct.price).toFixed(2) &&
      updated.image === editProduct.image &&
      updated.description === (editProduct.description || '');

    if (unchanged) {
      setShowModal(false);
      return;
    }

    try {
      const res = await axios.put(`/api/products/${editProduct._id}`, updated);
      const updatedProduct = res.data.data || res.data;

      setProducts(prev =>
        prev.map(p => (p._id === updatedProduct._id ? updatedProduct : p))
      );

      showToast('Product updated successfully!', 'success');
      await fetchProducts()
      setShowModal(false);
    } catch (err) {
      console.error('Failed to update product', err);
      showToast('Failed to update product', 'danger');
    }
  };

  const showToast = (message, type = 'success') => {
    const icons = {
      success: <CheckCircle className="me-2" />,
      danger: <XCircle className="me-2" />,
      info: <Info className="me-2" />,
    };

    setToast({
      show: true,
      message,
      bg: type,
      icon: icons[type] || icons.info,
    });

    setTimeout(() => setToast(prev => ({ ...prev, show: false })), 3000);
  };

  const confirmDelete = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
  try {
    await axios.delete(`/api/products/${deleteId}`);
    setProducts(prev => prev.filter(p => p._id !== deleteId));
    showToast('Product deleted successfully!', 'danger');
  } catch (err) {
    console.error('Failed to delete product', err);
    showToast('Failed to delete product', 'danger');
  } finally {
    setShowDeleteModal(false);
    setDeleteId(null);
  }
};


  return (
    <div className="container-fluid mt-4" style={{ paddingTop: '4.5em' }}>
      <div className="row">
        {products.map(p => (
          <ProductCard
            key={p._id}
            product={p}
            onEdit={handleEditClick}
            onDelete={confirmDelete}
          />
        ))}
      </div>

        <ToastContainer position="bottom-center" className="p-3">
          <Toast
            show={toast.show}
            bg={toast.bg}
            onClose={() => setToast({ ...toast, show: false })}
            delay={3000}
            autohide
          >
            <Toast.Header closeButton>
              {toast.icon}
              <strong className="me-auto">Seed Store</strong>
            </Toast.Header>
            <Toast.Body className="text-white">{toast.message}</Toast.Body>
          </Toast>
        </ToastContainer>



      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Control
              className="mb-2"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Product Name"
            />
            <Form.Control
              className="mb-2"
              name="price"
              type="number"
              step="0.01"
              value={formData.price}
              onChange={handleInputChange}
              placeholder="Price"
            />
            <Form.Control
              className="mb-2"
              name="image"
              value={formData.image}
              onChange={handleInputChange}
              placeholder="Image URL"
            />
            <Form.Control
              as="textarea"
              className="mb-2"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Product Description"
              rows={3}
            />

          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleSaveChanges}>Save Changes</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this product?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default HomePage;
