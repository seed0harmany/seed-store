import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateProduct = () => {
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: '',
    price: '',
    description: '',
    image: ''
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // NEW

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!product.name || !product.price) {
      setError('Name and price are required.');
      return;
    }

    try {
      setError('');
      setLoading(true);  // start loading

      const newProduct = {
        ...product,
        price: parseFloat(product.price).toFixed(2)
      };

      await axios.post('http://localhost:5100/api/products', newProduct);

      // Wait 1 second before navigation
      setTimeout(() => {
        navigate('/');
      }, 3000);

    } catch (err) {
      setError('Failed to create product.');
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ maxWidth: '500px', paddingTop: '5.5em'}}>
      <h2 className='text-center'>Create Product</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit} className="mt-3">
        <div className="mb-3">
          <label className="form-label">Product Name*</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={product.name}
            onChange={handleChange}
            required
            disabled={loading} // disable input when loading
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Price ($)*</label>
          <input
            type="number"
            className="form-control"
            name="price"
            value={product.price}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Image URL</label>
          <input
            type="url"
            className="form-control"
            name="image"
            value={product.image}
            onChange={handleChange}
            disabled={loading}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            name="description"
            rows="3"
            value={product.description}
            onChange={handleChange}
            disabled={loading}
          />
        </div>

        <button type="submit" className="btn btn-success d-block m-auto" disabled={loading}>
          {loading ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              Saving...
            </>
          ) : (
            'Save Product'
          )}
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;
