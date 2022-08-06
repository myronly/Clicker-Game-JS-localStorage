// Custom Scripts
document.addEventListener("DOMContentLoaded", () => {
  const clicker = document.querySelector(".clicker__btn");
  const countClick = document.querySelector(".clicker__count");
  const clickerUP = document.querySelectorAll(".clicker__shop-lvl");
  const clickerPerClickUP = document.querySelectorAll(".clicker__shop-lvl-per-click");
  const clickerPerSecondUP = document.querySelectorAll(".clicker__shop-lvl-per-second");

  const clickerUpAmount = document.querySelectorAll(".clicker__shop-price-amount");
  const clickerPerClickUPAmount = document.querySelectorAll(".per__click-amount");
  const clickerPerSecondUpAmount = document.querySelectorAll(".per__second-amount");
  const clickerPerClickUPCount = document.querySelectorAll(".per__click-count");
  const clickerPerSecondUPCount = document.querySelectorAll(".per__second-count");

  const clickerPerSecond = document.querySelector(".clicker__seconds");
  const clickerPerClick = document.querySelector(".clicker__clicks");
  const reset = document.querySelector(".reset");

  let count, perSecond;

  const PRICE_INCREASE = 1.15;
  const PER_SECOND_PRICE_ARR = [20, 100, 500, 2500, 12500];
  const PER_SECOND_COUNT_ARR = [0.1, 1, 5, 25, 125];
  const PER_CLICK_PRICE_ARR = [50, 200, 1000, 5000, 20000];
  const PER_CLICK_COUNT_ARR = [0.1, 1, 5, 25, 125];

  if (
    localStorage.getItem("count") !== null &&
    localStorage.getItem("perSecond") !== null &&
    localStorage.getItem("perClick") !== null &&
    localStorage.getItem("perSecondUP") !== null &&
    localStorage.getItem("perClickUP") !== null
  ) {
    count = +localStorage.getItem("count");
    perSecond = +localStorage.getItem("perSecond");
    perClick = +localStorage.getItem("perClick");
    countClick.textContent = Math.round(count);
    clickerPerSecond.textContent = perSecond.toFixed(1);
    clickerPerClick.textContent = perClick.toFixed(1);
  } else {
    count = 0;
    perSecond = 0;
    perClick = 1;
    countClick.textContent = count;
    clickerPerSecond.textContent = perSecond.toFixed(1);
    clickerPerClick.textContent = perClick.toFixed(1);
    localStorage.setItem("count", count);
    localStorage.setItem("perSecond", perSecond);
    localStorage.setItem("perClick", perClick);
    amountSet(clickerPerClickUP, "perClickUP");
    amountSet(clickerPerSecondUP, "perSecondUP");
  }

  clicker.addEventListener("click", () => {
    count += +localStorage.getItem("perClick");
    localStorage.setItem("count", count);
    countClick.textContent = count.toFixed(1);
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
  }

  for (let i = 0; i < clickerPerSecondUP.length; i++) {
    clickerPerSecondUP[i].setAttribute("data-price", PER_SECOND_PRICE_ARR[i]);
    clickerPerSecondUP[i].setAttribute("data-count", PER_SECOND_COUNT_ARR[i]);
    clickerPerClickUP[i].setAttribute("data-price", PER_CLICK_PRICE_ARR[i]);
    clickerPerClickUP[i].setAttribute("data-count", PER_CLICK_COUNT_ARR[i]);

    clickerPerSecondUP[i].addEventListener("click", () => {
      if (
        +clickerPerSecondUP[i].dataset.price <= count &&
        !clickerPerSecondUP[i].classList.contains("not-enough")
      ) {
        count -= +clickerPerSecondUP[i].dataset.price;
        perSecond = +perSecond + +clickerPerSecondUP[i].dataset.count;
        localStorage.setItem("perSecond", perSecond);
        let STEP = 1;
        const interval = setInterval(() => {
          STEP = STEP * 1.5;
          clickerPerSecond.textContent = Math.round(+clickerPerSecond.textContent + STEP).toFixed(
            1
          );
          if (+clickerPerSecond.textContent >= +localStorage.getItem("perSecond")) {
            clearInterval(interval);
            clickerPerSecond.textContent = Number(localStorage.getItem("perSecond")).toFixed(1);
          }
        }, 4);
        localStorage.setItem("count", count);
        clickerPerSecondUP[i].classList.add("click-up");
        clickerPerSecondUpAmount[i].parentNode.parentNode.classList.add("click-up");
        if (clickerPerSecondUP[i].classList.contains("click-up")) {
          setTimeout(() => {
            clickerPerSecondUP[i].classList.remove("click-up");
            clickerPerSecondUpAmount[i].parentNode.parentNode.classList.remove("click-up");
          }, 200);
        }
      }
    });

    clickerPerClickUP[i].addEventListener("click", () => {
      if (
        +clickerPerClickUP[i].dataset.price <= count &&
        !clickerPerClickUP[i].classList.contains("not-enough")
      ) {
        count -= +clickerPerClickUP[i].dataset.price;
        perClick += +clickerPerClickUP[i].dataset.count;
        localStorage.setItem("count", count);
        localStorage.setItem("perClick", perClick);
        clickerPerClick.textContent = perClick.toFixed(1);
        clickerPerClickUP[i].classList.add("click-up");
        clickerPerClickUPAmount[i].parentNode.parentNode.classList.add("click-up");
        if (clickerPerClickUP[i].classList.contains("click-up")) {
          setTimeout(() => {
            clickerPerClickUP[i].classList.remove("click-up");
            clickerPerClickUPAmount[i].parentNode.parentNode.classList.remove("click-up");
          }, 200);
        }
      }
    });
  }

  function perUP(lvl_UP, clickerUpAmount, clickerUpCount, getUP) {
    let amountArr = [];
    for (let i = 0; i < lvl_UP.length; i++) {
      let amount = 0;
      let amountArrGet = localStorage.getItem(getUP).split(",");
      amount = amountArrGet[i];
      clickerUpAmount[i].textContent = amount + "x";
      amountArr.push(amount);
      if (+amount !== 0) {
        lvl_UP[i].dataset.price = Math.round(lvl_UP[i].dataset.price * PRICE_INCREASE ** amount);
      }
      clickerUpCount[i].textContent = lvl_UP[i].dataset.price;
      lvl_UP[i].addEventListener("click", () => {
        if (!lvl_UP[i].classList.contains("not-enough")) {
          clickerUpAmount[i].textContent = ++amount + "x";
          amountArr[i] = amount;
          localStorage.setItem(getUP, amountArr);
          let STEP = 1;
          const priceIncreasePrimary = +lvl_UP[i].dataset.price;
          const interval = setInterval(() => {
            STEP = STEP * 1.5;
            clickerUpCount[i].textContent = Math.round(+lvl_UP[i].dataset.price + STEP);
            if (
              +clickerUpCount[i].textContent >= Math.round(lvl_UP[i].dataset.price * PRICE_INCREASE)
            ) {
              clearInterval(interval);
              lvl_UP[i].dataset.price = Math.round(priceIncreasePrimary * PRICE_INCREASE);
              clickerUpCount[i].textContent = lvl_UP[i].dataset.price;
            }
          }, 4);
        }
      });
    }
  }
  perUP(clickerPerClickUP, clickerPerClickUPAmount, clickerPerClickUPCount, "perClickUP");
  perUP(clickerPerSecondUP, clickerPerSecondUpAmount, clickerPerSecondUPCount, "perSecondUP");

  function amountSet(amountUP, getUP) {
    let amount = 0;
    let amountArr = [];
    for (let i = 0; i < amountUP.length; i++) {
      amountArr[i] = amount;
      localStorage.setItem(getUP, amountArr);
    }
  }

  function perInterval() {
    count = +count + +perSecond / 100;
    localStorage.setItem("count", count);
    countClick.textContent = count.toFixed(1);
    for (let i = 0; i < clickerPerClickUP.length; i++) {
      clickerPerClickUP[i].dataset.price = clickerPerClickUPCount[i].textContent;
      clickerPerClickUP[i].dataset.count = PER_CLICK_COUNT_ARR[i];
      clickerPerSecondUP[i].dataset.price = clickerPerSecondUPCount[i].textContent;
      clickerPerSecondUP[i].dataset.count = PER_SECOND_COUNT_ARR[i];
    }
  }

  const interval = setInterval(perInterval, 10);
  reset.addEventListener("click", () => {
    clearInterval(interval);
    count = 0;
    perClick = 1;
    perSecond = 0;
    localStorage.setItem("count", count);
    localStorage.setItem("perClick", perClick);
    localStorage.setItem("perSecond", perSecond);
    countClick.textContent = Math.round(count);
    clickerPerSecond.textContent = perSecond;
    clickerPerClick.textContent = perClick;
    amountSet(clickerPerClickUP, "perClickUP");
    amountSet(clickerPerSecondUP, "perSecondUP");
    window.location.reload();
  });
});

