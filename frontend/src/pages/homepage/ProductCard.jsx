import { FaEdit, FaTrash } from 'react-icons/fa';
import {useDarkMode} from '../../context/ThemeContext';

const ProductCard = ({ product, onEdit, onDelete }) =>{ 
  const {dark} = useDarkMode();



  return (
  <div className="col-lg-3 col-md-4 col-sm-6 col-12 mb-4">
    <div className="card h-100 shadow-sm"
      style={{ backgroundColor: dark ? '#233142' : '#fafafa', color: dark ? '#fafafa' : '#000' }}>
      <div style={{ height: '200px', overflow: 'hidden' }}>
        <img
          src={product.image}
          alt={product.name}
          className="w-100 h-100"
          style={{ objectFit: 'cover' }}
        />
      </div>
      <div
        className="card-body d-flex flex-column justify-content-between"
        style={{ backgroundColor: 'inherit', color: 'inherit' }}
      >
        <h5 className="card-title fs-6"
         style={{
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            height: '40px'
          }}>{product.name}</h5>
        <p className="card-text text-success fw-bold">${Number(product.price).toFixed(2)}</p>
        <p
          className="card-text"
          style={{
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}
        >
          {product.description}
        </p>
        <div className="mt-auto d-flex align-items-center justify-content-end gap-1">
          <button className="btn btn-sm text-primary" onClick={() => onEdit(product)}>
            <FaEdit />
          </button>
          <button className="btn btn-sm text-danger" onClick={() => onDelete(product._id)}>
            <FaTrash />
          </button>
        </div>
      </div>
    </div>

  </div>
)};

export default ProductCard