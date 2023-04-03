// Bron - https://www.youtube.com/watch?v=8I5UCTlMa34&ab_channel=WebDevTutorials
// Doorstrepen wanneer je klikt geprobeerd (werkt nog niet)
// const container = document.getElementsByClassName("container");
// label.addEventListener("click", function () {
//   label.style.textDecoration = "line-trough";
//   console.log(container);
// });

// notitie carrousel

// definieer de variabelen
const buttonLeft = document.querySelector(".back");
const buttonRight = document.querySelector(".next");

// laat de slide bij de eerste beginnen
let slideIndex = 1;

// laat de functie showdivs in actie treden (als de slideindex 1 is, zie je de eerste 'tip').
showDivs(slideIndex);

// Geef de knoppen een eventlistener
buttonLeft.addEventListener("click", function () {
  plusClick(-1);
});
buttonRight.addEventListener("click", function () {
  plusClick(1);
});

// deze functie wordt uitgevoerd wanneer je op de button klikt,
// Met showDivs(slideIndex += n); geeft die aan of de slideindex een pagina verder of terug moet gaan.
function plusClick(n) {
  showDivs((slideIndex += n));
  console.log("clicky");
}

// Deze onderstaande functie showdivs besluit welke 'notitie' te zien is.
// n staat voor de slideindex waarde
// x staat voor de slides
// met de i wordt er een loop uitgevoerd, i gaat gewoon getallen langs, en zolang het getal kleiner is dan
// de lengte van het aantal slider wordt er een nummer bij opgeteld
// [slideIndex-1] wordt gebruikt omdat bijvoorbeeld +3 eigenlijk overeenzou komen met index 2.
function showDivs(n) {
  let i;
  let x = document.getElementsByClassName("notitie-slider");
  if (n > x.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = x.length;
  }
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  x[slideIndex - 1].style.display = "block";
}

//   overlay form

const form = document.querySelector(".form-background");
const buttonAddNote = document.querySelector(".toevoegen-notitie");
const clickAwayForm = document.querySelector(".click-away-form");

buttonAddNote.addEventListener("click", formOverlay);
clickAwayForm.addEventListener("click", formAway);

function formOverlay() {
  form.classList.add("form-notitie-toevoegen");
}

function formAway() {
  form.classList.remove("form-notitie-toevoegen");
}
