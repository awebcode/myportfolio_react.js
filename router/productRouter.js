import { isAuthenticatedUser } from "../utils/auth.js";
import express from "express";
import { createProduct, deleteProduct, getAllProduct, getAllUserProduct, getProductDetails, updateProduct } from "../controller/ProductCtrl.js";
const router = express.Router()

router.route("/create").post(isAuthenticatedUser, createProduct)
router.get("/get", getAllProduct);
router.get("/get/user/products",isAuthenticatedUser, getAllUserProduct); //auth add me
router.delete("/delete/:id", deleteProduct);
router.put("/update/:id", updateProduct);
router.get("/get-details/:id", getProductDetails);
export default router;