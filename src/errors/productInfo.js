export const generateProductErrorInfo = (product) => {

  return `One or more properties of the product are missing or not valid: 
  List of required properties:
  * title: requiered, unique, needs to be a string, received ${product.title}
  * price: requiered, needs to be a number, received ${product.price}
  * description: requiered, needs to be a string, received ${product.description}
  * category: requiered, needs to be a string, received ${product.category}
  * stock: requiered, needs to be a number, received ${product.stock}
  * thumbnails: optional, needs to be a string, received ${product.thumbnails}
  `
}