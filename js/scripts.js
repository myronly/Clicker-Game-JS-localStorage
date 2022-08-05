// Custom Scripts
document.addEventListener("DOMContentLoaded", () => {
  const clicker = document.querySelector(".clicker__btn");
  const countClick = document.querySelector(".clicker__count");
  const clickerUP = document.querySelectorAll(".clicker__shop-lvl");
  const clickerUpAmount = document.querySelectorAll(".clicker__shop-price-amount");
  const clickerUpCount = document.querySelectorAll(".clicker__shop-price-count");
  const clickerPerSecond = document.querySelector(".clicker__seconds");
  const reset = document.querySelector(".reset");

  let count, perSecond;
  let amountArr = [];

  const PRICEINCREASE = 1.15;

  if (
    localStorage.getItem("count") !== null &&
    localStorage.getItem("perSecond") !== null &&
    localStorage.getItem("amountPerSecond") !== null
  ) {
    count = localStorage.getItem("count");
    perSecond = localStorage.getItem("perSecond");
    countClick.textContent = Math.round(count);
    clickerPerSecond.textContent = perSecond;
  } else {
    count = 0;
    perSecond = 0;
    countClick.textContent = count;
    clickerPerSecond.textContent = perSecond;
    localStorage.setItem("count", count);
    localStorage.setItem("perSecond", perSecond);
    amountSet();
  }

  clicker.addEventListener("click", () => {
    localStorage.setItem("count", ++count);
    countClick.textContent = Math.round(count);
    clicker.classList.add("click");
    if (clicker.classList.contains("click")) {
      setTimeout(() => clicker.classList.remove("click"), 50);
    }
  });

  for (let i = 0; i < clickerUP.length; i++) {
    setInterval(
      () =>
        +clickerUP[i].dataset.price > count
          ? clickerUP[i].classList.add("not-enough") ||
            clickerUpAmount[i].parentNode.parentNode.classList.add("not-enough")
          : clickerUP[i].classList.remove("not-enough") ||
            clickerUpAmount[i].parentNode.parentNode.classList.remove("not-enough"),
      100
    );
    clickerUP[i].addEventListener("click", () => {
      if (+clickerUP[i].dataset.price <= count && !clickerUP[i].classList.contains("not-enough")) {
        count -= +clickerUP[i].dataset.price;
        perSecond = +perSecond + +clickerUP[i].dataset.count;
        localStorage.setItem("perSecond", perSecond);
        let STEP = 1;
        const interval = setInterval(() => {
          STEP = STEP * 1.5;
          clickerPerSecond.textContent = Math.round(+clickerPerSecond.textContent + STEP);
          if (+clickerPerSecond.textContent >= +localStorage.getItem("perSecond")) {
            clearInterval(interval);
            clickerPerSecond.textContent = +localStorage.getItem("perSecond");
          }
        }, 4);
        localStorage.setItem("count", count);
        clickerUP[i].classList.add("click-up");
        clickerUpAmount[i].parentNode.parentNode.classList.add("click-up");
        if (clickerUP[i].classList.contains("click-up")) {
          setTimeout(() => {
            clickerUP[i].classList.remove("click-up");
            clickerUpAmount[i].parentNode.parentNode.classList.remove("click-up");
          }, 200);
        }
      }
    });
  }

  function amountSet() {
    for (let i = 0; i < clickerUP.length; i++) {
      amount = 0;
      amountArr[i] = amount;
      localStorage.setItem("amountPerSecond", amountArr);
    }
  }

  for (let i = 0; i < clickerUP.length; i++) {
    let amount = 0;
    let amountArrGet = localStorage.getItem("amountPerSecond").split(",");
    amount = amountArrGet[i];
    clickerUpAmount[i].textContent = amount + "x";
    amountArr.push(amount);
    if (+amount !== 0) {
      clickerUP[i].dataset.price = Math.round(clickerUP[i].dataset.price * PRICEINCREASE ** amount);
    }
    clickerUpCount[i].textContent = clickerUP[i].dataset.price;
    clickerUP[i].addEventListener("click", () => {
      if (!clickerUP[i].classList.contains("not-enough")) {
        clickerUpAmount[i].textContent = ++amount + "x";
        amountArr[i] = amount;
        localStorage.setItem("amountPerSecond", amountArr);
        let STEP = 1;
        const interval = setInterval(() => {
          STEP = STEP * 1.5;
          clickerUpCount[i].textContent = Math.round(+clickerUP[i].dataset.price + STEP);
          if (
            +clickerUpCount[i].textContent >= Math.round(clickerUP[i].dataset.price * PRICEINCREASE)
          ) {
            clearInterval(interval);
            clickerUP[i].dataset.price = Math.round(clickerUP[i].dataset.price * PRICEINCREASE);
            clickerUpCount[i].textContent = clickerUP[i].dataset.price;
          }
        }, 4);
      }
    });
  }

  function perSecondInterval() {
    count = +count + +perSecond / 100;
    localStorage.setItem("count", count);
    countClick.textContent = Math.round(count);
  }

  const interval = setInterval(perSecondInterval, 10);
  reset.addEventListener("click", () => {
    clearInterval(interval);
    count = 0;
    perSecond = 0;
    localStorage.setItem("count", count);
    localStorage.setItem("perSecond", perSecond);
    countClick.textContent = Math.round(count);
    clickerPerSecond.textContent = perSecond;
    amountSet();
    window.location.reload();
  });
});

