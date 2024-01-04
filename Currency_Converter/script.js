const BASE_URL =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdownSelects = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for (let select of dropdownSelects) {
  for (let countryCode in countryList) {
    let newOpt = document.createElement("option");
    newOpt.innerText = countryCode;
    newOpt.value = countryCode;

    if (select.name === "from" && countryCode === "USD") newOpt.selected = true;
    else if (select.name === "to" && countryCode === "INR")
      newOpt.selected = true;
    select.append(newOpt);
  }
  select.addEventListener("change", (event) => {
    updateFlag(event.target);
  });
}

const updateFlag = (element) => {
  let imgSrc = `https://flagsapi.com/${countryList[element.value]}/flat/64.png`;
  let img = element.parentElement.querySelector("img");

  img.src = imgSrc;
};

btn.addEventListener("click", async (evt) => {
  evt.preventDefault();
  let amount = document.querySelector(".amount input");
  let amountValue = amount.value;
  if (amountValue == "" || amountValue < 1) {
    amountValue = 1;
    amount.value = "1";
  }
  const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;

  let response = await fetch(URL);

  let data = await response.json();

  let rate = data[toCurr.value.toLowerCase()];
  let finalAmount = rate * amountValue;
  msg.innerText = `${amountValue} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
});
