import { getShoppingCart } from "../utilities/fakedb";

const cartProductsLoader = async() => {
const loadedProducts = await fetch('products.json')
const products = await loadedProducts.json();
// console.log(products)
const storedCart = getShoppingCart()
const savedCart = [];
for(const id  in storedCart) {
    const addedProduct = products.find(p => p.id === id)
    if(addedProduct) {
        const quantity = storedCart[id];
        addedProduct.quantity = quantity;
        savedCart.push(addedProduct);
    }
}
return savedCart;
}
export default cartProductsLoader;