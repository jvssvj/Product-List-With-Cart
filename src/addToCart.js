import { renderProductInCart } from "./renderProductInCart.js";
export { addToCart }

function addToCart() {
    let emptyCartMessage = document.querySelector('#desserts--cart--empty--cart')
    let cartWithItems = document.querySelector('#desserts--cart--with--items')

    let btnsAddToCart = document.querySelectorAll('.product__btn__add__to__cart')
    btnsAddToCart.forEach((button) => {
        button.addEventListener('click', function () {
            const cart = document.querySelector('#product--in--cart')
            let productsInCart = cart.querySelectorAll('.product__in__cart__overview')
            let cartQuantity = productsInCart.length + 1
            cartWithItems.style.display = 'flex'
            emptyCartMessage.style.display = 'none'

            function cardEmpty() {
                let updatedProductsInCart = cart.querySelectorAll('.product__in__cart__overview')
                cartQuantity = updatedProductsInCart.length

                if (cartQuantity < 1) {
                    cartWithItems.style.display = 'none'
                    emptyCartMessage.style.display = 'flex'
                }
            }

            const productDiv = this.closest('.product')
            const productInfosDiv = productDiv.querySelector('.product__infos')
            const btnsDecrementDecrement = productDiv.querySelector('.product__btns__decrement__increment')
            const datasetName = productInfosDiv.dataset.name
            const datasetPrice = productInfosDiv.dataset.price
            const $btnDecrement = btnsDecrementDecrement.querySelector('.product__btn__decrement')
            const $btnIncrement = btnsDecrementDecrement.querySelector('.product__btn__increment')
            const $quantityDecrementIncrement = btnsDecrementDecrement.querySelector('.product__quantity')
            let datasetQuantity = parseFloat(productInfosDiv.dataset.quantity)
            $quantityDecrementIncrement.textContent = datasetQuantity
            btnsDecrementDecrement.style.display = 'flex'

            renderProductInCart(datasetName, datasetPrice)

            function calculateTotalPrice() {
                const orderTotal = document.querySelectorAll('.order__total__price')
                const priceTotalSpans = document.querySelectorAll('.product__in__cart__details__priceTotal')
                let totalPrice = 0
                priceTotalSpans.forEach((span) => {
                    const numericValue = parseFloat(span.textContent.replace(/[^0-9.]/g, '')) || 0
                    totalPrice += numericValue
                    
                })
                orderTotal.forEach((span) => {
                    span.textContent = `$${totalPrice.toFixed(2)}`
                })
            }

            function calculateTotalQuantity() {
                const quantitySpans = document.querySelectorAll('.product__in__cart__details__quantity')
                let yourCartQuantity = document.querySelector('.desserts__cart__empty__cart__t')
                let totalQuantity = 0

                quantitySpans.forEach(span => {
                    const numericValue = parseFloat(span.textContent.replace(/[^0-9.]/g, '')) || 0
                    totalQuantity += numericValue
                })
                yourCartQuantity.textContent = `Your Cart (${totalQuantity})`
            }

            function removeByIcon() {
                let productInCart = document.querySelectorAll('.product__in__cart__infos')
                
                productInCart.forEach((div) => {
                    if(div.dataset.name == datasetName) {
                        let divMain = div.closest('.product__in__cart__overview')
                        let iconRemove = divMain.querySelector('.product__in__cart__btnRemove')

                        iconRemove.addEventListener('click', function() {
                            btnsDecrementDecrement.style.display = 'none'
                            document.querySelector('#product--in--cart').removeChild(divMain)
                            cardEmpty()
                            calculateTotalQuantity()
                            calculateTotalPrice()
                        })
                    }
                })
            }
            
            function decrement() { 
                $btnDecrement.addEventListener('click', function() {
                    datasetQuantity -= 1
                    productInfosDiv.dataset.quantity = datasetQuantity
                    $quantityDecrementIncrement.textContent = datasetQuantity 

                    if(productInfosDiv.dataset.quantity < 1) {
                        productInfosDiv.dataset.quantity = 1
                        btnsDecrementDecrement.style.display = 'none'
                    }
    
                    let productInCart = document.querySelectorAll('.product__in__cart__infos')
                    productInCart.forEach((div) => {

                        if(div.dataset.name == datasetName) {
                            let divMain = div.closest('.product__in__cart__overview')
                            
                            if(datasetQuantity < 1) {
                                datasetQuantity = 1
                                btnsDecrementDecrement.style.display = 'none'
                                document.querySelector('#product--in--cart').removeChild(divMain)
                                cardEmpty()
                                calculateTotalQuantity()
                                calculateTotalPrice()
                            }

                            div.dataset.quantity = datasetQuantity
                            let price = div.dataset.price
                            let priceTotal = div.dataset.priceTotal = price * datasetQuantity
                            let detailsInCart = div.querySelector('.product__in__cart__details')
                            let $quantityInCart = detailsInCart.querySelector('.product__in__cart__details__quantity')
                            let $priceTotalInCart = detailsInCart.querySelector('.product__in__cart__details__priceTotal')
                            $quantityInCart.textContent = `${datasetQuantity}x`
                            $priceTotalInCart.textContent = `$${(priceTotal - price).toFixed(2)}`
                        }
                    })
                    calculateTotalQuantity()
                    calculateTotalPrice()
                })
            }
        
            function increment() {
                $btnIncrement.addEventListener('click', function() {
                    datasetQuantity += 1
                    productInfosDiv.dataset.quantity = datasetQuantity
                    $quantityDecrementIncrement.textContent = datasetQuantity
                    
                    let productInCart = document.querySelectorAll('.product__in__cart__infos')
                    productInCart.forEach((div) => {
                        if(div.dataset.name == datasetName) {
                            div.dataset.quantity = datasetQuantity
                            let price = div.dataset.price
                            let priceTotal = div.dataset.priceTotal = price * datasetQuantity
                            let detailsInCart = div.querySelector('.product__in__cart__details')
                            let $quantityInCart = detailsInCart.querySelector('.product__in__cart__details__quantity')
                            let datasetPrice = div.dataset.price
                            let $priceTotalInCart = detailsInCart.querySelector('.product__in__cart__details__priceTotal')
                            $quantityInCart.textContent = `${datasetQuantity}x`
                            $priceTotalInCart.textContent = `$${(datasetQuantity * datasetPrice).toFixed(2)}`
                        }
                    })
                    calculateTotalQuantity()
                    calculateTotalPrice()
                })
            }

            calculateTotalPrice()
            calculateTotalQuantity()
            removeByIcon()
            decrement()
            increment()
        })
    })
}