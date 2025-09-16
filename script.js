const baseUrl = "https://v6.exchangerate-api.com/v6/b55775b1dc0610cd604139ca/latest"

let dropdown = document.querySelectorAll(".dropdown select");

let btn = document.querySelector("form button")

let fromCurr = document.querySelector(".from select")
let toCurr = document.querySelector(".to select")
let msg = document.querySelector(".msg")

window.addEventListener("load" , () => {
    update_Flag_Rate();
})

for (const select of dropdown) {
    for (currencyCode in countryList) {
    let newOption = document.createElement("option")
    newOption.innerText = currencyCode
    newOption.value = currencyCode
    select.append(newOption)
    if (select.name === "from" && currencyCode === "USD") {    
            newOption.selected = "selected" //If i want specific option to shown by default i add selected attribute
        } else if (select.name === "to" && currencyCode === "PKR") {
            newOption.selected = "selected"
        }
    }

    select.addEventListener("change" , (e) => {
        updateFlag(e.target)
    });
}

const updateFlag = (element) => {   // now element is select which is in html file
  let currencyCode = element.value
  let countryCode = countryList[currencyCode]
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`
  let img = element.parentElement.querySelector("img")
  img.src = newSrc
};

btn.addEventListener("click" , (e) => {
    e.preventDefault();
    update_Flag_Rate();
});

let = update_Flag_Rate = async () => {
    let amount = document.querySelector(".amount input")
    let amountVal = amount.value
    if(amountVal === "" || amountVal < 1)
    {
        amountVal = 1
        amount.value = "1"
    }
    
    let URL = `${baseUrl}/${fromCurr.value}`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data.conversion_rates[toCurr.value];
    let finalAmount = (amountVal * rate).toFixed(2);
    msg.innerText = `${amountVal}  ${fromCurr.value} = ${finalAmount} ${toCurr.value}`
}
