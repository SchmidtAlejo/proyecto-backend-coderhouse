import ProductDAO from "../dao/ProductDAO.js";

class ProductService {
  static async getProducts(limit, page, category, sort) {
    return await ProductDAO.getProducts(limit, page, category, sort);
  }

  static async getProductById(id) {
    return await ProductDAO.getProductById(id);
  }

  static async addProduct({ title, description, price, thumbnail, category, stock }) {
    return await ProductDAO.addProduct({ title, description, price, thumbnail, category, stock });
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
}

export default ProductService;