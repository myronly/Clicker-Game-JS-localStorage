// Custom Scripts
"use strict";
document.addEventListener("DOMContentLoaded", () => {
  alert('update 2.4: fix scale 2.2');
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(
    navigator.userAgent
  )
    ? isDesctopOrMobile("touchstart", "touchend", "touchend")
    : isDesctopOrMobile("mousedown", "mouseup", "mouseleave");

  window.addEventListener("click", (e) => {
    e.preventDefault();
  });

  function isDesctopOrMobile(down, up, leave) {
    let count, perSecond, perClick;
    const cookieWrapper = document.querySelector(".cookie-wrapper");
    const clickerShopPerClick = document.querySelector(".clicker__shop-per-click");
    const clickerShopPerSecond = document.querySelector(".clicker__shop-per-second");

    const PRICE_INCREASE = 1.28;
    const PER_CLICK_PRICE_ARR = [50, 200, 1000, 5000, 20000];
    const PER_CLICK_COUNT_ARR = [0.1, 1, 5, 10, 25];
    const PER_SECOND_PRICE_ARR = [20, 100, 500, 2500, 12500];
    const PER_SECOND_COUNT_ARR = [0.1, 1, 5, 25, 125];

    function CreateUp(selector, length) {
      for (let i = 0; i < length.length; i++) {
        const element = document.createElement("div");
        let perSecond, amountAndCount, name;
        element.classList.add("clicker__shop-up");
        if (selector.classList.contains("clicker__shop-per-click")) {
          perSecond = "clicker__shop-lvl-per-click";
          amountAndCount = "click";
          name = "click";
        } else {
          perSecond = "clicker__shop-lvl-per-second";
          amountAndCount = "second";
          name = "sec";
        }
        element.innerHTML = `
        <div class="clicker__shop-price not-enough">
          <p>
            <span class="clicker__shop-price-amount per__${amountAndCount}-amount per__click-amount">0</span>
            <span class="clicker__shop-price-count per__${amountAndCount}-count per__click-count">0</span>
          </p>
          <img src="img/cookie.png" alt="cookie" />
        </div>
        <div class="clicker__shop-lvl ${perSecond} not-enough">+${length[i]}/${name}</div>`;
        selector.append(element);
      }
    }
    CreateUp(clickerShopPerClick, PER_CLICK_COUNT_ARR);
    CreateUp(clickerShopPerSecond, PER_SECOND_COUNT_ARR);

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

    function checkout() {
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
        localStorage.setItem("count", (count = 0));
        localStorage.setItem("perSecond", (perSecond = 0));
        localStorage.setItem("perClick", (perClick = 1));
        countClick.textContent = count;
        clickerPerSecond.textContent = perSecond.toFixed(1);
        clickerPerClick.textContent = perClick.toFixed(1);
        amountSet(clickerPerClickUP, "perClickUP");
        amountSet(clickerPerSecondUP, "perSecondUP");
      }
    }
    checkout();

    clicker.addEventListener(down, () => {
      clicker.classList.add("click");
      clicker.addEventListener(leave, () => {
        clicker.classList.remove("click");
      });
    });
    // Fix zooming
    clicker.addEventListener("click", () => {
      clicker.classList.remove("click");
    });
    clicker.addEventListener(up, () => {
      clicker.classList.remove("click");
      countClick.textContent = count.toFixed(1);
      count += +localStorage.getItem("perClick");
      localStorage.setItem("count", count);
      const cookieBg = document.createElement("div");
      cookieBg.classList.add("cookie-bg");
      let animTimeRandom = Math.random() * 5 + 6.5;
      let leftRandom = Math.random() * 100;
      let scaleRandom = Math.random() + 1;
      scaleRandom < 1.1 ? (scaleRandom += 0.1) : scaleRandom;
      cookieBg.style.cssText = `
      animation: fall ${animTimeRandom}s linear;
      left: ${leftRandom}%;
      transform: scale(${scaleRandom});`;
      cookieWrapper.append(cookieBg);
      setTimeout(() => cookieBg.remove(), +animTimeRandom * 1000);
    });

    setInterval(() => {
      let perSecondPrimary = count.toFixed(1);
      setTimeout(() => {
        let perSecondSecondary = count.toFixed(1);
        let perSecondNow = +(perSecondSecondary - perSecondPrimary).toFixed(1);
        if (perSecondNow > +perSecond) {
          if (
            Math.round(perSecond) === Math.round(perSecondNow) ||
            Math.floor(perSecond) === Math.floor(perSecondNow) ||
            Math.round(perSecond) === Math.floor(perSecondNow)
          ) {
            clickerPerSecond.textContent = perSecond.toFixed(1);
          } else {
            clickerPerSecond.textContent = perSecondNow.toFixed(1);
          }
        }
      }, 1000);
    }, 150);

    for (let i = 0; i < clickerUP.length; i++) {
      setInterval(() => {
        if (+clickerUP[i].dataset.price > count) {
          clickerUP[i].classList.add("not-enough");
          clickerUpAmount[i].parentNode.parentNode.classList.add("not-enough");
        } else {
          clickerUP[i].classList.remove("not-enough");
          clickerUpAmount[i].parentNode.parentNode.classList.remove("not-enough");
        }
      }, 50);
    }

    function perUP(clickerUp, clickerUpAmount, clickerUpCount, getUP) {
      if (clickerUp[0].parentNode.parentNode.classList.contains("clicker__shop-per-click")) {
        for (let i = 0; i < clickerUp.length; i++) {
          clickerUp[i].setAttribute("data-price", PER_CLICK_PRICE_ARR[i]);
          clickerUp[i].setAttribute("data-count", PER_CLICK_COUNT_ARR[i]);
          clickerUp[i].addEventListener(down, () => {
            if (
              +clickerUp[i].dataset.price <= count &&
              !clickerUp[i].classList.contains("not-enough")
            ) {
              clickerUp[i].classList.add("click-up");
              clickerUpAmount[i].parentNode.parentNode.classList.add("click-up");
              clickerUp[i].addEventListener(leave, () => {
                clickerUp[i].classList.remove("click-up");
                clickerUpAmount[i].parentNode.parentNode.classList.remove("click-up");
              });
            }
          });
          clickerUp[i].addEventListener("click", () => {
            if (
              +clickerUp[i].dataset.price <= count &&
              !clickerUp[i].classList.contains("not-enough")
            ) {
              count -= +clickerUp[i].dataset.price;
              perClick += +clickerUp[i].dataset.count;
              localStorage.setItem("count", count);
              localStorage.setItem("perClick", perClick);
              clickerPerClick.textContent = perClick.toFixed(1);
              clickerUp[i].classList.remove("click-up");
              clickerUpAmount[i].parentNode.parentNode.classList.remove("click-up");
            }
          });
        }
      } else {
        for (let i = 0; i < clickerUp.length; i++) {
          clickerUp[i].setAttribute("data-price", PER_SECOND_PRICE_ARR[i]);
          clickerUp[i].setAttribute("data-count", PER_SECOND_COUNT_ARR[i]);
          clickerUp[i].addEventListener(down, () => {
            if (
              +clickerUp[i].dataset.price <= count &&
              !clickerUp[i].classList.contains("not-enough")
            ) {
              clickerUp[i].classList.add("click-up");
              clickerUpAmount[i].parentNode.parentNode.classList.add("click-up");
              clickerUp[i].addEventListener(leave, () => {
                clickerUp[i].classList.remove("click-up");
                clickerUpAmount[i].parentNode.parentNode.classList.remove("click-up");
              });
            }
          });
          clickerUp[i].addEventListener("click", () => {
            if (
              +clickerUp[i].dataset.price <= count &&
              !clickerUp[i].classList.contains("not-enough")
            ) {
              count -= +clickerUp[i].dataset.price;
              perSecond = +perSecond + +clickerUp[i].dataset.count;
              localStorage.setItem("perSecond", perSecond);
              let STEP = 1;
              const interval = setInterval(() => {
                STEP = STEP * 1.5;
                clickerPerSecond.textContent = Math.round(
                  +clickerPerSecond.textContent + STEP
                ).toFixed(1);
                if (+clickerPerSecond.textContent >= +localStorage.getItem("perSecond")) {
                  clearInterval(interval);
                  clickerPerSecond.textContent = Number(localStorage.getItem("perSecond")).toFixed(
                    1
                  );
                }
              }, 4);
              localStorage.setItem("count", count);
              clickerUp[i].classList.remove("click-up");
              clickerUpAmount[i].parentNode.parentNode.classList.remove("click-up");
            }
          });
        }
      }
      let amountArr = [];
      for (let i = 0; i < clickerUp.length; i++) {
        let amount = 0;
        let amountArrGet = localStorage.getItem(getUP).split(",");
        amount = amountArrGet[i];
        clickerUpAmount[i].textContent = amount + "x";
        amountArr.push(amount);
        if (+amount !== 0) {
          clickerUp[i].dataset.price = (
            clickerUp[i].dataset.price *
            PRICE_INCREASE ** amount
          ).toFixed(1);
        }
        clickerUpCount[i].textContent = (+clickerUp[i].dataset.price).toFixed(1);
        clickerUp[i].addEventListener("click", () => {
          if (!clickerUp[i].classList.contains("not-enough")) {
            clickerUpAmount[i].textContent = ++amount + "x";
            amountArr[i] = amount;
            localStorage.setItem(getUP, amountArr);
            let STEP = 1;
            const priceIncreasePrimary = +clickerUp[i].dataset.price;
            const interval = setInterval(() => {
              STEP = STEP * 1.5;
              clickerUpCount[i].textContent = (+clickerUp[i].dataset.price + STEP).toFixed(1);
              if (
                +clickerUpCount[i].textContent >=
                Math.round(clickerUp[i].dataset.price * PRICE_INCREASE)
              ) {
                clearInterval(interval);
                clickerUp[i].dataset.price = priceIncreasePrimary * PRICE_INCREASE;
                clickerUpCount[i].textContent = (+clickerUp[i].dataset.price).toFixed(1);
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
      if (
        clickerPerClickUP[0].parentNode.parentNode.classList.contains("clicker__shop-per-click")
      ) {
        for (let i = 0; i < clickerPerClickUP.length; i++) {
          clickerPerClickUP[i].dataset.price = clickerPerClickUPCount[i].textContent;
          clickerPerClickUP[i].dataset.count = PER_CLICK_COUNT_ARR[i];
        }
      } else {
        for (let i = 0; i < clickerPerSecondUP.length; i++) {
          clickerPerSecondUP[i].dataset.price = clickerPerSecondUPCount[i].textContent;
          clickerPerSecondUP[i].dataset.count = PER_SECOND_COUNT_ARR[i];
        }
      }
    }

    const interval = setInterval(perInterval, 10);
    reset.addEventListener("click", () => {
      window.scrollTo(0, 0);
      clearInterval(interval);
      localStorage.setItem("count", (count = 10000));
      localStorage.setItem("perClick", (perClick = 1));
      localStorage.setItem("perSecond", (perSecond = 0));
      countClick.textContent = count.toFixed(1);
      clickerPerSecond.textContent = perSecond.toFixed(1);
      clickerPerClick.textContent = perClick.toFixed(1);
      amountSet(clickerPerClickUP, "perClickUP");
      amountSet(clickerPerSecondUP, "perSecondUP");
      window.location.reload();
    });
  }
});

