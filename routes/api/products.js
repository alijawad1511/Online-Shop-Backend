import express from 'express';
import Product from '../../models/Product.js'
const router = express.Router()

//@route    GET api/products
//@desc     Get all Products
//@access   public
router.get('/',async (req,res) => {
    try {

        const products = await Product.find()
        res.status(200).json(products)

    } catch (error) {
        console.log(error.message);
        res.status(505).send('Internal Server Error');
    }
})


//@route    GET api/products/count
//@desc     Get count of products
//@access   public
router.get('/count',async (req,res) => {
    try {

        const numProducts = await Product.count()
        res.status(200).json(numProducts)

    } catch (error) {
        console.log(error.message);
        res.status(505).send('Internal Server Error');
    }
})


//@route    POST api/products/addproduct
//@desc     Add a new Product
//@access   private
router.post('/addproduct',async (req,res) => {
    try {

        const { name,imageUrl,description,price,countInStock,rating } = req.body;
        let newProduct = new Product({
            name,
            imageUrl,
            description,
            price,
            countInStock,
            rating
        });

        const result = await newProduct.save();
        res.status(201).json(result);

    } catch (error) {
        console.log(error.message);
        res.status(505).send('Internal Server Error');
    }
})


//@route    DELETE api/products/delete/:id
//@desc     Delete a Product
//@access   private
router.delete('/delete/:id',async (req,res) => {
    try {

        const product = await Product.findById(req.params.id)
        if (!product) {
            return res.status(400).json({ success: false,message: 'Product does not exit',product: null })
        }

        const deletedProduct = await product.deleteOne();
        res.status(200).json({ success: true,message: "Product deleted successfully!",product: deletedProduct })

    } catch (error) {
        console.log(error.message);
        res.status(505).send('Internal Server Error');
    }

})


//@route    PUT api/products/edit/:id
//@desc     Edit a Product
//@access   private
router.put('/edit/:id',async (req,res) => {
    try {

        const { name,imageUrl,description,price,countInStock } = req.body;

        let updatedProduct = {};

        // Check either field is updated or not by user
        if (name) { updatedProduct.name = name }
        if (name) { updatedProduct.description = description }
        if (name) { updatedProduct.imageUrl = imageUrl }
        if (name) { updatedProduct.price = price }
        if (countInStock) { updatedProduct.countInStock = countInStock }

        const product = await Product.findById(req.params.id)
        if (!product) {
            return res.status(404).json({ success: false,message: 'Product not found',product: null })
        }

        const result = await Product.findByIdAndUpdate(req.params.id,{ $set: updatedProduct },{ new: true })
        res.status(200).json({ success: true,message: "Product updated successfully!",product: result })

    } catch (error) {
        console.log(error.message);
        res.status(505).send('Internal Server Error');
    }

})

export default router