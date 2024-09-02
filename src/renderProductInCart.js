export { renderProductInCart }

function renderProductInCart(name, price) {
    const nameProductInCart = document.createElement('span')
    nameProductInCart.classList.add('product__in__cart__infos__name')
    nameProductInCart.textContent = name

    const quantityProductInCart = document.createElement('span')
    quantityProductInCart.classList.add('product__in__cart__details__quantity')
    quantityProductInCart.textContent = `${1}x`

    const priceProductInCart = document.createElement('span')
    priceProductInCart.classList.add('product__in__cart__details__price')
    priceProductInCart.textContent = `@$${price}`

    const priceTotalProductInCart = document.createElement('span')
    priceTotalProductInCart.classList.add('product__in__cart__details__priceTotal')
    priceTotalProductInCart.textContent = `$${price}`

    const divProductInCartDetails = document.createElement('div')
    divProductInCartDetails.classList.add('product__in__cart__details')
    divProductInCartDetails.append(quantityProductInCart, priceProductInCart, priceTotalProductInCart)

    const divProductInCartInfos = document.createElement('div')
    divProductInCartInfos.classList.add('product__in__cart__infos')
    divProductInCartInfos.dataset.name = name
    divProductInCartInfos.dataset.price = price
    divProductInCartInfos.dataset.quantity = 1
    divProductInCartInfos.dataset.pricetotal = price * 1
    divProductInCartInfos.append(nameProductInCart, divProductInCartDetails)

    const iconRemoveInCart = document.createElement('img')
    iconRemoveInCart.src = 'assets/images/icon-remove-item.svg'

    const btnRemoveInCart = document.createElement('button')
    btnRemoveInCart.classList.add('product__in__cart__btnRemove')
    btnRemoveInCart.append(iconRemoveInCart)

    const line = document.createElement('hr')
    line.classList.add('line__in__cart')

    const divProductInCart = document.createElement('div')
    divProductInCart.classList.add('product__in__cart')
    divProductInCart.append(divProductInCartInfos, btnRemoveInCart, line)

    const divProductInCartOverview = document.createElement('div')
    divProductInCartOverview.classList.add('product__in__cart__overview')
    divProductInCartOverview.append(divProductInCart)

    document.querySelector('#product--in--cart').append(divProductInCartOverview)
}