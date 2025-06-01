import productModel from '../models/product.model.js';
import mongoose from 'mongoose';

export const getProducts = async (req, res)=>{
 try {
  const products =  await productModel.find({});
  res.status(200).json({success: true, data: products})
 } catch (error) {
   console.error('Error Fetching Data', error.message);
   res.status(500).json({success: false, message: 'Server Error'})
 }
};

export const getProduct = async (req, res) => {
  const {id} = req.params;
if (!mongoose.Types.ObjectId.isValid(id)) {
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
    res.status(500).json({ success: false, message: 'Server error' });
  }

};

export const createProduct = async (req, res) => {
 const product = req.body;

  if (!product.name || !product.price) {
    return res.status(400).json({ success: false, message: 'All fields require' });
  }
  const newProduct =  new productModel(product)

  try {
    await newProduct.save()
    res.status(201).json({ success: true, data: newProduct });
  } catch (err) {
    console.error('Create error:', err.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const updateProduct = async (req, res) => {
  const {id} = req.params;
  const product = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
  return res.status(404).json({success: false, message: 'Invalid Id'})
}

  try {
    await productModel.findByIdAndUpdate(id, product, {new: true});
    res.status(200).json({success: true, message: 'Product updated successfully', data:product})
  } catch (error) {
    console.error('Error updating product', error.message);
    res.status(500).json({success:false, message: 'Server error'})
  }
};

export const deleteProduct = async (req, res) => {
  const {id} = req.params;

if (!mongoose.Types.ObjectId.isValid(id)) {
  return res.status(404).json({success: false, message: 'Invalid Id'})
}

  try {
    await productModel.findByIdAndDelete(id);
    res.status(200).json({success: true, message: 'Product deleted Successfully'});
  } catch (error) {
    console.error('Error deleting product', error.message);
    res.status(500).json({success:false, message: 'Server error'})
  }
};