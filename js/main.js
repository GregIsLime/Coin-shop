let selector = document.querySelector("#tel")
let im = new Inputmask("+7(999) 999-99-99")
im.mask(selector)

let validation = new JustValidate("form")

validation.addField("#name", [
  {
    rule: "required",
    errorMessage: "Введите имя!"
  },
  {
    rule: "minLength",
    value: 2,
    errorMessage: "Минимум 2 символа!"
  }
]).addField("#tel", [
  {
    validator: (value) => {
      const phone = selector.inputmask.unmaskedvalue()
      return Boolean(Number(phone) && phone.length > 0)
    },
    errorMessage: 'Введите телефон'
  },
  {
    validator: (value) => {
      const phone = selector.inputmask.unmaskedvalue()
      return Boolean(Number(phone) && phone.length === 10)
    },
    errorMessage: 'Введите телефон полностью'
  }
]).addField("#msg", [
  {
    rule: "required",
    errorMessage: "Введите сообщение!"
  },
  {
    rule: "minLength",
    value: 10,
    errorMessage: "Минимум 10 символа!"
  }
]).onSuccess(async function () {

  let productNameOrder = document.getElementsByClassName("productName")
  let eachPrice = document.getElementsByClassName("eachPrice")
  let numberOfProdut = document.getElementsByClassName("numberOfProdut")

  let totalNumberSpan = document.getElementById("totalNumbersSpan")
  let totalSummSpan = document.getElementById("totalCalcSpan")

  for (let i = 0; i < productNameOrder.length; i++)
    toStringForMail(`${productNameOrder[i].innerHTML.trim()}`, `${eachPrice[i].innerHTML.trim()}`, `${numberOfProdut[i].innerHTML.trim()}`)

  toStringForMail("total", totalNumberSpan.innerHTML, totalSummSpan.innerHTML)

  let data = {
    surname: document.getElementById("surname").value,
    name: document.getElementById("name").value,
    fath:document.getElementById("fath").value,

    tel: selector.inputmask.unmaskedvalue(),
    mail:document.getElementById("mail").value,

    city: document.getElementById("city").value,
    street: document.getElementById("street").value,
    house:document.getElementById("house").value,
    flat:document.getElementById("flat").value,
    index:document.getElementById("index").value,

    msg: document.getElementById("msg").value,

    ord: positon
  }
  positon = ""





// toStringForMail(`${data[key1]['nominal']} ${data[key1]['year']}г. ${data[key1]['event']}`, `${data[key1]['price']}`, `${correctedLS[i][1]}`)
// console.log(positon)

let response = await fetch("mail.php", {
  method: "POST",
  body: JSON.stringify(data),
  headers: {
    "Content-Type": "application/json; charset=UTF-8"
  }
})

let result = await response.text()

alert(result)
})
