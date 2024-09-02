import { renderProduct } from "./renderProduct.js";
import { renderProductInOrder } from "./renderProductInOrder.js";
import { addToCart } from "./addToCart.js";

fetch('data.json')
    .then((resp) => resp.json())
    .then(data => {
        const products = data

        products.forEach(product => {
            const image = product.image.desktop
            const category = product.category
            const name = product.name
            const price = product.price

            renderProduct(image, category, name, price)
        })

        addToCart()
    })

function processCart() {
    const productsInMenu = document.querySelectorAll('.product__infos')
    const productsInCart = document.querySelectorAll('.product__in__cart__overview')

    productsInCart.forEach((product) => {
        const productInCartInfos = product.querySelector('.product__in__cart__infos')

        productsInMenu.forEach((productMenu) => {
            if (productInCartInfos.dataset.name == productMenu.dataset.name) {
                const product = productMenu.closest('.product')
                const productImg = product.querySelector('.product__img').src
                let productImgUrl = productImg.split('assets')[1]
                
                productImgUrl = 'assets' + productImgUrl
                const name = productInCartInfos.dataset.name
                const quantity = productInCartInfos.dataset.quantity
                const price = productInCartInfos.dataset.price

                renderProductInOrder(productImgUrl, name, price, quantity)
            }
        })
    })
}

const confirmOrder = document.querySelector('#confirm--order')
confirmOrder.addEventListener('click', function () {
    const modalOrder = document.querySelector('#order--confirmed')
    const overlay = document.querySelector('.overlay')
    modalOrder.style.display = 'flex'
    overlay.style.display = 'block'
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // Suaviza a rolagem
    });
    processCart()
})

const newOrder = document.querySelector('#start--new--order')
newOrder.addEventListener('click', () => {
    window.location.href = 'index.html'
})