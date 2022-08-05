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
  if (
    localStorage.getItem("count") !== null &&
    localStorage.getItem("perSecond") !== null &&
    localStorage.getItem("amountPerSecond") !== null
  ) {
    count = localStorage.getItem("count");
    perSecond = localStorage.getItem("perSecond");
    countClick.textContent = Math.trunc(count);
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
    countClick.textContent = Math.trunc(count);
    clicker.classList.add("click");
    if (clicker.classList.contains("click")) {
      setTimeout(() => clicker.classList.remove("click"), 120);
      console.log("ok");
    }
  });

  clickerUP.forEach((item) => {
    setInterval(
      () =>
        +item.dataset.price > count
          ? item.classList.add("not-enough")
          : item.classList.remove("not-enough"),
      100
    );
    item.addEventListener("click", () => {
      if (+item.dataset.price <= count && !item.classList.contains("not-enough")) {
        count -= +item.dataset.price;
        perSecond = +perSecond + +item.dataset.count;
        localStorage.setItem("perSecond", perSecond);
        clickerPerSecond.textContent = +perSecond;
        localStorage.setItem("count", count);
      }
    });
  });

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
    clickerUP[i].addEventListener("click", () => {
      if (!clickerUP[i].classList.contains("not-enough")) {
        clickerUpAmount[i].textContent = ++amount + "x";
        amountArr[i] = amount;
        console.log(amountArr);
        localStorage.setItem("amountPerSecond", amountArr);
      }
    });
    clickerUpCount[i].textContent = clickerUP[i].dataset.price;
  }

  function perSecondInterval() {
    count = +count + +perSecond / 100;
    localStorage.setItem("count", count);
    countClick.textContent = Math.trunc(count);
  }
  const interval = setInterval(perSecondInterval, 10);

  reset.addEventListener("click", () => {
    clearInterval(interval);
    count = 10000;
    perSecond = 0;
    localStorage.setItem("count", count);
    localStorage.setItem("perSecond", perSecond);
    countClick.textContent = Math.trunc(count);
    clickerPerSecond.textContent = perSecond;
    amountSet();
    window.location.reload();
  });
});

