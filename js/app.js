$(document).ready(function () {
  $(".reviews__right").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    adaptiveHeight: true,
    asNavFor: ".reviews__left",
  });
  $(".reviews__left").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: false,
    arrows: false,
    asNavFor: ".reviews__right",
  });
});

const TOKEN = "6256529602:AAErkugPrBwQIKzq42ecuk_n13CYKfiO40A";
const CHAT_ID = "-1001848198623";
const URL_API = `https://api.telegram.org/bot${TOKEN}/sendMessage`;
const mainBtn = document.querySelectorAll(".main-btn");
let radiosResult = "phone";

function trackLeadEvent(e) {
  e.preventDefault();
  fbq("track", "Lead");

  // Здесь вы можете добавить код для отправки данных формы, например, через AJAX
}

mainBtn.forEach((el) => {
  el.addEventListener("click", () => {
    Swal.fire({
      html: `
                <div class="main-popup">
                <button class="close-popup-btn"></button>
                <p class="main-popup__title">Записаться <br>
                    на эпиляцию</p>
                <form class="main-popup__form"> 
                <input type="text" name="name" placeholder="Имя" required>
                <input type="text" name="phone" placeholder="Телефон" required class="mb-30">
                <p class="main-popup-text mb-15">Предпочтительный способ связи</p>
                <div class="main-popup__radios">
                    <span> <button value="phone" class="main-popup__radio" type="button">
                            <div class="dot"></div>
                        </button> Телефон</span>
                    <span> <button value="whatsapp" class="main-popup__radio" type="button">
                            <div class="dot"></div>
                        </button> WhatsApp</span>
                </div>
                <button class="main-popup__btn" type="submit">Записаться на процедуру</button>
                </form>
            </div>
                `,
      showConfirmButton: false,
      width: "412px",
    });

    const closePopupBtn = document.querySelector(".close-popup-btn");
    closePopupBtn.addEventListener("click", () => {
      Swal.close();
    });
    setTimeout(() => {}, 2000);
    const popupRadiosBtns = document.querySelectorAll(".main-popup__radio");
    popupRadiosBtns[0].classList.add("main-popup__radio-focused");

    popupRadiosBtns.forEach((el) => {
      el.addEventListener("click", () => {
        popupRadiosBtns.forEach((el) => {
          el.classList.remove("main-popup__radio-focused");
        });
        el.classList.add("main-popup__radio-focused");
        radiosResult = el.value;
      });
    });
    document
      .querySelector(".main-popup__form")
      .addEventListener("submit", function (e) {
        e.preventDefault();

        let message = `<b>Имя: </b>${this.name.value}\n`;
        message += `<b>Телефон: </b>${this.phone.value} \n`;
        message += `<b>Предпочитаемый вид связи:  </b>${translateRadioResult(
          radiosResult
        )}\n`;

        axios
          .post(URL_API, {
            chat_id: CHAT_ID,
            parse_mode: "html",
            text: message,
          })
          .then((res) => trackLeadEvent(e));
        Swal.fire({
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
      });
  });
});
// mainBtn.addEventListener('click', () => {
//     Swal.fire({
//         html: `
//             <div class="main-popup">
//             <button class="close-popup-btn"></button>
//             <p class="main-popup__title">Записаться <br>
//                 на эпиляцию</p>
//             <form class="main-popup__form">
//             <input type="text" name="name" placeholder="Имя" required>
//             <input type="text" name="phone" placeholder="Телефон" required class="mb-30">
//             <p class="main-popup-text mb-15">Предпочтительный способ связи</p>
//             <div class="main-popup__radios">
//                 <span> <button value="phone" class="main-popup__radio" type="button">
//                         <div class="dot"></div>
//                     </button> Телефон</span>
//                 <span> <button value="whatsapp" class="main-popup__radio" type="button">
//                         <div class="dot"></div>
//                     </button> WhatsApp</span>
//             </div>
//             <button class="main-popup__btn" type="submit">Записаться на процедуру</button>
//             </form>
//         </div>
//             `,
//         showConfirmButton: false,
//         width: '412px',

//     });
//     const closePopupBtn = document.querySelector('.close-popup-btn');
//     closePopupBtn.addEventListener('click', () => {
//         Swal.close();
//     })
//     setTimeout(() => {

//     }, 2000)
//     const popupRadiosBtns = document.querySelectorAll('.main-popup__radio');
//     popupRadiosBtns[0].classList.add('main-popup__radio-focused');

//     popupRadiosBtns.forEach(el => {
//         el.addEventListener('click', () => {
//             popupRadiosBtns.forEach(el => {
//                 el.classList.remove('main-popup__radio-focused');
//             })
//             el.classList.add('main-popup__radio-focused');
//             radiosResult = el.value;

//         });
//     });
//     document.querySelector('.main-popup__form').addEventListener('submit', function (e) {
//         e.preventDefault();
//         let message = `<b>Имя: </b>${this.name.value}\n`;
//         message += `<b>Телефон: </b>${this.phone.value} \n`;
//         message += `<b>Предпочитаемый вид связи:  </b>${translateRadioResult(radiosResult)}\n`;

//         axios.post(URL_API, {
//             chat_id: CHAT_ID,
//             parse_mode: 'html',
//             text: message
//         });
//         Swal.fire({
//             icon: 'success',
//             showConfirmButton: false,
//             timer: 1500
//         });
//     })

// });

function translateRadioResult(result) {
  if (result === "phone") {
    return "Телефон";
  } else if (result === "whatsapp") {
    return "WhatsApp";
  } else {
    return "Ошибка";
  }
}

(function () {
  var d = document,
    accordionToggles = d.querySelectorAll(".js-accordionTrigger"),
    setAria,
    setAccordionAria,
    switchAccordion,
    touchSupported = "ontouchstart" in window,
    pointerSupported = "pointerdown" in window;

  skipClickDelay = function (e) {
    e.preventDefault();
    e.target.click();
  };

  setAriaAttr = function (el, ariaType, newProperty) {
    el.setAttribute(ariaType, newProperty);
  };
  setAccordionAria = function (el1, el2, expanded) {
    switch (expanded) {
      case "true":
        setAriaAttr(el1, "aria-expanded", "true");
        setAriaAttr(el2, "aria-hidden", "false");
        break;
      case "false":
        setAriaAttr(el1, "aria-expanded", "false");
        setAriaAttr(el2, "aria-hidden", "true");
        break;
      default:
        break;
    }
  };
  //function
  switchAccordion = function (e) {
    console.log("triggered");
    e.preventDefault();
    var thisAnswer = e.target.parentNode.nextElementSibling;
    var thisQuestion = e.target;
    if (thisAnswer.classList.contains("is-collapsed")) {
      setAccordionAria(thisQuestion, thisAnswer, "true");
    } else {
      setAccordionAria(thisQuestion, thisAnswer, "false");
    }
    thisQuestion.classList.toggle("is-collapsed");
    thisQuestion.classList.toggle("is-expanded");
    thisAnswer.classList.toggle("is-collapsed");
    thisAnswer.classList.toggle("is-expanded");

    thisAnswer.classList.toggle("animateIn");
  };
  for (var i = 0, len = accordionToggles.length; i < len; i++) {
    if (touchSupported) {
      accordionToggles[i].addEventListener("touchstart", skipClickDelay, false);
    }
    if (pointerSupported) {
      accordionToggles[i].addEventListener(
        "pointerdown",
        skipClickDelay,
        false
      );
    }
    accordionToggles[i].addEventListener("click", switchAccordion, false);
  }
})();

const burger = document.querySelector(".burger");
const menu = document.querySelector(".mobile-menu");
const menuBg = document.querySelector(".mobile-bg");
const mobileHeader = document.querySelector(".header-mobile");
menuBg.addEventListener("click", () => {
  hideMenu();
});
let menuLinks = document.querySelectorAll(".mobile-menu-link");
menuLinks.forEach((el) => {
  el.addEventListener("click", () => {
    hideMenu();
  });
});
burger.addEventListener("click", function () {
  if (menu.classList.contains("showMenu")) {
    // menu.classList.add('hideMenu');
    // setTimeout(function () {
    //     menu.classList.remove('hideMenu');
    //     menu.classList.remove('showMenu');
    //     document.body.style.overflow = 'auto';
    // }, 1000);
    hideMenu();
  } else {
    menu.classList.add("showMenu");
    document.body.style.overflow = "hidden";
    mobileHeader.classList.add("fixed-header");
  }
});

function hideMenu() {
  menu.classList.add("hideMenu");
  setTimeout(function () {
    menu.classList.remove("hideMenu");
    menu.classList.remove("showMenu");
    document.body.style.overflow = "auto";
    mobileHeader.classList.remove("fixed-header");
  }, 1000);
}
