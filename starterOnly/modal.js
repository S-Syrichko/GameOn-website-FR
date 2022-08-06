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
//form fields
const formData = document.querySelectorAll(".formData");
const firstName = document.querySelector("#first");
const lastName = document.querySelector("#last");
const email = document.querySelector("#email");
const birthDate = document.querySelector("#birthdate");
const participatedTournaments = document.querySelector("#quantity");
const wantedTournaments = document.getElementsByName("location");
const terms = document.getElementsByName("terms");

//Input list
let inputs = [
  {
    element: firstName,
    regExp: /[A-Za-zÀ-ú]{2,}/,
    errorMsg: "Veuillez entrer 2 caractères ou plus pour le champ du prenom.",
    valid: false,
  },
  {
    element: lastName,
    regExp: /[A-Za-zÀ-ú]{2,}/,
    errorMsg: "Veuillez entrer 2 caractères ou plus pour le champ du nom.",
    valid: false,
  },
  {
    element: email,
    regExp:
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
    errorMsg: "Veuillez entrer une adresse email valide.",
    valid: false,
  },
  {
    element: birthDate,
    regExp:
      /(19\d\d|20([01]\d|2[0-2]))[-](0\d|1[0-2])[-](0[1-9]|[12]\d|3[01])?/,
    errorMsg: "Veuillez renseigner votre date de naissance",
    valid: false,
  },
  {
    element: participatedTournaments,
    regExp: /\d/,
    errorMsg: "Veuillez entrer un nombre de tournois.",
    valid: false,
  },
  {
    //element is a list
    element: wantedTournaments,
    errorMsg: "Vous devez choisir une option.",
    valid: false,
  },
  {
    //element is a list
    element: terms,
    errorMsg: "Vous devez vérifier que vous acceptez les termes et conditions.",
    valid: false,
  },
];

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
// close modal event
closeBtn.forEach((btn) => btn.addEventListener("click", closeModal));
// submit modal event
submitBtn.addEventListener("click", isFormValid);

//Functions

//Launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

//Close modal form
function closeModal() {
  modalbg.style.display = "none";
}

//Handle form validation
function isFormValid() {
  checkForm();
  if (inputs.some((input) => input.valid === false)) {
    disableSubmit(true);
    //Launch change event to dynamically check fields
    formData.forEach((form) => form.addEventListener("change", isFormValid));
  } else {
    disableSubmit(false);
  }
}

//Check all form fields
function checkForm() {
  inputs.forEach((input) => {
    if (input.regExp) {
      checkTextFields(input);
    } else {
      checkRadio(input);
    }
  });
}

//Check text fields
function checkTextFields(input) {
  if (input.regExp.test(input.element.value)) {
    validateInput(true, input);
  } else {
    validateInput(false, input);
  }
}
//Check radios
function checkRadio(input) {
  let isValid = false;
  for (var i = 0; i < input.element.length; i++) {
    if (input.element[i].checked) {
      isValid = true;
      break;
    }
  }
  validateInput(isValid, input);
}

//Handle validation && error messages
function validateInput(isValid, input) {
  //Get element and existing errorMsg
  let inputElement = input.element.length ? input.element[0] : input.element;
  let errors = inputElement.parentNode.getElementsByClassName("errorMsg");
  //Setting validation state
  input.valid = isValid;
  //Add/delete errorMsg
  if (isValid) {
    //Remove errorMsg if exists
    errors.length > 0 && errors[0].parentNode.removeChild(errors[0]);
  } else {
    //Add errorMsg if none present
    if (errors.length == 0) {
      const errorMsg = document.createElement("p");
      errorMsg.classList.add("errorMsg");
      errorMsg.innerHTML = input.errorMsg;
      inputElement.parentNode.appendChild(errorMsg);
    }
  }
}

//Disable modal submit
function disableSubmit(disabled) {
  if (disabled) {
    submitBtn.setAttribute("disabled", true);
  } else {
    submitBtn.removeAttribute("disabled");
  }
}
