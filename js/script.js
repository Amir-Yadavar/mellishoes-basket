let $ = document
let navbar = $.getElementsByClassName('nav-small')
let closeSideleft = $.getElementsByClassName('closeleft')
let navbarSection = $.querySelector('header>section:nth-of-type(2)')
let buy = $.querySelectorAll('.buy')
let buyMini = $.querySelectorAll('.buy-mini')
let form = $.querySelectorAll('.form-select')
let close = $.querySelectorAll('.fa-close')
let addCard = $.querySelectorAll('.add-card')
let modelName = $.querySelectorAll('.model-name')
let modelPrice = $.querySelectorAll('.model-price')
let shoe = $.querySelectorAll('.container-box>section')
let basket = $.querySelectorAll('.icone-basket')
let badgeBasket = $.querySelectorAll('.badge-basket')
let basketBuy = $.querySelector('main>section:nth-of-type(2)')
let closeBasket = $.querySelector('.close-basket')
let containerBasket = $.querySelector('main>section:nth-of-type(2)>section:nth-of-type(1)')
let aTag = $.getElementsByTagName('a')
let darkSide = $.querySelector('.side-dark')

let allProduct = []
let product
let total
let allProductPriceArray = []

// style by javascript--------------------------
for (i = 0; i < aTag.length; i++) {
    aTag[i].addEventListener('click', (e) => {
        e.preventDefault()
    })
}

navbar[0].addEventListener('click', () => {
    navbarSection.style.transform = 'translateX(0)'
    navbarSection.style.opacity = '1'
    navbarSection.style.visibility = 'visible'
})

closeSideleft[0].addEventListener('click', () => {
    navbarSection.style.transform = 'translateX(100%)'
    navbarSection.style.opacity = '0'
    navbarSection.style.visibility = 'hidden'
})

buy.forEach((item, itemindex) => {
    item.addEventListener('click', () => {
        form[itemindex].style.opacity = '1'
        form[itemindex].style.visibility = 'visible'

    })
})
buyMini.forEach((item, itemindex) => {
    item.addEventListener('click', () => {
        form[itemindex].style.opacity = '1'
        form[itemindex].style.visibility = 'visible'
    })
})
close.forEach((item, itemindex) => {
    item.addEventListener('click', () => {
        form[itemindex - 1].style.opacity = '0'
        form[itemindex - 1].style.visibility = 'hidden'

    })
})

basket.forEach((icon) => {
    icon.addEventListener('click', () => {
        basketBuy.style.transform = 'translateX(0)'
        basketBuy.style.opacity = '1'
        basketBuy.style.visibility = 'visible'
        darkSide.style.visibility = 'visible'
        darkSide.style.opacity = '1'

        allProductPriceArray = []
        calc()
    })
})

closeBasket.addEventListener('click', () => {
    closeBasketStyle()
})

// end style by script---------------

addCard.forEach((item, itemindex) => {
    item.addEventListener('click', () => {
        form[itemindex].style.opacity = '0'
        form[itemindex].style.visibility = 'hidden'
        let priceShoe = modelPrice[itemindex].getAttribute('data-price')
        let nameShoe = modelName[itemindex].innerHTML
        let count = Number(shoe[itemindex].getAttribute('data-count'))

        if (count == 1) {
            product = {
                id: itemindex + 1,
                name: nameShoe,
                price: priceShoe,
                count: count
            }
            allProduct.push(product)

            addBox()

            newcount = count + 1
            shoe[itemindex].setAttribute('data-count', newcount)
        } else {

            newItem = allProduct.filter((item) => {
                return item.id === itemindex + 1
            })
            newItem.forEach((item) => {
                item.count = shoe[itemindex].getAttribute('data-count')
            })

            newcount2 = count + 1
            shoe[itemindex].setAttribute('data-count', newcount2)

            addBox()
        }

    })
})

function addBox() {
    containerBasket.innerHTML = ""

    allProduct.forEach((product) => {
        let secElem = $.createElement('section')
        secElem.className = 'col-12 d-flex p-2 border-bottom'
        secElem.innerHTML = `<div class="col-9 d-flex flex-column">
                    <p class="col-12">${product.name}</p>
                    <p class="col-12">${product.price}<span>تومان</span></p>
                    <p class="col-12">${product.count}<span> جفت</span></p>
                </div>
                <button class="btn btn-outline-danger col-3 h-25 delete-shoe" data-id="${product.id}" onclick="clickHandler(event)">حذف</button>`

        containerBasket.append(secElem)
        badge()
    })
}


function clickHandler(event) {
    removeId = Number(event.target.getAttribute('data-id'))

    removeItem = allProduct.filter((item) => {
        return item.id === removeId
    })

    console.log(removeItem)

    let x = allProduct.indexOf(removeItem[0])

    allProduct.splice(x, 1)
    shoe[((removeItem[0].id) - 1)].setAttribute('data-count', '1')
    closeBasketStyle()

    console.log(allProduct)
    containerBasket.innerHTML = ""
    $.getElementsByClassName('total-price')[0].innerHTML = total
    addBox()
    badge()
}

function closeBasketStyle() {
    basketBuy.style.transform = 'translateX(-100%)'
    basketBuy.style.opacity = '0'
    basketBuy.style.visibility = 'hidden'
    darkSide.style.visibility = 'hidden'
    darkSide.style.opacity = '0'
}

function calc() {
    if (allProduct == "") {
        $.getElementsByClassName('total-price')[0].innerHTML = ''
    } else {
        for (i = 0; i < allProduct.length; i++) {
            allProductPriceArray.push(allProduct[i].price * allProduct[i].count)

            total = allProductPriceArray.reduce((prevPrice, curentPrice) => {
                return Number(prevPrice) + Number(curentPrice)
            })

            $.getElementsByClassName('total-price')[0].innerHTML = total
            addBox()
        }
    }

}
function badge() {
    badgeBasket.forEach((item) => {
        item.innerHTML = allProduct.length
    })
}