import productModel from '../models/product.model.js';
import mongoose from 'mongoose';

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

// GET all products
export const getProducts = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.error('Error fetching data:', error.message);
    res.status(500).json({ success: false, message: error.message || 'Server error' });
  }
};

// GET single product by ID
export const getProduct = async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return res.status(404).json({ success: false, message: 'Invalid ID' });
  }

  try {
    const product = await productModel.findById(id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    res.status(200).json({ success: true, data: product });
  } catch (error) {
    console.error('Error fetching product:', error.message);
    res.status(500).json({ success: false, message: error.message || 'Server error' });
  }
};

// CREATE new product
export const createProduct = async (req, res) => {
  const product = req.body;

  if (!product.name || !product.price) {
    return res.status(400).json({ success: false, message: 'Name and price are required' });
  }

  const newProduct = new productModel({
    ...product,
    price: parseFloat(product.price)
  });

  try {
    await newProduct.save();
    res.status(201).json({ success: true, data: newProduct });
  } catch (err) {
    console.error('Create error:', err.message);
    res.status(500).json({ success: false, message: err.message || 'Server error' });
  }
};

// UPDATE product by ID
export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const product = req.body;

  if (!isValidObjectId(id)) {
    return res.status(404).json({ success: false, message: 'Invalid ID' });
  }

  if (Object.keys(product).length === 0) {
    return res.status(400).json({ success: false, message: 'No fields to update' });
  }

  try {
    const updated = await productModel.findByIdAndUpdate(id, product, { new: true });
    res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      data: updated
    });
  } catch (error) {
    console.error('Error updating product:', error.message);
    res.status(500).json({ success: false, message: error.message || 'Server error' });
  }
};

// DELETE product by ID
export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return res.status(404).json({ success: false, message: 'Invalid ID' });
  }

  try {
    await productModel.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error.message);
    res.status(500).json({ success: false, message: error.message || 'Server error' });
  }
};
