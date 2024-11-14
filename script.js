$('document').ready(function () {
    loadGoods()
}
)

function cardButton() {
    let cardButton = document.getElementById("cardOfBuyer")
    cardButton.addEventListener("click", () => {
        let tbody = document.getElementsByTagName("tbody")
        tbody[0].innerHTML = ''
        let LS = JSON.parse(localStorage.getItem('card'))
        let orderList = ""
        let sum=0
        let totalNumbers=0
        $.getJSON("products.json", function (data) {
            let correctedLS = checkingAnOrderList(LS)
            let y = 0
            for (let key1 in data) {
                for (let i = 0; i < correctedLS.length; i++) {
                    if (correctedLS[i][0] == data[key1]['art']) {
                        orderList = `<tr>
                        <th scope="row">${y + 1}</th>
                        <td>${data[key1]['nominal']} ${data[key1]['event']} </td>
                        <td>${correctedLS[i][1]} шт.</td>
                        <td>${Number(data[key1]['price'])*Number(correctedLS[i][1])} ₽</td>
                      </tr>`
                        tbody[0].insertAdjacentHTML('beforeend', orderList)
                        orderList = ""
                        y++
                        totalNumbers+= Number(correctedLS[i][1])
                        sum+= Number(data[key1]['price'])*Number(correctedLS[i][1])
                    }
                }
            }
            orderList =
                `<tr class="totalCalc">
                    <th scope="row">ИТОГО:</th>
                    <td></td>
                    <td>${totalNumbers} шт.</td>
                    <td class="totalCalc">${sum} ₽</td>
                </tr>`
            tbody[0].insertAdjacentHTML('beforeend', orderList)
            orderList = ""
        })
    })
}

function checkingAnOrderList(orderList) {
    let orderListCopy = orderList.slice(0);
    let order = [[], []]
    let x = 0
    for (let i = 0; i < orderList.length; i++) {
        let y = 0;
        for (let z = 0; z < orderList.length; z++) {
            if (orderList[i] === orderListCopy[z]) {
                y++
                orderListCopy[z] = null
            }
        }
        if (y != 0) {
            order[x] = [[orderList[i]], [y]]
            x++
        }
    }
    return order
}

cardButton()

// geting JSON file put in HTML
function loadGoods() {
    $.getJSON("products.json", function (data) {

        let out = ""
        let isIn = false
        for (let key in data) {
            out += `<div class="col h-100">
        <div class="card">
          <img src=" ${data[key]['img']}" class="card-img-top w-100 cardimage" alt="...">
          <div class="card-body ">
            <h6 class="w-100 card-title text-center fs-5 nominals">${data[key]['nominal']}</h6>
            <h6 class="w-100 card-title text-center fs-5 nominals-comnt">${data[key]['event']}</h6>
            <p class="w-100 card-text lh-sm fs-6 diam">Диаметр: ${data[key]['diameter']}мм </p>
            <p class="w-100 card-text lh-sm fs-8 mass">Вес: ${data[key]['weight']}гр </p>
            <p class="w-100 card-text lh-sm fs-6 text-center discont">${Math.ceil(data[key]['price'] * 1.6)} ₽</p>
            <p class="w-100 card-text lh-sm text-center fs-4 price fw-bold"> ${data[key]['price']}₽</p>
            <div class="card-block2 justify-content-center align-items" style="display: none"  data-art-button= "${data[key]['art']}">
            <img class="imgSym minus" src="pic/minus.png" alt="">
            <div class="align-middle justify-content-center justify-content-md-center align-items d-flex">
            <img class="img-card" src="pic/pngwing.com.png" alt="">
            <p class="p-card">${checking(`${data[key]['art']}`)[0]}</p>
            </div>
            <img class="imgSym pluse" src="pic/more.png" alt="">
            </div>
            <div class="card-block justify-content-md-center justify-content-center text-center toBuyIt align-middle" style="display: none" data-art="${data[key]['art']}">в корзину</div>`
            document.getElementById("cardKeeper").insertAdjacentHTML('beforeend', out)
            out = ""
            isIn = checkingNumInCard(key)[1]
            out += checkingNumInCard(key)[0]
            out += `</div>
        </div>
      </div>`

            document.getElementById("cardKeeper").insertAdjacentHTML('beforeend', out)
            out = ""
        }

        const highlightedItems = document.querySelectorAll(".toBuyIt")
        highlightedItems.forEach((element) =>
            element.addEventListener("click", addToCard)
        )

        const pluse = document.querySelectorAll(".pluse")
        pluse.forEach((element) =>
            element.addEventListener("click", pluseAction)
        )

        const minus = document.querySelectorAll(".minus")
        minus.forEach((element) =>
            element.addEventListener("click", minusAction)
        )
        cardIsActive()
    })
}

function checkingNumInCard(art) {
    if (checking(art)[1]) {
        document.querySelector(`[data-art-button= "${art}"]`).style.display = "flex"
        return [``, true]
    }
    document.querySelector(`[data-art= "${art}"]`).style.display = "flex"
    return [``, false]
}

function addToCard() {
    let card = JSON.parse(localStorage.getItem('card')) || [];
    let articl = this.getAttribute("data-art")
    card.push(articl)
    localStorage.setItem("card", JSON.stringify(card))
    document.querySelector(`[data-art= "${articl}"]`).style.display = "none"
    document.querySelector(`[data-art-button= "${articl}"]`).style.display = "flex"
    this.parentNode.querySelector(".p-card").innerHTML = checking(articl)[0]
    cardIsActive()

}

function pluseAction() {
    let card = JSON.parse(localStorage.getItem('card')) || [];
    let articl = this.parentNode.getAttribute("data-art-button")
    card.push(articl)
    localStorage.setItem("card", JSON.stringify(card))
    this.parentNode.querySelector(".p-card").innerHTML = checking(articl)[0]
    cardIsActive()
}

function minusAction() {
    let card = JSON.parse(localStorage.getItem('card')) || [];
    let articl = this.parentNode.getAttribute("data-art-button")
    let i = 0
    for (let el of card) {
        if (el === articl) {
            card.splice(i, 1)
            break
        }
        i++
    }
    localStorage.setItem("card", JSON.stringify(card))
    this.parentNode.querySelector(".p-card").innerHTML = checking(articl)[0]
    if (checking(articl)[0] === 0) {
        document.querySelector(`[data-art= "${articl}"]`).style.display = ""
        document.querySelector(`[data-art-button= "${articl}"]`).style.display = "none"
        cardIsActive()
    }
    cardIsActive()
}

function checking(art) {
    let repiats = 0
    let isInCard = false
    let card = JSON.parse(localStorage.getItem('card')) || []
    card.forEach((element) => {
        if (element === art) {
            isInCard = true
            repiats++
        }
    })
    return [repiats, isInCard]
}

function cardIsActive() {
    let card = JSON.parse(localStorage.getItem('card'))
    let cardMenu = document.querySelector(".cardOfBuyer")
    if (card.length != 0) {
        cardMenu.classList.remove("disabled")
        cardMenu.innerHTML = `Корзина ${card.length}`
    } else {
        cardMenu.innerHTML = `Корзина`
        document.querySelector(".cardOfBuyer").classList.add("disabled")
    }
}

