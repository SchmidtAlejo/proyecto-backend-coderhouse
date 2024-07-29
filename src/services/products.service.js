import ProductDAO from "../dao/ProductDAO.js";
import CustomError from "../errors/CustomError.js";
import { generateProductErrorInfo } from "../errors/productInfo.js";

class ProductService {
  static async getProducts(limit, page, category, sort) {
    return await ProductDAO.getProducts(limit, page, category, sort);
  }

  static async getProductById(id) {
    return await ProductDAO.getProductById(id);
  }

  static async addProduct({ title, description, price, thumbnail, category, stock }, user) {
    if (!title || !description || !price || !category || !stock) {
      CustomError.createError(
        "Product creation error",
        generateProductErrorInfo({ title, description, price, thumbnail, category, stock }),
        "error trying to create a product",
        400
      )
    }
    return await ProductDAO.addProduct({ title, description, price, thumbnail, category, stock }, user);
  }

  static async updateProduct(id, changes) {
    return await ProductDAO.updateProduct(id, changes);
  }

  static async deleteProduct(id) {
    return await ProductDAO.deleteProduct(id);
  }

  static async test() {
    return await ProductDAO.test();
  }

  static async deleteAllProducts() {
    return await ProductDAO.deleteAllProducts()
  }
}

export default ProductService;