$('document').ready(function () {

    loadGoods()
    cardButton()
    loadFilterButtons()
}
)
function refreshCards() {
    let tbody = document.getElementsByTagName("tbody")
    tbody[0].innerHTML = ''
    let LS = JSON.parse(localStorage.getItem('card'))
    let orderList = ""
    let sum = 0
    let totalNumbers = 0
    $.getJSON("products.json", function (data) {
        let correctedLS = checkingAnOrderList(LS)
        let y = 0
        console.log(data)
        for (let key1 in data) {
            for (let i = 0; i < correctedLS.length; i++) {
                if (correctedLS[i][0] == data[key1]['art']) {
                    orderList = `<tr>
                    <th scope="row">${y + 1}</th>
                    <td class="artOfCategory" style="display:none;">${data[key1]['art']}</td>
                    <td>${data[key1]['nominal']} ${data[key1]['year']}г. ${data[key1]['event']} </td>
                    <td>
                    <img class="imgSym minus2" src="pic/minus.png" alt="">
                    ${correctedLS[i][1]} шт.
                    <img class="imgSym pluse2" src="pic/more.png" alt="">
                    </td>
                    <td>${Number(data[key1]['price']) * Number(correctedLS[i][1])} ₽</td>
                  </tr>`
                    tbody[0].insertAdjacentHTML('beforeend', orderList)
                    orderList = ""
                    y++
                    totalNumbers += Number(correctedLS[i][1])
                    sum += Number(data[key1]['price']) * Number(correctedLS[i][1])

                    const pluse2 = document.querySelectorAll(".pluse2")
                    pluse2.forEach((element) => {
                        element.addEventListener("click", pluseAction)
                    })

                    const minus2 = document.querySelectorAll(".minus2")
                    minus2.forEach((element) => {
                        element.addEventListener("click", minusAction)
                    }
                    )
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
}

function cardButton() {
    let cardButton = document.getElementById("cardOfBuyer")
    cardButton.addEventListener("click", () => {
        refreshCards()
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

function filtringCatigories() {
    $.getJSON("products.json", function (data) {
        let = new Array()


        // filter by year
        let = new Array()
        for (let key in data)
            some.push(data[key])
        some.sort((a, b) => (a.year - b.year))

    })
}

let isOnlyCoins = false
let isOnlyMedals = false
let filterByCountry = "all"


// geting JSON file put in HTML
function loadGoods() {
    $.getJSON("products.json", function (data) {
        let filterSet = (isOnlyCoins) ? "монета" : ((isOnlyMedals) ? "медаль" : "none")
        let out = ""
        let isIn = false
        for (let key in data) {
            if (data[key]['isInBase'] === "yes"){
            if (data[key]['type'] === filterSet || filterSet === "none") {
                if (data[key]['country'] === filterByCountry || filterByCountry === "all") {
                    out += `<div class="col h-100">
        <div id="card-id-${data[key]['art']}" class="card">
          <img src=" ${data[key]['img']}" class="card-img-top w-100 cardimage" alt="...">
          <div class="card-body } ">
            <h6 class="w-100 card-title text-center fs-5 nominals">${data[key]['nominal']} ${data[key]['year']}г.</h6>
            <h6 class="w-100 card-title text-center fs-5 nominals-comnt">${data[key]['event']}</h6>
            <p class="w-100 card-text lh-sm fs-6 country">Страна: ${data[key]['country']} </p>
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
            }}
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
    if (this.className === "imgSym pluse") {
        let articl = this.parentNode.getAttribute("data-art-button")
        // console.log(articl)
        card.push(articl)
        localStorage.setItem("card", JSON.stringify(card))
        this.parentNode.querySelector(".p-card").innerHTML = checking(articl)[0]
        cardIsActive()

    } else if (this.className === "imgSym pluse2") {
        let nameOfCategory = this.parentNode.parentNode.getElementsByClassName("artOfCategory")

        let art = nameOfCategory[0].innerText
        console.log(art)
        card.push(art)
        localStorage.setItem("card", JSON.stringify(card))
        let rightCard = document.getElementById(`card-id-${art}`)
        try { rightCard.querySelector(".p-card").innerHTML }
        catch (err) {
            refreshCards()
            cardIsActive()
        }
        numer = rightCard.querySelector(".p-card").innerHTML
        rightCard.querySelector(".p-card").innerHTML = parseInt(numer) + 1
        refreshCards()
        cardIsActive()

    }
}

function minusAction() {
    let card = JSON.parse(localStorage.getItem('card')) || [];
    if (this.className === "imgSym minus") {
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
    } else if (this.className === "imgSym minus2") {
        let nameOfCategory = this.parentNode.parentNode.getElementsByClassName("artOfCategory")
        let art = nameOfCategory[0].innerText
        let i = 0
        for (let el of card) {
            if (el === art) {
                card.splice(i, 1)
                break
            }
            i++
        }
        localStorage.setItem("card", JSON.stringify(card))
        let rightCard = document.getElementById(`card-id-${art}`)


        try { rightCard.querySelector(".p-card").innerHTML }
        catch (err) {
            refreshCards()
            cardIsActive()
        }
        
        let numer = rightCard.querySelector(".p-card").innerHTML
        rightCard.querySelector(".p-card").innerHTML = parseInt(numer) - 1
        if (rightCard.querySelector(".p-card").innerHTML === "0") {
            document.querySelector(`[data-art-button= "${art}"]`).style.display = "none"
            document.querySelector(`[data-art= "${art}"]`).style.display = "flex"
        }
        refreshCards()
        cardIsActive()
    }


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
        cardMenu.innerHTML = `Корзина <span id="card-numberOfProducts">${card.length}</span>`
    } else {
        cardMenu.innerHTML = `Корзина`
        document.querySelector(".cardOfBuyer").classList.add("disabled")
    }
}

function loadFilterButtons() {
    let btnOnlyCoins = document.getElementById("btncheck1")
    let btnOnlyMedals = document.getElementById("btncheck2")
    btnOnlyCoins.addEventListener("click", () => {
        btnOnlyCoins.checked = (btnOnlyCoins.checked) ? true : false
        btnOnlyMedals.checked = false
        isOnlyMedals = false
        isOnlyCoins = (isOnlyCoins) ? false : true
        document.getElementById("cardKeeper").innerHTML = ''
        loadGoods()
    })
    btnOnlyMedals.addEventListener("click", () => {
        btnOnlyMedals.checked = (btnOnlyMedals.checked) ? true : false
        btnOnlyCoins.checked = false
        isOnlyCoins = false
        isOnlyMedals = (isOnlyMedals) ? false : true
        document.getElementById("cardKeeper").innerHTML = ''
        loadGoods()
    })

    let categoryArray = document.getElementsByClassName("dropdown-item-countrys")
    Array.from(categoryArray).forEach((element) => {
        element.addEventListener("click", () => {
            btnGroupDrop1.innerText = element.innerText
            document.getElementById("header-text").innerText= element.innerText

            filterByCountry = element.getAttribute("countrys")
            document.getElementById("cardKeeper").innerHTML = ''
            loadGoods()
        })
    })
}
