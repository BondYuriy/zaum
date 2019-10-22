$(document).ready(function() {
  /* toggle info */

  $(".btn-toggle-info").click(function() {
    $(this)
      .next(".partner-toggle-box")
      .toggleClass("show");
  });

  /* */

  $("#partner").waypoint(
    function() {
      $(".to-top").addClass("visible");
    },
    { offset: 100 }
  );

  $("#hello").waypoint(
    function() {
      $(".to-top").removeClass("visible");
    },
    { offset: -5 }
  );

  $("#toTop").click(function() {
    $("html, body").animate(
      {
        scrollTop: $("#hello").offset().top - 0
      },
      1000
    );
    return false;
  });

  /* calculator */
  $(function() {
    $("#slider-price").slider({
      value: 2500,
      min: 500,
      max: 10000,
      step: 50,
      slide: function(event, ui) {
        $("#amount-price").val(ui.value);
        $("#js-choice-price").text(ui.value);
        getChoicePrice();
      }
    });
    $("#amount-price").val($("#slider-price").slider("value"));
  });

  $(function() {
    $("#slider-day").slider({
      value: 20,
      min: 1,
      max: 30,
      step: 1,
      slide: function(event, ui) {
        $("#amount-day").val(ui.value);
        $("#js-choice-day").text(ui.value);
        getChoiceDay();
      }
    });
    $("#amount-day").val($("#slider-day").slider("value"));
  });
});

const resultCreditPrice = document.querySelectorAll(".js-result-credit-price");
const resultCreditDay = document.querySelectorAll(".js-result-credit-day");
const creditPrice = document.querySelectorAll(".js-credit-price");

let resultChoicePrice = 2500;
let resultChoiceDay = 20;

getDate(resultChoiceDay);
getPrice();

function getChoicePrice() {
  const userInputPrice = document.querySelector("#js-choice-price").textContent;
  resultChoicePrice = userInputPrice;
  getPrice();
}

function getChoiceDay() {
  const userInputDay = document.querySelector("#js-choice-day").textContent;
  resultChoiceDay = userInputDay;
  getDate(resultChoiceDay);
}

function getPrice() {
  resultCreditPrice.forEach(element => {
    if (
      resultChoicePrice >= Number(element.dataset.minprice) &&
      resultChoicePrice <= Number(element.dataset.maxprice)
    ) {
      const percent = element.dataset.rate * resultChoiceDay;
      const interestLoan = (resultChoicePrice / 100) * percent;
      const total = Number(resultChoicePrice) + interestLoan;
      element.textContent = total.toFixed(2) + " грн";
      element.style.color = "#52ae32";
    } else {
      element.textContent = `виберіть від ${element.dataset.minprice} до ${element.dataset.maxprice} грн`;
      element.style.color = "red";
    }
  });

  creditPrice.forEach(element => {
    element.textContent = Number(resultChoicePrice).toFixed(2) + " грн";
  });
}

function getDate(resultChoiceDay) {
  getPrice();
  const dayMs = 86400000;
  let resultData = resultChoiceDay * dayMs;

  const time = Date.now();
  const validData = time + resultData;

  const date = new Date(validData);
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();

  if (month < 10) {
    month = "0" + month;
  }

  if (day < 10) {
    day = "0" + day;
  }

  const setData = `${day}.${month}.${year}`;

  resultCreditDay.forEach(element => {
    if (
      resultChoiceDay >= Number(element.dataset.minday) &&
      resultChoiceDay <= Number(element.dataset.maxday)
    ) {
      element.textContent = setData;
      element.style.color = "#52ae32";
    } else {
      element.textContent = `виберіть від ${element.dataset.minday} до ${element.dataset.maxday} днів`;
      element.style.color = "red";
    }
  });
}
