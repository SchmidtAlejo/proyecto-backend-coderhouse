const listItemsElements = document.getElementsByTagName('li');
const cartIdElement = document.getElementById('cartId');
const goToCart = document.getElementById('goToCart');
const API_URL = "http://localhost:8080";

const createGoToCart = (id) => {
    const a = document.createElement('a');
    a.href = `${API_URL}/carts/${id}`;
    a.textContent = "Go to cart";
    goToCart.appendChild(a);
}

let cartId = null;

const createCartElement = document.createElement('button');
createCartElement.textContent = "Create cart";
createCartElement.addEventListener('click', () => {
    fetch(API_URL + '/api/carts', {
        method: 'POST'
    }).then(res => res.json()).then(data => {
        cartId = data.cart._id
        const textCartIdElement = document.createElement('h2');
        textCartIdElement.textContent = "Cart ID: " + cartId;
        cartIdElement.appendChild(textCartIdElement);
        cartIdElement.removeChild(createCartElement);
        cartIdElement.removeChild(selectCartElementContainer);
        createGoToCart(cartId);
    }).catch(err => console.err(err));
})
cartIdElement.appendChild(createCartElement);

const selectCartElementContainer = document.createElement('div');
const selectCartElement = document.createElement('input');
const selectCartButton = document.createElement('button');
selectCartElementContainer.appendChild(selectCartElement);
selectCartElementContainer.appendChild(selectCartButton);
selectCartButton.textContent = "Select cart";
selectCartButton.addEventListener('click', () => {
    cartId = selectCartElement.value;
    const textCartIdElement = document.createElement('h2');
    textCartIdElement.textContent = "Cart ID: " + cartId;
    cartIdElement.appendChild(textCartIdElement);
    cartIdElement.removeChild(selectCartElementContainer);
    cartIdElement.removeChild(createCartElement);
    createGoToCart(cartId);
})
cartIdElement.appendChild(selectCartElementContainer);




for (const li of listItemsElements) {
    const input = document.createElement('input');
    input.type = 'number';
    input.value = 1;
    input.min = 1;
    const button = document.createElement('button');
    button.textContent = 'Add to cart';
    li.appendChild(input);
    li.appendChild(button);
    button.addEventListener('click', () => {
        if (cartId === null) {
            Swal.fire({
                icon: 'error',
                title: 'You must create a cart or select one',
                showConfirmButton: true,
            })
            return;
        }
        fetch(`${API_URL}/api/carts/${cartId}/product/${li.id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                quantity: Number.parseInt(input.value)
            })
        }).then(res => res.json()).then(data => {
            if (data.status === 'success') {
                Swal.fire({
                    icon: 'success',
                    title: 'Product added to cart',
                    showConfirmButton: true,
                })
            }
            else {
                Swal.fire({
                    icon: 'error',
                    title: data.error,
                    showConfirmButton: true,
                })
            }
        }).catch(err => {
            Swal.fire({
                icon: 'error',
                title: err,
                showConfirmButton: true,
            })
        });
    })
}