import Product from "../models/product.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import uploadToCloudinary from "../utils/cloudinary.js";

const addProduct = asyncHandler(async (req, res) => {
    try {
        const { name, description, price, category } = req.body;
        console.log(name, description, price, category);
        if (!name || !description || !price || !category) {
            throw new ApiError(401, "All the fileds are improtant");
        }
        const existingProduct = await Product.findOne({ name });
        if (existingProduct) {
            throw new ApiError(400, "Product already exist please add a new one");
        }
        const imageLocalPath = req.files?.image[0]?.path;
        if (!image) {
            throw new ApiError(400, "Image file not existing");
        }

        const imageLink = await uploadToCloudinary(imageLocalPath)

        if (!imageLink) {
            throw new ApiError(400, "Error while uploading the file to cloudinary");
        }

        const product = await Product.create({
            name,
            description,
            price,
            images: imageLink,
            category,
        });

        return res.status(200).send(product);

    } catch (error) {
        console.log("Error while adding a product");
    }
})

export { addProduct }