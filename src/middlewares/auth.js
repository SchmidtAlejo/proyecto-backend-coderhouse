import ProductService from "../services/products.service.js";
import CartService from "../services/carts.service.js";

export const auth = (req, res, next) => {
    if (!req.session.user) {
        return res.redirect("/401")
    }

    next()
}

export const verificatePremiumUser = async (req, res, next) => {
    try {
        const { pid } = req.params;
        const product = await ProductService.getProductById(pid);
        if (req.user.role === 'premium' && product.owner._id.toString() !== req.user._id) {
            return res.error401("No tienes permisos para editar este producto");
        }
        next();
    } catch (error) {
        return res.error401(error.message);
    }
}

export const verificateCartUser = async (req, res, next) => {
    try {
        const { cid } = req.params;
        const cart = await CartService.getCartById(cid)
        if (!cart) return res.error404("Carrito no encontrado")
        if (cart.user.toString() !== req.user._id) {
            return res.error401("No tienes permisos para editar este carrito");
        }
        next();
    } catch (error) {
        return res.error401(error.message);
    }
}
