function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const closeBtn = document.querySelectorAll(".close");
const submitBtn = document.querySelector("#btn-submit");

const formData = document.querySelectorAll(".formData");
const firstName = document.querySelector("#first");
const lastName = document.querySelector("#last");
const email = document.querySelector("#email");
const birthDate = document.querySelector("#birthdate");
const participatedTournaments = document.querySelector("#quantity");
const wantedTournaments = document.querySelector('[name="location"]');
const terms = document.querySelector("#checkbox1");

//Internal vars
let firstNameIsValid = false;
let lastNameIsValid = false;
let emailIsValid = false;
let birthDateIsValid = false;
let numTournamentsIsValid = false;
let wantedTournamentsIsValid = false;
let termsIsValid = false;

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
// close modal event
closeBtn.forEach((btn) => btn.addEventListener("click", closeModal));
//check if valid
formData.forEach((form) => form.addEventListener("change", isFormValid));

//form elements validation
//first
firstName.addEventListener("focusout", function (e) {
  if (/[A-Za-zÀ-ú]{2,}/.test(e.target.value)) {
    firstNameIsValid = true;
  } else {
    firstNameIsValid = false;
  }
});
//last
lastName.addEventListener("focusout", function (e) {
  if (/[A-Za-zÀ-ú]{2,}/.test(e.target.value)) {
    lastNameIsValid = true;
  } else {
    lastNameIsValid = false;
  }
});
//email
email.addEventListener("focusout", function (e) {
  //RFC2822 mail validation
  if (
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(
      e.target.value
    )
  ) {
    emailIsValid = true;
  } else {
    emailIsValid = false;
  }
});
//birthdate
birthDate.addEventListener("focusout", function (e) {
  //YYYY-MM-DD format validation
  if (
    /(19\d\d|20([01]\d|2[0-2]))[-](0\d|1[0-2])[-](0[1-9]|[12]\d|3[01])?/.test(
      e.target.value
    )
  ) {
    birthDateIsValid = true;
  } else {
    birthDateIsValid = false;
  }
});
//participated tournaments
participatedTournaments.addEventListener("focusout", function (e) {
  if (/\d/.test(e.target.value)) {
    numTournamentsIsValid = true;
  } else {
    numTournamentsIsValid = false;
  }
});

//check form
function isFormValid() {
  wantedTournamentsIsValid = wantedTournaments.validity.valid;
  termsIsValid = terms.validity.valid;
  if (
    firstNameIsValid &&
    lastNameIsValid &&
    emailIsValid &&
    birthDateIsValid &&
    numTournamentsIsValid &&
    wantedTournamentsIsValid &&
    termsIsValid
  ) {
    disableSubmit(false);
  } else {
    disableSubmit(true);
  }
}
// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}
// close modal form
function closeModal() {
  modalbg.style.display = "none";
}
// disable modal submit
function disableSubmit(disabled) {
  if (disabled) {
    submitBtn.setAttribute("disabled", true);
  } else {
    submitBtn.removeAttribute("disabled");
  }
}
